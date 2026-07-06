import { useState } from "react";
import { CheckSquare, CalendarIcon, Loader2, X } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api/apiClient";

const TASK_STATUSES = [
  { value: "pending",     label: "Pending" },
  { value: "in-progress", label: "In progress" },
  { value: "done",        label: "Done" },
];

const TaskForm = ({ open, onOpenChange, task }) => {
  const queryClient = useQueryClient();
  const [displayError, setDisplayError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [formValues, setFormValues] = useState({
    title:       task?.title       ?? "",
    description: task?.description ?? "",
    status:      task?.status      ?? "pending",
    dueDate:     task?.dueDate     ?? "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value) => {
    setFormValues((prev) => ({ ...prev, status: value }));
  };

  const handleCancel = () => {
    setFormValues({ title: "", description: "", status: "pending", dueDate: "" });
    setValidationError(null);
    setDisplayError(null);
    onOpenChange(false);
  };

  // ✅ Fix 1: mutationFn must return the response
  const createTaskMutation = useMutation({
    mutationFn: async (taskData) => {
      const response = await api.post("/tasks", taskData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      handleCancel();
    },
    onError: (error) => {
      setDisplayError(
        error?.response?.data?.message ?? "Something went wrong. Please try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);
    setDisplayError(null);

    // ✅ Fix 2: validation condition was wrong
    if (!formValues.title || !formValues.description || !formValues.status || !formValues.dueDate) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    const taskData = {
      title:       formValues.title.trim(),
      description: formValues.description.trim(),
      status:      formValues.status,
      dueDate:     formValues.dueDate
        ? new Date(formValues.dueDate).toISOString()
        : null,
    };

    createTaskMutation.mutate(taskData);
  };

  // ✅ Fix 3: isLoading from mutation, not useState
  const isLoading = createTaskMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-3xl p-0 overflow-hidden [&>button]:hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background shrink-0">
              <CheckSquare size={16} />
            </div>
            <div>
              <DialogTitle className="text-base font-bold tracking-tight">
                {task ? "Update task" : "Create new task"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Fill in the details below to {task ? "update" : "create"} a task
              </DialogDescription>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-[#f0f0f0] text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-5 space-y-4">

          {/* Validation Error */}
          {validationError && (
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive text-sm">
                {validationError}
              </AlertDescription>
            </Alert>
          )}

          {/* API Error */}
          {displayError && (
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive text-sm">
                {displayError}
              </AlertDescription>
            </Alert>
          )}

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
                        <div className={`w-2 h-2 rounded-full shrink-0 ${
                          status.value === "done"
                            ? "bg-green-500"
                            : status.value === "in-progress"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                        }`} />
                        {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dueDate" className="text-sm font-semibold flex items-center gap-1.5">
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

          {/* Buttons */}
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
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  {task ? "Updating..." : "Creating..."}
                </span>
              ) : task ? "Update task" : "Create task"}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;