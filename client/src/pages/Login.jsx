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
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function Login() {
  const navigate = useNavigate();
  const { login, guestLogin } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(null); // "user" | "admin" | null

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
      toast.success("Welcome back!");
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
      toast.success(
        role === "admin" ? "Logged in as Guest Admin" : "Logged in as Guest"
      );
      redirectByRole(user?.role || role);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Guest login failed";
      toast.error(msg);
    } finally {
      setGuestLoading(null);
    }
  };

  const isBusy = loading || guestLoading !== null;

  return (
    /* Fills MainLayout main area only — no extra header/footer, no page scroll */
    <div className="relative flex h-full min-h-0 w-full flex-1 items-center justify-center overflow-hidden px-4 py-4 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[55%] w-[55%] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[45%] w-[45%] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          variants={item}
          className="rounded-2xl border border-base-300/70 bg-base-100/85 p-5 shadow-xl backdrop-blur-md sm:p-7"
        >
          {/* Heading */}
          <div className="mb-5 text-center sm:mb-6">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-base-content/65">
              Sign in to manage your DevLinks
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <motion.div variants={item} className="form-control">
              <label className="label py-0.5" htmlFor="email">
                <span className="label-text text-sm font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/40" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isBusy}
                  className="input input-bordered input-sm h-10 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary/40 sm:input-md sm:h-11"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={item} className="form-control">
              <label className="label py-0.5" htmlFor="password">
                <span className="label-text text-sm font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/40" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isBusy}
                  className="input input-bordered input-sm h-10 w-full pl-10 pr-11 focus:outline-none focus:ring-2 focus:ring-primary/40 sm:input-md sm:h-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 transition-colors hover:text-base-content/70"
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

            <motion.div variants={item} className="pt-1">
              <button
                type="submit"
                disabled={isBusy}
                className="btn btn-primary btn-sm h-10 w-full gap-2 shadow-lg shadow-primary/20 sm:btn-md sm:h-11"
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
              </button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div variants={item} className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-base-300" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-base-content/45">
              or try as guest
            </span>
            <div className="h-px flex-1 bg-base-300" />
          </motion.div>

          {/* Guest buttons */}
          <motion.div variants={item} className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleGuest("user")}
              disabled={isBusy}
              className="btn btn-outline btn-sm h-9 gap-1.5"
            >
              {guestLoading === "user" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <User className="h-4 w-4" />
              )}
              Guest User
            </button>
            <button
              type="button"
              onClick={() => handleGuest("admin")}
              disabled={isBusy}
              className="btn btn-outline btn-sm h-9 gap-1.5"
            >
              {guestLoading === "admin" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              Guest Admin
            </button>
          </motion.div>

          {/* Inline register link (inside card — Navbar already has Sign up) */}
          <motion.p
            variants={item}
            className="mt-4 text-center text-xs text-base-content/55 sm:text-sm"
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create one
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
