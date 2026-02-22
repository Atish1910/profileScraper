const express = require('express');
const Profile = require('../models/Profile');
const scrapeGithubProfile = require('../services/scraper');

const router = express.Router();

// POST route
router.post('/scrape', async (req, res) => {
  try {
    const { url } = req.body;

    const data = await scrapeGithubProfile(url);

    const savedProfile = await Profile.create(data);

    res.json(savedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 }); 
    // 1 = ascending (oldest first)
    // -1 = descending (latest first)
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;