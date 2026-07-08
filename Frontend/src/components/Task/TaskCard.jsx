import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api/apiClient";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Calendar, Clock, MoreVertical, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusConfig = {
  "pending":     { label: "Pending",     badge: "bg-orange-500 text-white" },
  "in progress": { label: "In Progress", badge: "bg-orange-500 text-white" },
  "completed":   { label: "Completed",   badge: "bg-orange-500 text-white" },
};

const STATUS_BUTTONS = [
  { value: "pending",     label: "Pending" },
  { value: "in progress", label: "In Progress" },
  { value: "completed",   label: "Completed" },
];

const TaskCard = ({ task }) => {
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: async (status) => {
      const res = await api.patch(`/tasks/${task._id}`, { status });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
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

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">

      {/* Title + Badge + Menu */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground leading-snug flex-1">
          {task.title}
        </h3>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-xs px-2.5 py-0.5 rounded-md font-medium ${status.badge}`}>
            {status.label}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-[#f0f0f0] text-muted-foreground transition-colors">
                <MoreVertical size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 rounded-xl p-1.5">
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer">
                <Pencil size={14} className="text-muted-foreground" />
                Edit
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
      <div className="flex items-center gap-1.5 p-1 border border-[#e5e5e5] rounded-xl">
        {STATUS_BUTTONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => updateStatus.mutate(value)}
            disabled={updateStatus.isPending}
            className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all
              ${task.status === value
                ? "bg-orange-500 text-white"
                : "text-muted-foreground hover:bg-[#f0f0f0]"
              }`}
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
  );
};


export default TaskCard