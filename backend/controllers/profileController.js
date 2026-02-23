const Profile = require('../models/Profile');
const scrapeGithubProfile = require('../services/scraper');

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
    console.log("✅ Profile Saved:", savedProfile);

    res.status(201).json(savedProfile);

  } catch (error) {
    console.error("🔥 Error in scrapeAndSaveProfile:", error);
    res.status(500).json({ message: error.message });
  }
};


// GET - Fetch All Profiles
exports.getAllProfiles = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body);
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.json(profiles);
    console.log(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};