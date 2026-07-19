import { Plus } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
// import StatCards from "../../components/Task/StatCards";
import TaskForm from "../../components/Task/TaskForm";
import TaskList from "../../components/Task/TaskList";

const OverviewPage = () => {
  const { user } = useAuthStore();
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Card className="shadow-none top-0 sticky z-50 rounded-none border-0 border-b border-[#e5e5e5] bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-8 py-5">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground">
              Good morning, {user?.name?.split(" ")[0] ?? "User"}
            </CardTitle>
            <CardDescription className="mt-0.5">
              Here's what's happening with your tasks today.
            </CardDescription>
          </div>
          <Button
            className="rounded-full gap-2 px-5 bg-foreground text-background hover:bg-foreground/90 font-semibold"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus size={15} />
            New task
          </Button>
        </CardHeader>
      </Card>

      <TaskForm open={showCreateForm} onOpenChange={setShowCreateForm} />
      <div className="mt-8">
        <TaskList />
      </div>
    </div>
  );
};

export default OverviewPage;
