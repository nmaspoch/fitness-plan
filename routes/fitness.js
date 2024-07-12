const path = require('path');

const express = require('express');

const router = express.Router();

const fitnessController = require('../controllers/fitness');

router.get("/", fitnessController.getHome);

module.exports = router;
