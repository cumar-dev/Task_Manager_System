import React, { useState } from "react";
import { CheckSquare, CalendarIcon, AlertCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const TASK_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
];
const TaskForm = ({ open = true, onOpenChange, task }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayError, setDisplayError] = useState(null);
  const [formValues, setFormValues] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? "pending",
    dueDate: task?.dueDate ?? "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setFormValues((prev) => ({ ...prev, status: value }));
  };
  const handleCancel = () => {
    setFormValues({
      title: "",
      description: "",
      status: "pending",
      dueDate: "",
    });
    onOpenChange(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("task will begin comming soon...");
    handleCancel();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-3xl p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-7 pt-7 pb-4 border-b border-[#e5e5e5]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background shrink-0">
            <CheckSquare size={16} />
          </div>
          <div>
            <DialogTitle className="text-base font-bold tracking-tight">
              Create new task
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-0.5">
              Fill in the details below to create a new task
            </DialogDescription>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-5 space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-sm font-semibold">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formValues.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              className="rounded-xl h-11"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-sm font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              className="rounded-xl resize-none min-h-[90px]"
            />
          </div>

          {/* Status + Due Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Status</Label>
              <Select
                value={formValues.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="rounded-xl h-11 w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {TASK_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            status.value === "done"
                              ? "bg-green-500"
                              : status.value === "in-progress"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                          }`}
                        />
                        {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="dueDate"
                className="text-sm font-semibold flex items-center gap-1.5"
              >
                <CalendarIcon size={13} className="text-muted-foreground" />
                Due date
              </Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formValues.dueDate}
                onChange={handleInputChange}
                className="rounded-xl h-11"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl h-11"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-xl h-11 bg-foreground text-background hover:bg-foreground/90"
            >
              {/* {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  {task ? "Updating..." : "Creating..."}
                </span>
              ) : task ? (
                "Update task"
              ) : (
                "Create task"
              )} */}
              Create task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
