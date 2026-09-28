import AmbientBackground from "../components/auth/AmbientBackground";
import DevEngineSpotlight from "../components/auth/DevEngineSpotlight";
import RegisterCard from "../components/auth/RegisterCard";

export default function Register() {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 items-center justify-center overflow-hidden px-4 py-6 sm:px-8">
      <AmbientBackground />

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <RegisterCard />
        <DevEngineSpotlight />
      </div>
    </div>
  );
}
