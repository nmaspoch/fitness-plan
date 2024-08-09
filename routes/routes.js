const path = require('path');

const express = require('express');

const router = express.Router();

const siteController = require('../controllers/site');
// const planController = require('../controllers/plan');
// const profileController = require('../controllers/profile');

const isAuth = require("../middleware/is-auth");

router.get("/create-plan", isAuth, siteController.getCreatePlan);
router.post("/create-plan", isAuth, siteController.postCreatePlan);

router.get("/plan", isAuth, siteController.getPlan);

router.get("/profile", isAuth, siteController.getProfile);

// router.get("/create-profile", isAuth, profileController.getCreateProfile);

module.exports = router;
