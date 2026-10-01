import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
    toast.success("Logged in successfully");
    return res.data.user;
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setUser(res.data.user);
    toast.success("Account created successfully");
    return res.data.user;
  };

  const guestLogin = async (role = "user") => {
    const res = await api.post("/auth/guest", { role });
    setUser(res.data.user);
    toast.success(`Logged in as ${role}`);
    return res.data.user;
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
