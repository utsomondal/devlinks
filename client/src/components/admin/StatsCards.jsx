import { Users, Link2, MousePointerClick, Eye } from "lucide-react";

const StatsCards = ({ stats }) => {
  const items = [
    { label: "Users", value: stats?.totalUsers ?? 0, icon: Users },
    { label: "Links", value: stats?.totalLinks ?? 0, icon: Link2 },
    {
      label: "Clicks",
      value: stats?.totalClicks ?? 0,
      icon: MousePointerClick,
    },
    { label: "Profile views", value: stats?.totalProfileViews ?? 0, icon: Eye },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-base-300/50 bg-base-100 p-4 shadow-sm"
        >
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <item.icon className="h-4 w-4" />
          </div>
          <p className="text-2xl font-black">{item.value}</p>
          <p className="text-xs text-base-content/50">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
