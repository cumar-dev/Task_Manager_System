import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api/apiClient";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const TaskTabs = () => {
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get("/tasks");
      return response.data;
    },
  });

  const all        = tasks;
  const pending    = tasks.filter((t) => t.status === "pending");
  const inProgress = tasks.filter((t) => t.status === "in progress");
  const completed  = tasks.filter((t) => t.status === "completed");

  const tabs = [
    { value: "all",         label: "All",         count: all.length,        tasks: all },
    { value: "pending",     label: "Pending",     count: pending.length,    tasks: pending },
    { value: "in-progress", label: "In Progress", count: inProgress.length, tasks: inProgress },
    { value: "completed",   label: "Completed",   count: completed.length,  tasks: completed },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={22} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-destructive">Failed to load tasks. Please try again.</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="all" className="w-[98%] mx-3">

      {/* Tab Headers */}
      <TabsList className="w-full justify-start bg-transparent border-b border-[#e5e5e5] rounded-none p-0 h-auto mb-6">
        {tabs.map(({ value, label, count }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="
              rounded-none bg-transparent px-4 py-2 text-sm font-medium
              text-muted-foreground border-b-2 border-transparent
              data-[state=active]:border-foreground
              data-[state=active]:text-foreground
              data-[state=active]:bg-transparent
              data-[state=active]:shadow-none
              hover:text-foreground transition-colors gap-1.5 -mb-px
            "
          >
            {label}
            <span className="text-xs text-muted-foreground font-normal">
              {count}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab Contents */}
      {tabs.map(({ value, tasks: tabTasks }) => (
        <TabsContent key={value} value={value}>
          {tabTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f0f0]">
                <i className="ti ti-clipboard-list text-muted-foreground text-xl" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium text-foreground">No tasks</p>
              <p className="text-xs text-muted-foreground">
                No tasks found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tabTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white border border-[#e5e5e5] rounded-2xl p-5"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {task.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      ))}

    </Tabs>
  );
};

export default TaskTabs;