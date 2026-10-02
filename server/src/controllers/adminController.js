import User from "../models/User.js";
import Link from "../models/Link.js";

const isGuestAdmin = (user) =>
  user.email === "admin@devlinks.com" || user.username === "demoadmin";

const isGuestUserDoc = (user) =>
  user.email === "guest@devlinks.com" || user.username === "guestuser";

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isDeleted: false });
    const totalLinks = await Link.countDocuments({ isDeleted: false });
    const totalClicks = await Link.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: null, total: { $sum: "$clickCount" } } },
    ]);
    const totalProfileViews = await User.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: null, total: { $sum: "$profileViews" } } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalLinks,
        totalClicks: totalClicks[0]?.total || 0,
        totalProfileViews: totalProfileViews[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false })
      .select("-password")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Soft delete (ban) a user
// @route   DELETE /api/admin/users/:id
// @access  Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Cannot delete yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete yourself",
      });
    }

    // Guest admin can only ban guest user
    if (isGuestAdmin(req.user) && !isGuestUserDoc(user)) {
      return res.status(403).json({
        success: false,
        message: "Demo admin can only moderate the guest user account",
      });
    }

    user.isDeleted = true;
    await user.save();

    await Link.updateMany({ user: user._id }, { isDeleted: true });

    res.status(200).json({
      success: true,
      message: "User and their links deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all links
// @route   GET /api/admin/links
// @access  Admin
export const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find({ isDeleted: false })
      .populate("user", "name username email")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: links.length,
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Soft delete a link
// @route   DELETE /api/admin/links/:id
// @access  Admin
export const deleteLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id).populate(
      "user",
      "email username"
    );

    if (!link || link.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    // Guest admin can only delete guest user's links
    if (isGuestAdmin(req.user)) {
      const owner = link.user;
      if (!owner || !isGuestUserDoc(owner)) {
        return res.status(403).json({
          success: false,
          message: "Demo admin can only moderate guest user links",
        });
      }
    }

    link.isDeleted = true;
    await link.save();

    res.status(200).json({
      success: true,
      message: "Link deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
