import { Link } from "react-router-dom";
import {
  CheckSquare,
  CheckCircle2,
  Users,
  BarChart2,
  Bell,
  Lock,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: CheckCircle2,
    title: "Task management",
    description:
      "Create, assign, and track tasks with priorities, due dates, and status updates in one place.",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Assign tasks to team members, leave comments, and stay in sync without endless meetings.",
  },
  {
    icon: BarChart2,
    title: "Progress tracking",
    description:
      "Visual dashboards that show completion rates, overdue tasks, and team performance at a glance.",
  },
  {
    icon: Bell,
    title: "Smart reminders",
    description:
      "Get notified before deadlines so nothing slips through the cracks, ever.",
  },
  {
    icon: Lock,
    title: "Role-based access",
    description:
      "Admins control who sees what. Keep sensitive projects private with granular permissions.",
  },
  {
    icon: Smartphone,
    title: "Works everywhere",
    description:
      "Fully responsive on desktop, tablet, and mobile. Your workflow, wherever you are.",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Hero Section */}
      <section className="bg-[#f0f0f0] px-6 py-24 text-center">

        {/* Beta badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-[#e5e5e5] rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-green-600" />
          <span className="text-sm text-muted-foreground">
            Now in public beta — free to get started
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          Manage your tasks.<br />Ship faster.
        </h1>

        {/* Subheading */}
        <p className="text-base text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
          TaskFlow keeps your team focused on what matters. Assign, track, and complete tasks without the noise.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/register"
            className="bg-foreground text-background px-7 py-3 rounded-full text-sm font-semibold hover:bg-foreground/90 transition-colors"
          >
            Get started free
          </Link>
          <Link
            to="/dashboard"
            className="bg-white text-foreground border border-[#e5e5e5] px-7 py-3 rounded-full text-sm hover:bg-[#f9f9f9] transition-colors"
          >
            See how it works
          </Link>
        </div>

      </section>

      {/* Social Proof */}
      {/* <div className="border-y border-[#e5e5e5] py-5 px-6 flex items-center justify-center gap-10 flex-wrap">
        <span className="text-xs text-muted-foreground">Trusted by teams at</span>
        {["Acme Corp", "Vercel", "Linear", "Notion", "Stripe"].map((name) => (
          <span key={name} className="text-sm font-medium text-muted-foreground">
            {name}
          </span>
        ))}
      </div> */}

      {/* Features Section */}
      <section className="px-6 py-24 bg-white">
        <div className="text-center mb-14 max-w-xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
            Features
          </p>
          <h2 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
            Everything your team needs
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Built for individuals and teams who want to stay organized without the overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-[#f9f9f9] border border-[#e5e5e5] rounded-2xl p-6"
            >
              <div className="w-11 h-11 bg-foreground rounded-xl flex items-center justify-center mb-5">
                <Icon size={20} className="text-background" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-24">
        <div className="bg-foreground rounded-2xl px-8 py-16 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-background mb-3 tracking-tight">
            Ready to get organized?
          </h2>
          <p className="text-sm text-background/50 mb-10 max-w-sm mx-auto leading-relaxed">
            Join thousands of teams already using TaskFlow to ship faster and stress less.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              to="/register"
              className="bg-white text-foreground px-7 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Create free account
            </Link>
            <Link
              to="/login"
              className="bg-transparent text-background border border-background/30 px-7 py-3 rounded-full text-sm hover:bg-white/10 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] px-6 py-7">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
              <CheckSquare size={14} className="text-background" />
            </div>
            <span className="text-sm font-semibold text-foreground">TaskFlow</span>
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;