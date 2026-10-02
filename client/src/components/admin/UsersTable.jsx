import { Trash2 } from "lucide-react";
import { isGuestAdmin, isGuestUser } from "../../utils/guestAccounts";

const UsersTable = ({ users, onDelete, currentUserId, currentUser }) => {
  if (!users?.length) {
    return (
      <p className="py-6 text-center text-sm text-base-content/40">No users</p>
    );
  }

  const canDelete = (target) => {
    if (target._id === currentUserId) return false;
    if (isGuestAdmin(currentUser) && !isGuestUser(target)) return false;
    return true;
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-base-300/50">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Views</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                <div className="font-medium">{u.name}</div>
                <div className="text-xs text-base-content/50">
                  @{u.username} · {u.email}
                </div>
              </td>
              <td>
                <span className="badge badge-sm badge-ghost">{u.role}</span>
              </td>
              <td>{u.profileViews ?? 0}</td>
              <td>
                {canDelete(u) && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs text-error"
                    onClick={() => onDelete(u._id)}
                    title="Ban user"
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

export default UsersTable;
