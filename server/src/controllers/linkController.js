import Link from "../models/Link.js";

// @desc    Create a new link
// @route   POST /api/links
// @access  Private
export const createLink = async (req, res) => {
  try {
    const { type, platform, username, title, url } = req.body;

    // Validate the link type
    if (!type || !["platform", "portfolio"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be 'platform' or 'portfolio'",
      });
    }

    // Validate required fields for platform links
    if (type === "platform") {
      if (!platform || !username) {
        return res.status(400).json({
          success: false,
          message: "Platform and username are required",
        });
      }
    }

    // Validate required fields and URL for portfolio links
    if (type === "portfolio") {
      if (!title || !url) {
        return res.status(400).json({
          success: false,
          message: "Title and URL are required for portfolio",
        });
      }

      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return res.status(400).json({
          success: false,
          message: "URL must start with http:// or https://",
        });
      }
    }

    // Determine the next display order for the user's links
    const lastLink = await Link.findOne({
      user: req.user._id,
      isDeleted: false,
    })
      .sort("-order")
      .select("order");

    const order = lastLink ? lastLink.order + 1 : 0;

    const link = await Link.create({
      type,
      platform,
      username,
      title,
      url,
      user: req.user._id,
      order,
    });

    res.status(201).json({
      success: true,
      message: "Link created successfully",
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all links of the logged-in user
// @route   GET /api/links
// @access  Private
export const getMyLinks = async (req, res) => {
  try {
    const links = await Link.find({
      user: req.user._id,
      isDeleted: false,
    }).sort("order");

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

// @desc    Update a link
// @route   PUT /api/links/:id
// @access  Private
export const updateLink = async (req, res) => {
  try {
    const link = await Link.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    const { platform, username, title, url } = req.body;

    if (link.type === "platform") {
      if (platform) link.platform = platform;
      if (username) link.username = username;
    }

    if (link.type === "portfolio") {
      if (title) link.title = title;

      if (url) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          return res.status(400).json({
            success: false,
            message: "URL must start with http:// or https://",
          });
        }

        link.url = url;
      }
    }

    await link.save(); // Run the pre-save middleware

    res.status(200).json({
      success: true,
      message: "Link updated successfully",
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Soft delete a link
// @route   DELETE /api/links/:id
// @access  Private
export const deleteLink = async (req, res) => {
  try {
    const link = await Link.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
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

// @desc    Reorder links
// @route   PUT /api/links/reorder
// @access  Private
export const reorderLinks = async (req, res) => {
  try {
    const { orderedIds } = req.body;

    // orderedIds should be an array of link IDs in the new order
    // Example: ["id1", "id2", "id3"]

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "orderedIds must be a non-empty array",
      });
    }

    // Update order for each link
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: {
          _id: id,
          user: req.user._id,
          isDeleted: false,
        },
        update: { order: index },
      },
    }));

    await Link.bulkWrite(bulkOps);

    // Return updated links
    const links = await Link.find({
      user: req.user._id,
      isDeleted: false,
    }).sort("order");

    res.status(200).json({
      success: true,
      message: "Links reordered successfully",
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
