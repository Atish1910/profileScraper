const Profile = require('../models/Profile');
const scrapeGithubProfile = require('../services/scraper');

// POST - Scrape & Save
exports.scrapeAndSaveProfile = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "GitHub URL is required" });
    }

    // Scrape Data
    const data = await scrapeGithubProfile(url);

    // Save to DB
    const savedProfile = await Profile.create(data);

    res.status(201).json(savedProfile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET - Fetch All Profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile
      .find()
      .sort({ createdAt: -1 }); // newest first

    res.json(profiles);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};