import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .optional(),

  bio: z
    .string()
    .trim()
    .max(300, "Bio cannot exceed 300 characters")
    .optional(),

  // Skills input handles both Array or Comma-separated string seamlessly
  skills: z
    .union([z.array(z.string().trim().min(1)), z.string().trim()])
    .transform((val) => {
      if (typeof val === "string") {
        return val
          ? val
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [];
      }
      return val.map((s) => s.trim()).filter(Boolean);
    })
    .optional(),

  // Profile image URL
  avatar: z.string().url("Invalid avatar URL").optional(),
});
