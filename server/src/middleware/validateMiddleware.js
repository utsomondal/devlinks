import { z } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    // Parsed and sanitized data is assigned back to req.body
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    // Safely handle Zod Validation Errors
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Fallback for non-Zod unexpected errors
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during validation",
    });
  }
};
