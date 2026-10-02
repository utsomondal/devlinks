import { Trash2, ExternalLink } from "lucide-react";
import { isGuestAdmin, isGuestUser } from "../../utils/guestAccounts";

const LinksTable = ({ links, onDelete, currentUser }) => {
  if (!links?.length) {
    return (
      <p className="py-6 text-center text-sm text-base-content/40">No links</p>
    );
  }

  const canDeleteLink = (link) => {
    if (!isGuestAdmin(currentUser)) return true;
    return isGuestUser(link.user);
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-base-300/50">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Link</th>
            <th>Owner</th>
            <th>Clicks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link._id}>
              <td>
                <div className="font-medium capitalize">
                  {link.title || link.platform}
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-base-content/50 hover:text-primary"
                >
                  <ExternalLink className="h-3 w-3" />
                  {link.url}
                </a>
              </td>
              <td className="text-xs">
                {link.user?.username || link.user?.name || "—"}
              </td>
              <td>{link.clickCount ?? 0}</td>
              <td>
                {canDeleteLink(link) && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs text-error"
                    onClick={() => onDelete(link._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinksTable;
