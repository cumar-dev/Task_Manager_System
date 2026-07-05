import { CheckSquare, CheckCircle2, Loader, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/authStore";
const statCards = [
  {
    label: "Total tasks",
    // value: 24,
    // sub: "+3 this week",
    subColor: "text-muted-foreground",
    icon: CheckSquare,
    iconBg: "bg-[#f0f0f0]",
    iconColor: "text-muted-foreground",
  },
  {
    label: "Completed",
    // value: 14,
    // sub: "58% completion rate",
    subColor: "text-green-700",
    icon: CheckCircle2,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    label: "In progress",
    // value: 7,
    // sub: "2 due today",
    subColor: "text-blue-700",
    icon: Loader,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    label: "Overdue",
    // value: 3,
    // sub: "Needs attention",
    subColor: "text-red-700",
    icon: AlertCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
  },
];

const DashboardPage = () => {
  const { user, clearAuth } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#f0f0f0] px-6 py-8">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Good morning, {user?.name?.split(" ")[0] ?? "User"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Here's what's happening with your tasks today.
          </p>
        </div>
        <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full gap-2 px-5">
          <Plus size={15} />
          New task
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, sub, subColor, icon: Icon, iconBg, iconColor }) => (
          <Card
            key={label}
            className="rounded-2xl border-[#e5e5e5] bg-white shadow-none"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">{label}</span>
                <div className={`${iconBg} p-2 rounded-lg`}>
                  <Icon size={16} className={iconColor} />
                </div>
              </div>
              <p className="text-4xl font-semibold text-foreground mb-2">
                {value}
              </p>
              <p className={`text-sm ${subColor}`}>{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default DashboardPage;