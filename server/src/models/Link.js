import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    // Link type: social platform or portfolio project
    type: {
      type: String,
      enum: ["platform", "portfolio"],
      required: true,
    },

    // Social platform name, used for platform links
    platform: {
      type: String,
      enum: [
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
      ],
    },

    // Platform username, used for platform links
    username: {
      type: String,
      trim: true,
    },

    // Portfolio project title
    title: {
      type: String,
      trim: true,
      maxlength: [50, "Title cannot be more than 50 characters"],
    },

    // Full URL for portfolio links
    // Platform URLs are generated automatically before saving
    url: {
      type: String,
      trim: true,
    },

    // Reference to the user who owns this link
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Display order of the link
    order: {
      type: Number,
      default: 0,
    },

    // Number of times the link has been clicked
    clickCount: {
      type: Number,
      default: 0,
    },

    // Soft delete flag
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Automatically generate the URL and title for platform links
linkSchema.pre("save", function () {
  if (this.type === "platform" && this.platform && this.username) {
    const platformUrls = {
      github: `https://github.com/${this.username}`,
      linkedin: `https://linkedin.com/in/${this.username}`,
      twitter: `https://twitter.com/${this.username}`,
      instagram: `https://instagram.com/${this.username}`,
      facebook: `https://facebook.com/${this.username}`,
      youtube: `https://youtube.com/@${this.username}`,
      codepen: `https://codepen.io/${this.username}`,
      stackoverflow: `https://stackoverflow.com/users/${this.username}`,
      medium: `https://medium.com/@${this.username}`,
      devto: `https://dev.to/${this.username}`,
    };

    this.url = platformUrls[this.platform];
    this.title = this.platform.charAt(0).toUpperCase() + this.platform.slice(1);
  }
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
