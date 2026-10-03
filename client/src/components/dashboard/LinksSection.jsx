import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import LinkItem from "./LinkItem";
import {
  getMyLinks,
  createLink,
  deleteLink,
  updateLink,
  reorderLinks,
} from "../../services/linkService";
import { LinksListSkeleton } from "../common/Skeleton";

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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

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

  const handleUpdate = async (id, data) => {
    try {
      await updateLink(id, data);
      toast.success("Link updated");
      await refreshLinks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      throw err;
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l._id === active.id);
    const newIndex = links.findIndex((l) => l._id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const reordered = arrayMove(links, oldIndex, newIndex);
    setLinks(reordered);
    onLinksChange?.(reordered);

    try {
      await reorderLinks(reordered.map((l) => l._id));
    } catch {
      toast.error("Failed to save order");
      await refreshLinks();
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
        <LinksListSkeleton />
      ) : links.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center text-base-content/40">
          <LinkIcon className="h-8 w-8 opacity-40" />
          <p className="text-sm">No links yet. Add your first one.</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map((l) => l._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {links.map((link) => (
                <LinkItem
                  key={link._id}
                  link={link}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </motion.section>
  );
};

export default LinksSection;
