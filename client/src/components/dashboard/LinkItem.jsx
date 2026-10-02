import {
  ExternalLink,
  Trash2,
  MousePointerClick,
  GripVertical,
} from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const LinkItem = ({ link, onDelete }) => {
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

  const title =
    link.type === "platform" ? link.title || link.platform : link.title;

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
        <p className="truncate text-sm font-semibold capitalize">{title}</p>
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
