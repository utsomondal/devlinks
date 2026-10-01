import { User, Link as LinkIcon } from "lucide-react";

const LivePreview = ({ user, links = [] }) => {
  const avatarUrl = user?.profilePicture || null;
  const skills = Array.isArray(user?.skills) ? user.skills : [];

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 shadow-xl shadow-base-200/50">
      {/* Window header */}
      <div className="flex items-center justify-between border-b border-base-200 bg-base-200/30 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-base-300/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-base-300/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-base-300/80" />
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-widest text-base-content/40">
          Live Preview
        </div>
        <div className="w-8" />
      </div>

      <div className="flex min-h-105 w-full flex-col items-center bg-linear-to-b from-base-200/50 to-base-100 p-6">
        {/* Avatar */}
        <div className="mt-2 flex flex-col items-center text-center">
          <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-base-100 shadow-md">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10">
                <User className="h-8 w-8 text-primary/60" />
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold">{user?.name || "Your Name"}</h3>
          <p className="mt-1 text-sm text-base-content/50">
            @{user?.username || "username"}
          </p>
          <p className="mt-3 max-w-55 text-xs text-base-content/60">
            {user?.bio || "Your bio goes here."}
          </p>

          {skills.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Links */}
        <div className="mt-6 w-full max-w-60 space-y-2">
          {links.length === 0 ? (
            <p className="py-4 text-center text-xs text-base-content/40">
              Links will appear here
            </p>
          ) : (
            links.map((link) => (
              <div
                key={link._id}
                className="truncate rounded-xl border border-base-300/50 bg-base-100 px-3 py-2.5 text-center text-sm font-medium shadow-sm"
              >
                {link.title || link.platform || "Link"}
              </div>
            ))
          )}
        </div>

        {user?.username && (
          <div className="mt-auto pt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1 text-[11px] text-base-content/50">
              <LinkIcon className="h-3 w-3" />
              /u/{user.username}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
