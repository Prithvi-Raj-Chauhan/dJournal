const express = require("express");
const planController = require("../controllers/planController");

const router = express.Router();

router.get("/", planController.listPlans);
router.post("/", planController.createPlan);
router.get("/edit/:id", planController.showEditForm);
router.post("/edit/:id", planController.updatePlan);
router.post("/delete/:id", planController.deletePlan);

module.exports = router;
