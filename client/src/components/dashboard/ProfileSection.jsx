import { useState } from "react";
import { motion } from "framer-motion";
import { User, Camera, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { updateMyProfile, uploadAvatar } from "../../services/userService";

const ProfileSection = ({ onProfileUpdate }) => {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(() => user?.name || "");
  const [bio, setBio] = useState(() => user?.bio || "");
  const [skillsInput, setSkillsInput] = useState(() =>
    Array.isArray(user?.skills) ? user.skills.join(", ") : "",
  );
  const [avatarPreview, setAvatarPreview] = useState(
    () => user?.profilePicture || null,
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadAvatar(file);
      setAvatarPreview(url);
      setUser((prev) => ({ ...prev, profilePicture: url }));
      toast.success("Avatar updated");
      onProfileUpdate?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const skills = skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const updated = await updateMyProfile({ name, bio, skills });
      setUser((prev) => ({ ...prev, ...updated }));
      toast.success("Profile saved");
      onProfileUpdate?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-base-300/60 bg-base-100/60 p-6 shadow-sm backdrop-blur-md"
    >
      <h2 className="mb-5 text-lg font-bold">Profile</h2>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-base-300 bg-base-200">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-7 w-7 opacity-40" />
                </div>
              )}
            </div>

            <label className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-content shadow">
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Camera className="h-3.5 w-3.5" />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
                disabled={uploading}
              />
            </label>
          </div>

          <div className="text-sm text-base-content/50">
            <p className="font-medium text-base-content">@{user?.username}</p>
            <p className="text-xs">JPG, PNG · Max 5MB</p>
          </div>
        </div>

        {/* Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
          />
        </div>

        {/* Bio */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Bio</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full rounded-xl"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={300}
            placeholder="Short bio about you..."
          />
        </div>

        {/* Skills */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Skills</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full rounded-xl"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="React, Node.js, MongoDB"
          />
          <label className="label">
            <span className="label-text-alt text-base-content/40">
              Comma separated
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full rounded-xl gap-2"
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save profile
        </button>
      </form>
    </motion.section>
  );
};

export default ProfileSection;
