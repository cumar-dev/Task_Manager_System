import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Loader2 } from "lucide-react";
import { api } from "../../lib/api/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const TaskList = () => {
  const {
    data: tasks = [],
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["task"],
    retry: 1,
    queryFn: async () => {
      const response = await api.get("/tasks");
      return response.data;
    },
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={20} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  const total = tasks.length;

  const pending = tasks.filter((task) => task.status === "pending").length;

  const inProgress = tasks.filter(
    (task) => task.status === "in progress",
  ).length;

  const completed = tasks.filter((task) => task.status === "completed").length;
  const stats = [
    {
      label: "Total",
      value: total,
      icon: <CalendarIcon size={14} className="text-muted-foreground" />,
      valueColor: "text-foreground",
      dot: null,
    },
    {
      label: "Pending",
      value: pending,
      dot: "bg-yellow-400",
      valueColor: "text-yellow-500",
    },
    {
      label: "In Progress",
      value: inProgress,
      dot: "bg-blue-500",
      valueColor: "text-blue-500",
    },
    {
      label: "Completed",
      value: completed,
      dot: "bg-green-500",
      valueColor: "text-green-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-6 mb-6">
      {stats.map(({ label, value, dot, valueColor, icon }) => (
        <Card
          key={label}
          className="rounded-2xl border-[#e5e5e5] bg-white shadow-none"
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground font-medium">
                {label}
              </span>
              {dot ? (
                <div className={`w-2.5 h-2.5 rounded-full ${dot}`} />
              ) : (
                icon
              )}
            </div>
            <p className={`text-3xl font-semibold ${valueColor}`}>{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
