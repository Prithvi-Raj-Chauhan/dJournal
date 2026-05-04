const planService = require("../services/planService");

function renderPlans(res, options = {}) {
  res.render("plans", {
    navbar: "dJournal",
    plans: planService.getPlansNewestFirst(),
    input: options.input || { title: "", description: "", finishDate: "", difficulty: "5" },
    formAction: options.formAction || "/plans",
    submitLabel: options.submitLabel || "Add Plan",
  });
}

function listPlans(req, res) {
  renderPlans(res);
}

function createPlan(req, res) {
  planService.createPlan({
    title: req.body.title,
    description: req.body.description,
    finishDate: req.body.finishDate,
    difficulty: req.body.difficulty,
  });

  res.redirect("/plans");
}

function showEditForm(req, res) {
  const plan = planService.getPlanById(req.params.id);

  if (!plan) {
    return res.redirect("/plans");
  }

  return renderPlans(res, {
    input: {
      title: plan.title,
      description: plan.description,
      finishDate: plan.finishDate || plan.dueDate || "",
      difficulty: plan.difficulty || "5",
    },
    formAction: `/plans/edit/${plan.id}`,
    submitLabel: "Update Plan",
  });
}

function updatePlan(req, res) {
  planService.updatePlan(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    finishDate: req.body.finishDate,
    difficulty: req.body.difficulty,
  });

  res.redirect("/plans");
}

function deletePlan(req, res) {
  planService.deletePlan(req.params.id);
  res.redirect("/plans");
}

module.exports = {
  listPlans,
  createPlan,
  showEditForm,
  updatePlan,
  deletePlan,
};
