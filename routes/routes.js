const path = require('path');

const express = require('express');

const router = express.Router();

const siteController = require('../controllers/site');

const isAuth = require("../middleware/is-auth");

router.get("/create-plan", isAuth, siteController.getCreatePlan);
router.post("/create-plan", isAuth, siteController.postCreatePlan);

router.get("/plan", isAuth, siteController.getPlan);

router.get("/profile", isAuth, siteController.getProfile);

module.exports = router;
