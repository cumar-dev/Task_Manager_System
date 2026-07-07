import {
  CheckSquare,
  CheckCircle2,
  Loader,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import TaskForm from "../../components/Task/TaskForm";
import TaskList from "../../components/Task/TaskList";
// import StatCards from "../../components/Task/StatCards";

const DashboardPage = () => {
  const { user, clearAuth } = useAuthStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const handleFormClose = () => {
    setShowCreateForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <Card className="shadow-none mb-6 rounded-none border-0 bg-[#F0F0F0]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-8 py-6">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground">
              Good morning, {user?.name?.split(" ")[0] ?? "User"}
            </CardTitle>
            <CardDescription className="mt-0.5 text-muted-foreground">
              Here's what's happening with your tasks today.
            </CardDescription>
          </div>
          <Button
            className="rounded-full gap-2 px-5 bg-white text-violet-700 hover:bg-white/90 font-semibold"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus size={15} />
            New task
          </Button>
        </CardHeader>
      </Card>
      <TaskForm
        open={showCreateForm || !!editingTask}
        onOpenChange={handleFormClose}
        task={editingTask}
      />
      <TaskList />
      {/* <StatCards /> */}
    </div>
  );
};

export default DashboardPage;
