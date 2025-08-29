const express = require("express");
const router = express.Router();
const {
	getJournals,
	addJournal,
	deleteJournalById,
} = require("../controllers/journalController");
const { getCurrentDateFormatted } = require("../utils/date");

// Show all journals
router.get("/", (req, res) => {
	const journals = getJournals();
	let reversedJournals = Object.fromEntries(Object.entries(journals).reverse());
	res.render("index", {
		Navbar: "dJournal",
		cards: reversedJournals,
		inpText: { title: "", text: "" },
		url: "/",
	});
});

// Add new journal
router.post("/", (req, res) => {
	const id = Date.now().toString();
	const entry = { ...req.body, date: getCurrentDateFormatted(), id: id };
	addJournal(entry, id);
	res.redirect("/");
});

// Deleting journal by the id
router.get("/delete/:id", (req, res) => {
	deleteJournalById(req.params.id);
	res.redirect("/");
});

// Editing the journal by the id
router.get("/edit/:id", (req, res) => {
	const id = req.params.id;
	const journal = getJournals()[id];
	const journals = getJournals();
  console.log(typeof(journal))
	let reversedJournals = Object.fromEntries(Object.entries(journals).reverse());
	const url = `/edit/${id}`;
	res.render("index", {
		Navbar: "dJournal",
		cards: reversedJournals,
		inpText: { title: journal.title, text: journal.text },
		url: url,
	});
});

router.post("/edit/:id", (req, res) => {
	const id = req.params.id;
	const date = getJournals()[id].date; // Getting the date
	const entry = { ...req.body, date: date, id: id };
	addJournal(entry, id);
	res.redirect("/");
});

module.exports = router;
