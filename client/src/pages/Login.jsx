import AmbientBackground from "../components/auth/AmbientBackground";
import DevEngineSpotlight from "../components/auth/DevEngineSpotlight";
import LoginCard from "../components/auth/LoginCard";

export default function Login() {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 items-center justify-center overflow-hidden px-4 py-6 sm:px-8">
      <AmbientBackground />

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <LoginCard />
        <DevEngineSpotlight />
      </div>
    </div>
  );
}
