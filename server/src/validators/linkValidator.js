import { z } from "zod";

// Common Platform Enum
const platformEnum = z.enum([
  "github",
  "linkedin",
  "twitter",
  "instagram",
  "facebook",
  "youtube",
  "codepen",
  "stackoverflow",
  "medium",
  "devto",
]);

// Common URL Schema
const urlSchema = z
  .string({ required_error: "URL is required" })
  .trim()
  .url("Please provide a valid URL");

// CREATE LINK SCHEMA
export const createLinkSchema = z.discriminatedUnion("type", [
  // 1. Social Platform Link
  z.object({
    type: z.literal("platform"),
    platform: platformEnum,
    username: z
      .string({ required_error: "Username is required" })
      .trim()
      .min(1, "Username is required")
      .max(50, "Username cannot exceed 50 characters"),
  }),

  // 2. Custom Portfolio Link
  z.object({
    type: z.literal("portfolio"),
    title: z
      .string({ required_error: "Title is required" })
      .trim()
      .min(1, "Title is required")
      .max(50, "Title cannot exceed 50 characters"),
    url: urlSchema,
  }),
]);

// UPDATE LINK SCHEMA
export const updateLinkSchema = z.discriminatedUnion("type", [
  // Updating a Platform Link
  z.object({
    type: z.literal("platform"),
    platform: platformEnum.optional(),
    username: z.string().trim().min(1).max(50).optional(),
  }),

  // Updating a Portfolio Link
  z.object({
    type: z.literal("portfolio"),
    title: z.string().trim().min(1).max(50).optional(),
    url: urlSchema.optional(),
  }),
]);

export const reorderLinksSchema = z.object({
  orderedIds: z
    .array(z.string().min(1))
    .min(1, "At least one link ID is required"),
});
