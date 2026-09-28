import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Shield,
  Loader2,
  Sparkles,
  Zap,
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

export default function LoginCard() {
  const navigate = useNavigate();
  const { login, guestLogin } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const redirectByRole = (role) => {
    navigate(role === "admin" ? "/admin" : "/dashboard", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const user = await login(form.email.trim(), form.password);
      redirectByRole(user?.role);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid email or password";
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
      className="w-full max-w-md mx-auto lg:max-w-none"
    >
      <div className="relative rounded-3xl border border-base-300/80 bg-base-100/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

        {/* Heading */}
        <motion.div variants={item} className="mb-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3 shadow-sm border border-primary/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-base-content">
            Welcome back
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-base-content/65 font-medium">
            Sign in to manage your DevLinks portfolio
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={item} className="form-control">
            <label className="label py-1" htmlFor="email">
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
                className="input input-bordered input-md h-11 w-full pl-10 rounded-xl bg-base-200/40 text-sm focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={item} className="form-control">
            <label className="label py-1" htmlFor="password">
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
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                disabled={isBusy}
                className="input input-bordered input-md h-11 w-full pl-10 pr-11 rounded-xl bg-base-200/40 text-sm focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 z-10 text-base-content/50 hover:text-base-content transition-colors"
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

          <motion.div variants={item} className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              type="submit"
              disabled={isBusy}
              className="btn btn-primary h-11 w-full gap-2 rounded-xl shadow-lg shadow-primary/25 font-semibold text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </motion.div>
        </form>

        {/* Fast Demo Divider */}
        <motion.div variants={item} className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-base-300/80" />
          <span className="inline-flex items-center gap-1 rounded-full bg-base-200/80 border border-base-300/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-base-content/60">
            <Zap className="h-3 w-3 text-amber-500 fill-amber-500" /> Fast Demo
            Access
          </span>
          <div className="h-px flex-1 bg-base-300/80" />
        </motion.div>

        {/* Guest Buttons */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            type="button"
            onClick={() => handleGuest("user")}
            disabled={isBusy}
            className="group flex items-center justify-center gap-2 rounded-xl border border-base-300/80 bg-base-200/40 py-2.5 px-3 text-xs font-semibold text-base-content hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all disabled:opacity-50"
          >
            {guestLoading === "user" ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <User className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
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
            className="group flex items-center justify-center gap-2 rounded-xl border border-base-300/80 bg-base-200/40 py-2.5 px-3 text-xs font-semibold text-base-content hover:border-secondary/50 hover:bg-secondary/5 hover:text-secondary transition-all disabled:opacity-50"
          >
            {guestLoading === "admin" ? (
              <Loader2 className="h-4 w-4 animate-spin text-secondary" />
            ) : (
              <Shield className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" />
            )}
            <span>Guest Admin</span>
          </motion.button>
        </motion.div>

        {/* Register Link */}
        <motion.p
          variants={item}
          className="mt-6 text-center text-xs text-base-content/60 font-medium"
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-primary hover:underline underline-offset-4"
          >
            Create one for free
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
}
