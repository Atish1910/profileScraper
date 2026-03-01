const express = require('express');
const router = express.Router();

const { scrapeAndSaveProfile, getAllProfiles, deleteProfile, updateProfile, scrapeAndSavedMulipleProfiles} = require('../controllers/profileController');

router.post('/scrape', scrapeAndSaveProfile);
router.get('/', getAllProfiles);
router.delete("/:id", deleteProfile);
router.put("/:id", updateProfile);
router.post("/bulk", scrapeAndSavedMulipleProfiles);


module.exports = router;