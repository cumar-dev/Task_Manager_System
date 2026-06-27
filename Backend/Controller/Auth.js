import { jwtToken } from "../Utils/jwtToken.js";
import User from "../Model/User.js";

export const register = async (req, res, next) => {
  let { name, email, password, role, profile } = req.body;
  
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    email = email.toLowerCase();

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const createNewUser = await User.create({
      name,
      email,
      password,
      // role,
      // profile,
    });

    const token = jwtToken(createNewUser._id);

    return res.status(201).json({
      token,
      user: {
        id: createNewUser._id,
        name: createNewUser.name,
        email: createNewUser.email,
        // role: createNewUser.role,
        // profile: createNewUser.profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req, res, next) => {
  let { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "invalid user or password" });
    }

    const token = jwtToken(user._id);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        // role: user.role,
        // profile: user.profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logOut = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
