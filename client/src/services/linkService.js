import api from "./api";

export const getMyLinks = async () => {
  const res = await api.get("/links");
  return res.data.links;
};

export const createLink = async (data) => {
  const res = await api.post("/links", data);
  return res.data.link;
};

export const updateLink = async (id, data) => {
  const res = await api.put(`/links/${id}`, data);
  return res.data.link;
};

export const deleteLink = async (id) => {
  const res = await api.delete(`/links/${id}`);
  return res.data;
};

export const reorderLinks = async (orderedIds) => {
  const res = await api.put("/links/reorder", { orderedIds });
  return res.data.links;
};
