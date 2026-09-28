import AmbientBackground from "../components/auth/AmbientBackground";
import DevEngineSpotlight from "../components/auth/DevEngineSpotlight";
import RegisterCard from "../components/auth/RegisterCard";

/**
 * Register page — fits MainLayout main area (no page scroll).
 * Mobile: card only. Desktop: card + DevEngineSpotlight side by side.
 */
export default function Register() {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 items-center justify-center overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
      <AmbientBackground />

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
        <RegisterCard />
        {/* Spotlight hidden on small screens to avoid scroll / clutter */}
        <div className="hidden lg:block">
          <DevEngineSpotlight />
        </div>
      </div>
    </div>
  );
}
