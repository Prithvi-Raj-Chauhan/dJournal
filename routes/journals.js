const express = require("express");
const router = express.Router();
const { getJournals, addJournal, deleteJournalById } = require("../controllers/journalController");
const { getCurrentDateFormatted } = require("../utils/date");

// Show all journals
router.get("/", (req, res) => {
  const journals = getJournals();
  res.render("index", { Navbar: "dJournal", cards: journals });
});

// Add new journal
router.post("/", (req, res) => {
  const entry = { ...req.body, date: getCurrentDateFormatted(), id: Date.now().toString() };
  addJournal(entry);
  res.redirect("/");
});

// Delete journal
router.get("/delete/:id", (req, res) => {
  deleteJournalById(req.params.id);
  res.redirect("/");
});

module.exports = router;
