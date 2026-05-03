const journalRepository = require("../repositories/journalRepository");
const { getCurrentDateFormatted } = require("../utils/date");

function getJournalsNewestFirst() {
  return Object.values(journalRepository.getAll()).reverse();
}

function getJournalById(id) {
  return journalRepository.getById(id);
}

function createJournal(input) {
  const id = Date.now().toString();

  const journal = {
    id,
    title: input.title,
    text: input.text,
    date: getCurrentDateFormatted(),
  };

  journalRepository.save(id, journal);
  return journal;
}

function updateJournal(id, input) {
  const existingJournal = journalRepository.getById(id);

  if (!existingJournal) {
    return null;
  }

  const updatedJournal = {
    ...existingJournal,
    title: input.title,
    text: input.text,
  };

  journalRepository.save(id, updatedJournal);
  return updatedJournal;
}

function deleteJournal(id) {
  journalRepository.remove(id);
}

module.exports = {
  getJournalsNewestFirst,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal,
};
