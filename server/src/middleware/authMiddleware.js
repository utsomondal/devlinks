import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check HttpOnly cookie first
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    // 2. Fallback: Authorization header (Bearer token)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required, no token provided",
      });
    }

    // Verify the JWT and decode its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded.id).select("-password");

    if (!user || user.isDeleted) {
      return res.status(401).json({
        success: false,
        message: "Invalid or inactive user account",
      });
    }

    // Attach the authenticated user to the request object
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired or authentication failed",
    });
  }
};

export const admin = (req, res, next) => {
  // Allow access only to authenticated admin users
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied. Insufficient privileges",
  });
};
