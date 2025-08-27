const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../data");
const dataFile = path.join(dataDir, "data.json");
ensureDataFile();

// Ensure data file exists
function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir); // create data/ folder if missing
  }
  if (!fs.existsSync(dataFile)) {
    const defaultData = { journals: [] };
    fs.writeFileSync(dataFile, JSON.stringify(defaultData, null, 2), "utf-8");
    console.log("✅ Created new data.json file");
  }
}

function readJSON(filePath) {
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch {
    return { journals: [] };
  }
}

function writeJSON(data, filePath) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(err);
  }
}

function getJournals() {
  const data = readJSON(dataFile);
  return data.journals;
}

function addJournal(entry) {
  const data = readJSON(dataFile);
  data.journals.unshift(entry); // Add to start
  writeJSON(data, dataFile);
}

function deleteJournalById(id) {
  const data = readJSON(dataFile);
  data.journals = data.journals.filter(j => j.id !== id);
  writeJSON(data, dataFile);
}

module.exports = { getJournals, addJournal, deleteJournalById };
