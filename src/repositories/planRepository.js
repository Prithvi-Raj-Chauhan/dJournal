const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../../data");
const dataFile = path.join(dataDir, "data.json");
const defaultData = { journals: {}, plans: {} };

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
    console.error("Could not read plan data:", err.message);
    return defaultData;
  }
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

function getAll() {
  const data = readData();
  return data.plans || {};
}

function getById(id) {
  return getAll()[id] || null;
}

function save(id, plan) {
  const data = readData();
  data.plans = data.plans || {};
  data.plans[id] = plan;
  writeData(data);
}

function remove(id) {
  const data = readData();
  data.plans = data.plans || {};
  delete data.plans[id];
  writeData(data);
}

module.exports = {
  getAll,
  getById,
  save,
  remove,
};
