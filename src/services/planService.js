const planRepository = require("../repositories/planRepository");
const { getCurrentDateFormatted } = require("../utils/date");

function normalizeDifficulty(difficulty) {
  const parsedDifficulty = Number(difficulty);

  if (!Number.isFinite(parsedDifficulty)) {
    return 5;
  }

  return parsedDifficulty;
}

function getPlansNewestFirst() {
  return Object.values(planRepository.getAll()).reverse();
}

function getPlanById(id) {
  return planRepository.getById(id);
}

function createPlan(input) {
  const id = Date.now().toString();

  const plan = {
    id,
    title: input.title,
    description: input.description,
    finishDate: input.finishDate,
    difficulty: normalizeDifficulty(input.difficulty),
    date: getCurrentDateFormatted(),
  };

  planRepository.save(id, plan);
  return plan;
}

function updatePlan(id, input) {
  const existingPlan = planRepository.getById(id);

  if (!existingPlan) {
    return null;
  }

  const updatedPlan = {
    ...existingPlan,
    title: input.title,
    description: input.description,
    finishDate: input.finishDate,
    difficulty: normalizeDifficulty(input.difficulty),
  };

  planRepository.save(id, updatedPlan);
  return updatedPlan;
}

function deletePlan(id) {
  planRepository.remove(id);
}

module.exports = {
  getPlansNewestFirst,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
};
