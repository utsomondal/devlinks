import { Outlet, useLocation } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  if (isLanding) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-base-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <Navbar />
      </div>

      {/* ONLY main scrolls */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}