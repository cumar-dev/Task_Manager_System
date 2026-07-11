import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api/apiClient";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Loader2,
  Calendar,
  Clock,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import TaskForm from "./TaskForm";
const statusConfig = {
  pending: {
    label: "Pending",
    badge: "bg-amber-50 text-amber-800",
    btn: "bg-amber-50 text-amber-800",
  },
  "in progress": {
    label: "In progress",
    badge: "bg-blue-50 text-blue-800",
    btn: "bg-blue-50 text-blue-800",
  },
  completed: {
    label: "Completed",
    badge: "bg-green-50 text-green-800",
    btn: "bg-green-50 text-green-800",
  },
};

const STATUS_BUTTONS = [
  { value: "pending", label: "Pending" },
  { value: "in progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

const TaskCard = ({ task }) => {
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const updateStatus = useMutation({
    mutationFn: async (status) => {
      const res = await api.put(`/tasks/${task._id}`, { status });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTask = useMutation({
    mutationFn: async () => {
      await api.delete(`/tasks/${task._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted.");
      setShowDeleteDialog(false);
    },
    onError: () => toast.error("Failed to delete task."),
  });

  const status = statusConfig[task.status] ?? statusConfig["pending"];

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : null;

  const getActiveStyle = (value) => {
    if (task.status !== value)
      return "text-muted-foreground hover:bg-[#f0f0f0]";
    return statusConfig[value]?.btn ?? "bg-[#f0f0f0] text-foreground";
  };

  return (
    <>
      <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 flex flex-col gap-3 hover:border-[#d0d0d0] transition-all">
        {/* Title + Badge + Menu */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground leading-snug flex-1">
            {task.title}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${status.badge}`}
            >
              {status.label}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-[#f0f0f0] text-muted-foreground transition-colors">
                  <MoreVertical size={13} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-36 rounded-xl p-1.5"
              >
                <DropdownMenuItem
                  onClick={() => setShowEditForm(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer"
                >
                  <Pencil size={13} className="text-muted-foreground" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <Trash size={13} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Due:{" "}
              <span className="font-medium text-foreground">
                {formatDate(task.dueDate)}
              </span>
            </span>
          </div>
        )}

        {/* Status Buttons */}
        <div className="flex items-center gap-1 p-1 border border-[#e5e5e5] rounded-xl">
          {STATUS_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateStatus.mutate(value)}
              disabled={updateStatus.isPending}
              className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all ${getActiveStyle(value)}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Created At */}
        {task.createdAt && (
          <div className="flex items-center gap-1.5 pt-2 border-t border-[#f0f0f0]">
            <Clock size={11} className="text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">
              Created: {formatDate(task.createdAt)}
            </span>
          </div>
        )}
      </div>

      {/* Edit Form */}
      <TaskForm
        open={showEditForm}
        onOpenChange={setShowEditForm}
        task={task}
      />

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold text-foreground">
                "{task.title}"
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTask.mutate()}
              className="rounded-xl bg-destructive text-white hover:bg-destructive/90"
            >
              {deleteTask.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={13} className="animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TaskCard;
