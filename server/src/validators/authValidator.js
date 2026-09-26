import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Please provide a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Please provide a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(1, "Password is required"),
});

export const guestSchema = z.object({
  role: z
    .enum(["user", "admin"], {
      errorMap: () => ({ message: "Role must be 'user' or 'admin'" }),
    })
    .default("user"),
});
