import User from "../models/User.js";
import Link from "../models/Link.js";

// @desc    Get a public profile by username
// @route   GET /api/public/:username
// @access  Public
export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username and exclude deleted accounts
    const user = await User.findOne({
      username: username.toLowerCase(),
      isDeleted: false,
    }).select("name username bio profilePicture skills profileViews");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Increment the profile view count
    user.profileViews += 1;
    await user.save();

    // Get all active links belonging to the user
    const links = await Link.find({
      user: user._id,
      isDeleted: false,
    })
      .select("title url type platform clickCount order")
      .sort("order");

    res.status(200).json({
      success: true,
      profile: {
        name: user.name,
        username: user.username,
        bio: user.bio,
        profilePicture: user.profilePicture,
        skills: user.skills,
        profileViews: user.profileViews,
      },
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Track a link click and return the destination URL
// @route   POST /api/public/click/:id
// @access  Public
export const trackClick = async (req, res) => {
  try {
    const link = await Link.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    // Increment the link click count
    link.clickCount += 1;
    await link.save();

    res.status(200).json({
      success: true,
      url: link.url, // The frontend can redirect the user to this URL
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
