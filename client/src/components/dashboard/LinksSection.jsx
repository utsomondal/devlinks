import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";
import LinkItem from "./LinkItem";
import { getMyLinks, createLink, deleteLink } from "../../services/linkService";

const PLATFORMS = [
  "github",
  "linkedin",
  "twitter",
  "instagram",
  "facebook",
  "youtube",
  "codepen",
  "stackoverflow",
  "medium",
  "devto",
];

const LinksSection = ({ onLinksChange }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [type, setType] = useState("platform");
  const [platform, setPlatform] = useState("github");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const refreshLinks = async () => {
    try {
      const data = await getMyLinks();
      setLinks(data || []);
      onLinksChange?.(data || []);
    } catch {
      toast.error("Failed to load links");
    }
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await getMyLinks();
        if (cancelled) return;
        setLinks(data || []);
        onLinksChange?.(data || []);
      } catch {
        if (!cancelled) toast.error("Failed to load links");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setType("platform");
    setPlatform("github");
    setUsername("");
    setTitle("");
    setUrl("");
    setShowForm(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload =
        type === "platform"
          ? { type, platform, username }
          : { type, title, url };

      await createLink(payload);
      toast.success("Link added");
      resetForm();
      await refreshLinks();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Failed to add link";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLink(id);
      toast.success("Link deleted");
      await refreshLinks();
    } catch {
      toast.error("Failed to delete link");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-base-300/60 bg-base-100/60 p-6 shadow-sm backdrop-blur-md"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Links</h2>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="btn btn-primary btn-sm gap-1.5 rounded-xl"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="mb-5 space-y-3 rounded-2xl border border-base-300/50 bg-base-200/40 p-4"
        >
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType("platform")}
              className={`btn btn-sm flex-1 rounded-lg ${
                type === "platform" ? "btn-primary" : "btn-ghost"
              }`}
            >
              Platform
            </button>
            <button
              type="button"
              onClick={() => setType("portfolio")}
              className={`btn btn-sm flex-1 rounded-lg ${
                type === "portfolio" ? "btn-primary" : "btn-ghost"
              }`}
            >
              Portfolio
            </button>
          </div>

          {type === "platform" ? (
            <>
              <select
                className="select select-bordered w-full rounded-xl"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="input input-bordered w-full rounded-xl"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                className="input input-bordered w-full rounded-xl"
                placeholder="Title (e.g. My Portfolio)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="url"
                className="input input-bordered w-full rounded-xl"
                placeholder="https://yoursite.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-ghost btn-sm flex-1 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary btn-sm flex-1 gap-1 rounded-xl"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : links.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center text-base-content/40">
          <LinkIcon className="h-8 w-8 opacity-40" />
          <p className="text-sm">No links yet. Add your first one.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {links.map((link) => (
            <LinkItem key={link._id} link={link} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default LinksSection;
