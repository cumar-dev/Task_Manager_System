import Task from "../Model/Task.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({
      _id: id,
      createdBy: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tasks = await Task.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      req.body,
      { new: true },
    );
    if (!tasks) return res.status(404).json({ message: "task not found" });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};


export const deleteTask = async(req, res, next) => {
  const {id} = req.params;
  try {
    const task = await Task.findOneAndDelete({_id: id, createdBy: req.user._id});
    if(!task) return res.status(404).json({ message: "task not found" });
    res.json({message: "task deleted"});
  } catch (error) {
    next(error)
  }
}