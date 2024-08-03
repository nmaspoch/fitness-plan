const Plan = require("../models/plan");
const Profile = require("../models/profile");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");

const sequelize = require("../util/database");

const OpenAI = require("openai");
const openai = new OpenAI();

const prompts = require("../util/prompts");

async function getText(profile, planForm) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompts.system,
      },
      {
        role: "user",
        content: eval("`" + prompts.user + "`"),
      },
    ],
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
  });
  return completion.choices[0].message.content;
}

async function postPlan(req, res, next) {
  const planForm = req.body;
  response = await getText(req.profile, planForm);
  response = JSON.parse(response);
  workouts = response.workout_plan.workouts;

  const plan = await req.profile.getPlan();
  plan.update({ numworkouts: workouts.length });
  await plan.save();

  for (let i = 0; i < workouts.length; i++) {
    const workout = await plan.createWorkout({
      week: workouts[i].week,
      workout: workouts[i].workout,
    });

    for (let j = 0; j < workouts[i].exercises.length; j++) {
      const exercise = await workout.createExercise({
        name: workouts[i].exercises[j].name,
        sets: workouts[i].exercises[j].sets,
        reps: workouts[i].exercises[j].reps,
        category: workouts[i].exercises[j].category,
      });
      workout.save();
    }
    await plan.save();
    await req.profile.save();
  }
  res.redirect("/plan");
}

exports.getCreatePlan = (req, res, next) => {
  res.render("./plan/create-plan", {
    pageTitle: "Create Plan",
  });
};

exports.getPlan = async (req, res, next) => {
  const planInstance = await Plan.findOne({ where: { profileId: req.profile.id }, include: { model: Workout, include: Exercise } })
  const plan = planInstance.toJSON();

  res.render("./plan/plan", {
    pageTitle: "Plan",
    profileName: req.profile.name,
    plan: plan,
    workouts: plan.workouts
  });
};

exports.postPlan = (req, res, next) => {
  postPlan(req, res, next);
};
