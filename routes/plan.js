const path = require('path');

const express = require('express');

const router = express.Router();

const planController = require('../controllers/plan');

router.get("/create-plan", planController.getCreatePlan);
router.post("/create-plan", planController.postCreatePlan);

router.get("/plan", planController.getPlan);

module.exports = router;
