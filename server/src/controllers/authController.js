import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id, user.role);

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message,
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email or username",
      });
    }

    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    sendTokenResponse(user, 201, res, "User registered successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isDeleted: false }).select(
      "+password",
    );

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    sendTokenResponse(user, 200, res, "Login successful");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Guest / Demo Login
// @route   POST /api/auth/guest
export const guestLogin = async (req, res) => {
  try {
    const { role = "user" } = req.body || {};

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'user' or 'admin'",
      });
    }

    let user = await User.findOne({
      email: role === "admin" ? "admin@devlinks.com" : "guest@devlinks.com",
      isDeleted: false,
    });

    if (!user) {
      user = await User.create({
        name: role === "admin" ? "Demo Admin" : "Guest User",
        username: role === "admin" ? "demoadmin" : "guestuser",
        email: role === "admin" ? "admin@devlinks.com" : "guest@devlinks.com",
        password: "guest123456",
        role,
        bio:
          role === "admin"
            ? "I am the demo admin"
            : "I am a guest user for testing",
      });
    }

    sendTokenResponse(user, 200, res, `Logged in as ${role}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
