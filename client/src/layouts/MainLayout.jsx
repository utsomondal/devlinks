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
    <div className="flex h-dvh flex-col overflow-hidden bg-base-100">
      <div className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <Navbar />
      </div>
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}