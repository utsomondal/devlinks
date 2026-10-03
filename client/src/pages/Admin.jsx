import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import StatsCards from "../components/admin/StatsCards";
import UsersTable from "../components/admin/UsersTable";
import LinksTable from "../components/admin/LinksTable";
import {
  getStats,
  getAllUsers,
  deleteUser,
  getAllLinks,
  deleteLink,
} from "../services/adminService";

const Admin = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    try {
      const [s, u, l] = await Promise.all([
        getStats(),
        getAllUsers(),
        getAllLinks(),
      ]);
      setStats(s);
      setUsers(u || []);
      setLinks(l || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAll();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleDeleteUser = async (id) => {
    if (!confirm("Ban this user and their links?")) return;
    try {
      await deleteUser(id);
      toast.success("User banned");
      setUsers((prev) => prev.filter((u) => u._id !== id));
      const s = await getStats();
      setStats(s);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleDeleteLink = async (id) => {
    if (!confirm("Delete this link?")) return;
    try {
      await deleteLink(id);
      toast.success("Link deleted");
      setLinks((prev) => prev.filter((l) => l._id !== id));
      const s = await getStats();
      setStats(s);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <div className="skeleton h-10 w-48 rounded-lg" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
        <div className="skeleton h-64 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
          <Shield className="h-3.5 w-3.5" />
          Admin
        </div>
        <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-base-content/60">
          Platform stats and moderation
        </p>
      </motion.div>

      <div className="space-y-8">
        <StatsCards stats={stats} />

        <section className="rounded-3xl border border-base-300/50 bg-base-100/60 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Users</h2>
          <UsersTable
            users={users}
            onDelete={handleDeleteUser}
            currentUserId={user?.id || user?._id}
            currentUser={user}
          />
        </section>

        <section className="rounded-3xl border border-base-300/50 bg-base-100/60 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Links</h2>
          <LinksTable
            links={links}
            onDelete={handleDeleteLink}
            currentUser={user}
          />
        </section>
      </div>
    </div>
  );
};

export default Admin;
