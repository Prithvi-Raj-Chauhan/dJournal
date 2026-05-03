const journalService = require("../services/journalService");

function renderIndex(res, options = {}) {
  res.render("index", {
    navbar: "dJournal",
    cards: journalService.getJournalsNewestFirst(),
    input: options.input || { title: "", text: "" },
    formAction: options.formAction || "/",
    submitLabel: options.submitLabel || "Add Entry",
  });
}

function listJournals(req, res) {
  renderIndex(res);
}

function createJournal(req, res) {
  journalService.createJournal({
    title: req.body.title,
    text: req.body.text,
  });

  res.redirect("/");
}

function showEditForm(req, res) {
  const journal = journalService.getJournalById(req.params.id);

  if (!journal) {
    return res.redirect("/");
  }

  return renderIndex(res, {
    input: {
      title: journal.title,
      text: journal.text,
    },
    formAction: `/edit/${journal.id}`,
    submitLabel: "Update Entry",
  });
}

function updateJournal(req, res) {
  journalService.updateJournal(req.params.id, {
    title: req.body.title,
    text: req.body.text,
  });

  res.redirect("/");
}

function deleteJournal(req, res) {
  journalService.deleteJournal(req.params.id);
  res.redirect("/");
}

module.exports = {
  listJournals,
  createJournal,
  showEditForm,
  updateJournal,
  deleteJournal,
};
