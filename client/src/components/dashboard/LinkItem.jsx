import { useState } from "react";
import {
  ExternalLink,
  Trash2,
  MousePointerClick,
  GripVertical,
  Pencil,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const LinkItem = ({ link, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [username, setUsername] = useState(link.username || "");
  const [title, setTitle] = useState(link.title || "");
  const [url, setUrl] = useState(link.url || "");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const displayTitle =
    link.type === "platform" ? link.title || link.platform : link.title;

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload =
        link.type === "platform"
          ? { platform: link.platform, username }
          : { title, url };
      await onUpdate(link._id, payload);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setUsername(link.username || "");
    setTitle(link.title || "");
    setUrl(link.url || "");
    setEditing(false);
  };

  if (editing) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="space-y-2 rounded-xl border border-primary/30 bg-base-100 p-3"
      >
        {link.type === "platform" ? (
          <input
            type="text"
            className="input input-bordered input-sm w-full rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        ) : (
          <>
            <input
              type="text"
              className="input input-bordered input-sm w-full rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              type="url"
              className="input input-bordered input-sm w-full rounded-lg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://"
            />
          </>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-xs flex-1"
            onClick={handleCancel}
            disabled={saving}
          >
            <X className="h-3.5 w-3.5" />
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary btn-xs flex-1 gap-1"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-xl border border-base-300/50 bg-base-100 p-3"
    >
      <button
        type="button"
        className="cursor-grab touch-none text-base-content/30 hover:text-base-content/60 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold capitalize">
          {displayTitle}
        </p>
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 truncate text-xs text-base-content/50 hover:text-primary"
        >
          <ExternalLink className="h-3 w-3 shrink-0" />
          {link.url}
        </a>
      </div>

      <div className="flex items-center gap-1 text-xs text-base-content/40">
        <MousePointerClick className="h-3.5 w-3.5" />
        {link.clickCount || 0}
      </div>

      <button
        type="button"
        onClick={() => setEditing(true)}
        className="btn btn-ghost btn-xs"
        title="Edit"
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => onDelete(link._id)}
        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default LinkItem;