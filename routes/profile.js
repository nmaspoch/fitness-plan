const path = require('path');

const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profile');

router.get("/profile", profileController.getProfile);
router.get("/create-profile", profileController.getCreateProfile);

module.exports = router;
