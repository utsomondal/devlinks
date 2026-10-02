import { Link2, MousePointerClick, Eye, Share2 } from "lucide-react";

const DashboardStats = ({ links = [], profileViews = 0 }) => {
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, l) => sum + (l.clickCount || 0), 0);

  const items = [
    { label: "Active Links", value: totalLinks, icon: Link2 },
    { label: "Total Clicks", value: totalClicks, icon: MousePointerClick },
    { label: "Profile Views", value: profileViews, icon: Eye },
    {
      label: "Share",
      value: totalLinks > 0 ? "Ready" : "Add links",
      icon: Share2,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-base-300/50 bg-base-100/60 p-4 shadow-sm backdrop-blur-md"
        >
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <item.icon className="h-4 w-4" />
          </div>
          <p className="text-xl font-black sm:text-2xl">{item.value}</p>
          <p className="text-xs text-base-content/50">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;