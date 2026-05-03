const express = require("express");
const journalController = require("../controllers/journalController");

const router = express.Router();

router.get("/", journalController.listJournals);
router.post("/", journalController.createJournal);
router.get("/edit/:id", journalController.showEditForm);
router.post("/edit/:id", journalController.updateJournal);
router.post("/delete/:id", journalController.deleteJournal);

module.exports = router;
