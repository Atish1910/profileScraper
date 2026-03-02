const Profile = require("../models/Profile");
const scrapeGithubProfile = require("../services/scraper");

// POST - Scrape & Save
exports.scrapeAndSaveProfile = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body);
    const { url } = req.body;
    if (!url) {
      console.log("❌ No URL Provided");
      return res.status(400).json({ message: "GitHub URL is required" });
    }
    const data = await scrapeGithubProfile(url); // Scrape Data
    console.log("📊 Scraped Data:", data);

    const savedProfile = await Profile.create(data); // Save to DB
    console.log("✅ Profile Saved:", savedProfile._id);

    res.status(201).json(savedProfile);
  } catch (error) {
    console.error("🔥 Error in scrapeAndSaveProfile:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET - Fetch All Profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete - Delete Profile
exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProfile = await Profile.findByIdAndDelete(id);
    console.log("profile deleted", deleteProfile);

    res.status(201).json({
      message: "Profile deleted Successfully",
      deleteProfile,
    });
  } catch (error) {
    console.log("error to delete data ", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const updateProfile = await Profile.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log("update result", updateProfile);

    res.status(201).json({
      message: "profile Updated Successfully",
      updateProfile,
    });
  } catch (error) {
    console.log("error to update profile", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.scrapeAndSavedMulipleProfiles = async (req, res) => {
  const { urls } = req.body;

  const scrapeGithubProfile = require("../services/scraper");

  const results = [];

  for (url of urls) {
    try {
      const data = await scrapeGithubProfile(url);
      const savedProfiles = await Profile.create(data);
      results.push(savedProfiles);
    } catch (error) {
      console.log("Error scrapeAndSavedMulipleProfiles", url, error.message);
    }
  }

  res.status(201).json({
    message: "profile scarped & saved successfully",
    totalSaved: results.length,
    data: results,
  });
};
