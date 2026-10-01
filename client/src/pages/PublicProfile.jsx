import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { User, Loader2, ExternalLink, MousePointerClick } from "lucide-react";
import { getPublicProfile, trackClick } from "../services/publicService";

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPublicProfile(username);
        if (cancelled) return;
        setProfile(data.profile);
        setLinks(data.links || []);
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || "User not found");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const handleLinkClick = async (link) => {
    try {
      const data = await trackClick(link._id);
      window.open(data.url || link.url, "_blank", "noopener,noreferrer");
    } catch {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 px-4 text-center">
        <p className="text-lg font-semibold">Profile not found</p>
        <p className="text-sm text-base-content/50">{error}</p>
      </div>
    );
  }

  const skills = Array.isArray(profile.skills) ? profile.skills : [];

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        {/* Avatar */}
        <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-base-100 shadow-lg">
          {profile.profilePicture ? (
            <img
              src={profile.profilePicture}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/10">
              <User className="h-10 w-10 text-primary/60" />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-black tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-sm text-base-content/50">@{profile.username}</p>

        {profile.bio && (
          <p className="mt-3 max-w-sm text-sm text-base-content/70">
            {profile.bio}
          </p>
        )}

        {skills.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mt-8 w-full space-y-3">
          {links.length === 0 ? (
            <p className="text-sm text-base-content/40">No links yet</p>
          ) : (
            links.map((link, i) => (
              <motion.button
                key={link._id}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => handleLinkClick(link)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-base-300/60 bg-base-100 px-4 py-3.5 text-sm font-semibold shadow-sm transition hover:border-primary/40 hover:shadow-md active:scale-[0.98]"
              >
                <span className="capitalize">
                  {link.title || link.platform || "Link"}
                </span>
                <ExternalLink className="h-3.5 w-3.5 opacity-40" />
              </motion.button>
            ))
          )}
        </div>

        {typeof profile.profileViews === "number" && (
          <p className="mt-8 flex items-center gap-1.5 text-xs text-base-content/40">
            <MousePointerClick className="h-3.5 w-3.5" />
            {profile.profileViews} profile views
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default PublicProfile;
