const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../../data");
const dataFile = path.join(dataDir, "data.json");
const defaultData = { journals: {} };

ensureDataFile();

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  if (!fs.existsSync(dataFile)) {
    writeData(defaultData);
  }
}

function readData() {
  try {
    const rawData = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Could not read journal data:", err.message);
    return defaultData;
  }
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

function getAll() {
  const data = readData();
  return data.journals || {};
}

function getById(id) {
  return getAll()[id] || null;
}

function save(id, journal) {
  const data = readData();
  data.journals = data.journals || {};
  data.journals[id] = journal;
  writeData(data);
}

function remove(id) {
  const data = readData();
  data.journals = data.journals || {};
  delete data.journals[id];
  writeData(data);
}

module.exports = {
  getAll,
  getById,
  save,
  remove,
};
