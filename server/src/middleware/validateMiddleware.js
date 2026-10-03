import { z } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || error.errors || [];

      const errors = issues.map((err) => ({
        field: Array.isArray(err.path) ? err.path.join(".") : "",
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during validation",
    });
  }
};