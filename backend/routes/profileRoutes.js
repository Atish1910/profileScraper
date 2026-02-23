const express = require('express');
const router = express.Router();

const { scrapeAndSaveProfile, getAllProfiles} = require('../controllers/profileController');

router.post('/scrape', scrapeAndSaveProfile);
router.get('/', getAllProfiles);

module.exports = router;