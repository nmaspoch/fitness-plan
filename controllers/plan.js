const Plan = require("../models/plan");
const Profile = require("../models/profile");
const Session = require("../models/session");
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
  sessions = response.workout_plan.sessions;

  const plan = await req.profile.getPlan();
  plan.update({ numSessions: sessions.length });
  await plan.save();

  for (let i = 0; i < sessions.length; i++) {
    const session = await plan.createSession({
      week: sessions[i].week,
      session: sessions[i].session,
    });

    for (let j = 0; j < sessions[i].exercises.length; j++) {
      const exercise = await session.createExercise({
        name: sessions[i].exercises[j].name,
        sets: sessions[i].exercises[j].sets,
        reps: sessions[i].exercises[j].reps,
        category: sessions[i].exercises[j].category,
      });
      session.save();
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
  const planInstance = await Plan.findOne({ where: { profileId: req.profile.id }, include: { model: Session, include: Exercise } })
  const plan = planInstance.toJSON();

  res.render("./plan/plan", {
    pageTitle: "Plan",
    profileName: req.profile.name,
    plan: plan,
    sessions: plan.sessions
  });
};

exports.postPlan = (req, res, next) => {
  postPlan(req, res, next);
};
