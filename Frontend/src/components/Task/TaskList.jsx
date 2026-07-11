import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Loader2 } from "lucide-react";
import { api } from "../../lib/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const TaskList = () => {
   const queryClient = useQueryClient();
  const {
    data: tasks = [],
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["tasks"],
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

  const total      = tasks.length;
  const pending    = tasks.filter((task) => task.status === "pending").length;
  const inProgress = tasks.filter((task) => task.status === "in progress").length;
  const completed  = tasks.filter((task) => task.status === "completed").length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label:      "Total",
      value:      total,
      sub:        `${completionRate}% completion rate`,
      icon:       <CalendarIcon size={14} className="text-muted-foreground" />,
      iconBg:     "bg-[#f0f0f0]",
      valueColor: "text-foreground",
      dot:        null,
    },
    {
      label:      "Pending",
      value:      pending,
      sub:        "Waiting to start",
      dot:        "bg-yellow-400",
      iconBg:     "bg-yellow-50",
      valueColor: "text-yellow-500",
    },
    {
      label:      "In Progress",
      value:      inProgress,
      sub:        "Currently active",
      dot:        "bg-blue-500",
      iconBg:     "bg-blue-50",
      valueColor: "text-blue-500",
    },
    {
      label:      "Completed",
      value:      completed,
      sub:        "Successfully done",
      dot:        "bg-green-500",
      iconBg:     "bg-green-50",
      valueColor: "text-green-500",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-6 mb-6">
        {stats.map(({ label, value, sub, dot, iconBg, valueColor, icon }) => (
          <Card
            key={label}
            className="rounded-2xl border-[#e5e5e5] bg-white shadow-none hover:border-[#d0d0d0] transition-all"
          >
            <CardContent className="p-5">

              {/* Label + Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground font-medium">
                  {label}
                </span>
                <div className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center`}>
                  {dot ? (
                    <div className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                  ) : (
                    icon
                  )}
                </div>
              </div>

              {/* Value */}
              <p className={`text-3xl font-semibold mb-1 ${valueColor}`}>
                {value}
              </p>

              {/* Sub text */}
              <p className="text-xs text-muted-foreground">{sub}</p>

              {/* Progress bar — total card only */}
              {label === "Total" && total > 0 && (
                <div className="mt-3">
                  <div className="h-1 bg-[#f0f0f0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TaskList;