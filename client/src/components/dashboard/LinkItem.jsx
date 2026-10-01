import { ExternalLink, Trash2, MousePointerClick } from "lucide-react";

const LinkItem = ({ link, onDelete }) => {
  const title =
    link.type === "platform" ? link.title || link.platform : link.title;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-base-300/50 bg-base-100 p-3">
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
