import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  User,
  AtSign,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Loader2,
  Zap,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const container = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05, ease: "easeOut" },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

export default function RegisterCard() {
  const navigate = useNavigate();
  const { register, guestLogin } = useAuth();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Username: force lowercase, strip invalid chars as user types
    if (name === "username") {
      const cleaned = value.toLowerCase().replace(/[^a-z0-9_]/g, "");
      setForm((prev) => ({ ...prev, username: cleaned }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const redirectByRole = (role) => {
    navigate(role === "admin" ? "/admin" : "/dashboard", { replace: true });
  };

  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!form.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!USERNAME_REGEX.test(form.username)) {
      toast.error("Username: 3–20 chars, lowercase letters, numbers, _ only");
      return false;
    }
    if (!form.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const user = await register({
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      redirectByRole(user?.role);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async (role) => {
    setGuestLoading(role);
    try {
      const user = await guestLogin(role);
      redirectByRole(user?.role || role);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Guest login failed";
      toast.error(msg);
    } finally {
      setGuestLoading(null);
    }
  };

  const isBusy = loading || guestLoading !== null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-md lg:max-w-none"
    >
      <div className="relative rounded-3xl border border-base-300/80 bg-base-100/80 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
        {/* Top accent */}
        <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

        {/* Heading */}
        <motion.div variants={item} className="mb-5 text-center">
          <div className="mb-2.5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
            <UserPlus className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-base-content sm:text-3xl">
            Create Account
          </h1>
          <p className="mt-1 text-xs font-medium text-base-content/65 sm:text-sm">
            Build your developer portfolio with DevLinks
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <motion.div variants={item} className="form-control">
            <label className="label py-0.5" htmlFor="name">
              <span className="label-text text-xs font-semibold text-base-content/80">
                Full Name
              </span>
            </label>
            <div className="relative flex items-center">
              <User className="pointer-events-none absolute left-3.5 z-10 h-4 w-4 text-base-content/50" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                disabled={isBusy}
                className="input input-bordered input-md h-10 w-full rounded-xl bg-base-200/40 pl-10 text-sm transition-all focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 sm:h-11"
                required
              />
            </div>
          </motion.div>

          {/* Username — required for /u/:username */}
          <motion.div variants={item} className="form-control">
            <label className="label py-0.5" htmlFor="username">
              <span className="label-text text-xs font-semibold text-base-content/80">
                Username
              </span>
              <span className="label-text-alt text-[10px] text-base-content/45">
                /u/
                <span className="text-primary">{form.username || "you"}</span>
              </span>
            </label>
            <div className="relative flex items-center">
              <AtSign className="pointer-events-none absolute left-3.5 z-10 h-4 w-4 text-base-content/50" />
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="johndoe"
                value={form.username}
                onChange={handleChange}
                disabled={isBusy}
                maxLength={20}
                className="input input-bordered input-md h-10 w-full rounded-xl bg-base-200/40 pl-10 text-sm transition-all focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 sm:h-11"
                required
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div variants={item} className="form-control">
            <label className="label py-0.5" htmlFor="email">
              <span className="label-text text-xs font-semibold text-base-content/80">
                Email Address
              </span>
            </label>
            <div className="relative flex items-center">
              <Mail className="pointer-events-none absolute left-3.5 z-10 h-4 w-4 text-base-content/50" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={isBusy}
                className="input input-bordered input-md h-10 w-full rounded-xl bg-base-200/40 pl-10 text-sm transition-all focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 sm:h-11"
                required
              />
            </div>
          </motion.div>

          {/* Password row — side by side on sm+ to save height */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <motion.div variants={item} className="form-control">
              <label className="label py-0.5" htmlFor="password">
                <span className="label-text text-xs font-semibold text-base-content/80">
                  Password
                </span>
              </label>
              <div className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3.5 z-10 h-4 w-4 text-base-content/50" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isBusy}
                  className="input input-bordered input-md h-10 w-full rounded-xl bg-base-200/40 pl-10 pr-11 text-sm transition-all focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 sm:h-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 z-10 text-base-content/50 transition-colors hover:text-base-content"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={item} className="form-control">
              <label className="label py-0.5" htmlFor="confirmPassword">
                <span className="label-text text-xs font-semibold text-base-content/80">
                  Confirm
                </span>
              </label>
              <div className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3.5 z-10 h-4 w-4 text-base-content/50" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  disabled={isBusy}
                  className="input input-bordered input-md h-10 w-full rounded-xl bg-base-200/40 pl-10 text-sm transition-all focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 sm:h-11"
                  required
                />
              </div>
            </motion.div>
          </div>

          <motion.div variants={item} className="pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              type="submit"
              disabled={isBusy}
              className="btn btn-primary h-10 w-full gap-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 sm:h-11"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </motion.div>
        </form>

        {/* Fast demo divider */}
        <motion.div variants={item} className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-base-300/80" />
          <span className="inline-flex items-center gap-1 rounded-full border border-base-300/50 bg-base-200/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-base-content/60">
            <Zap className="h-3 w-3 fill-amber-500 text-amber-500" /> Fast Demo
            Access
          </span>
          <div className="h-px flex-1 bg-base-300/80" />
        </motion.div>

        {/* Guest buttons */}
        <motion.div variants={item} className="grid grid-cols-2 gap-2.5">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            type="button"
            onClick={() => handleGuest("user")}
            disabled={isBusy}
            className="group flex items-center justify-center gap-2 rounded-xl border border-base-300/80 bg-base-200/40 px-3 py-2.5 text-xs font-semibold text-base-content transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary disabled:opacity-50"
          >
            {guestLoading === "user" ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <User className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
            )}
            <span>Guest User</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            type="button"
            onClick={() => handleGuest("admin")}
            disabled={isBusy}
            className="group flex items-center justify-center gap-2 rounded-xl border border-base-300/80 bg-base-200/40 px-3 py-2.5 text-xs font-semibold text-base-content transition-all hover:border-secondary/50 hover:bg-secondary/5 hover:text-secondary disabled:opacity-50"
          >
            {guestLoading === "admin" ? (
              <Loader2 className="h-4 w-4 animate-spin text-secondary" />
            ) : (
              <Shield className="h-4 w-4 text-secondary transition-transform group-hover:scale-110" />
            )}
            <span>Guest Admin</span>
          </motion.button>
        </motion.div>

        {/* Login link */}
        <motion.p
          variants={item}
          className="mt-4 text-center text-xs font-medium text-base-content/60"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-primary underline-offset-4 hover:underline"
          >
            Sign in instead
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
}
