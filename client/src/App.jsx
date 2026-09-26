import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, loading, guestLogin, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body items-center text-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">DevLinks</h1>
          <p className="text-base-content/60 text-sm">
            Modern link-in-bio for developers
          </p>

          {user ? (
            <div className="w-full space-y-3 mt-2">
              <div className="bg-base-200 rounded-xl p-4">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm opacity-60">@{user.username}</p>
                <p className="text-xs mt-1">
                  Role:{" "}
                  <span className="badge badge-sm badge-primary">
                    {user.role}
                  </span>
                </p>
              </div>
              <button className="btn btn-error btn-block" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full mt-2">
              <button
                className="btn btn-primary"
                onClick={() => guestLogin("user")}
              >
                Continue as Guest User
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => guestLogin("admin")}
              >
                Continue as Guest Admin
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
