import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskTabs from "../../components/Task/TaskTabs";
import SearchForm from "../../components/Task/SerchForm";
import TaskForm from "../../components/Task/TaskForm";

const AllTasksPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFormClose = () => {
    setShowCreateForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Card className="rounded-none top-0 sticky z-50 border-x-0 border-t-0 border-b bg-white shadow-none">
        <CardHeader className="flex flex-row items-center justify-between px-8 py-5">
          <div>
            <CardTitle className="text-xl font-semibold">All Tasks</CardTitle>

            <CardDescription className="mt-1">
              Manage and track all your tasks.
            </CardDescription>
          </div>

          <Button
            className="rounded-full gap-2 px-5"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus size={16} />
            New task
          </Button>
        </CardHeader>
      </Card>

      <div className="mt-8">
        <SearchForm onSearch={setSearchTerm} />
      </div>

      <div className="mt-8">
        <TaskTabs searchQuery={searchTerm} />
      </div>

      <TaskForm
        open={showCreateForm || !!editingTask}
        onOpenChange={handleFormClose}
        task={editingTask}
      />
    </div>
  );
};

export default AllTasksPage;
