import api from "./api";

export const getStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data.stats;
};

export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data.users;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};

export const getAllLinks = async () => {
  const res = await api.get("/admin/links");
  return res.data.links;
};

export const deleteLink = async (id) => {
  const res = await api.delete(`/admin/links/${id}`);
  return res.data;
};