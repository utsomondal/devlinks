import api from "./api";

export const getMyProfile = async () => {
  const res = await api.get("/users/me");
  return res.data.user;
};

export const updateMyProfile = async (data) => {
  const res = await api.put("/users/me", data);
  return res.data.user;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await api.put("/users/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.profilePicture;
};