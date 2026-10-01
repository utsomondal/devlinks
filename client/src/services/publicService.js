import api from "./api";

export const getPublicProfile = async (username) => {
  const res = await api.get(`/public/${username}`);
  return res.data;
};

export const trackClick = async (linkId) => {
  const res = await api.post(`/public/click/${linkId}`);
  return res.data;
};