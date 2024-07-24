const path = require('path');

const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profile');
const planController = require('../controllers/plan');

router.get("/profile", profileController.getProfile);
// router.get("/", profileController.getCreatePlan);
// router.get("/create-profile", profileController.getCreateProfile);
router.get("/", planController.getCreatePlan);

router.get("/plan", planController.getPlan);
router.post("/plan", planController.postPlan);

module.exports = router;
