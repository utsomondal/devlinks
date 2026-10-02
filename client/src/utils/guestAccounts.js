export const isGuestAdmin = (user) =>
  user?.email === "admin@devlinks.com" || user?.username === "demoadmin";

export const isGuestUser = (user) =>
  user?.email === "guest@devlinks.com" || user?.username === "guestuser";