const path = require('path');

const express = require('express');

const router = express.Router();

const fitnessController = require('../controllers/fitness');

// router.get("/", fitnessController.getForm);
router.get("/", fitnessController.getProfile);

module.exports = router;
