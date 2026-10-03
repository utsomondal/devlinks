import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFullUser = async () => {
    const res = await api.get("/auth/me");
    setUser(res.data.user);
    return res.data.user;
  };

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    await api.post("/auth/login", { email, password });
    const fullUser = await fetchFullUser();
    toast.success("Logged in successfully");
    return fullUser;
  };

  const register = async (data) => {
    await api.post("/auth/register", data);
    const fullUser = await fetchFullUser();
    toast.success("Account created successfully");
    return fullUser;
  };

  const guestLogin = async (role = "user") => {
    await api.post("/auth/guest", { role });
    const fullUser = await fetchFullUser();
    toast.success(`Logged in as ${role}`);
    return fullUser;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore logout error
    }
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, guestLogin, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};