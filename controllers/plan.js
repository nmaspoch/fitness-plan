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
    model: "gpt-3.5-turbo",
    // model: "gpt-4o",
    response_format: { type: "json_object" },
  });
  return completion.choices[0].message.content;
}

exports.getCreatePlan = (req, res, next) => {
  res.render("./plan/create-plan", {
    pageTitle: "Create Plan",
    bodyText: "",
  });
};

exports.postPlan = (req, res, next) => {
  const planForm = req.body;
  Profile.findByPk(1)
    .then((profile) => {
      getText(profile, planForm)
        .then((response) => {
          return JSON.parse(response);
        })
        .then((response) => {
          return response.workout_plan.sessions;
        })
        .then((sessions) => {
          req.profile
            .getPlan()
            .then((plan) => plan.update({ weeks: sessions.length }));

          req.profile.getPlan().then((plan) => {
            for (let i = 0; i < sessions.length; i++) {
              const exercises = sessions[i].exercises;

              plan
                .createSession({
                  week: sessions[i].week,
                  session: sessions[i].session,
                })
                .then((session) => {
                  for (let j = 0; j < sessions[i].exercises.length; j++) {
                    session.createExercise({
                      name: sessions[i].exercises[j].name,
                      sets: sessions[i].exercises[j].sets,
                      reps: sessions[i].exercises[j].reps,
                    });
                  }
                });
            }
          });
          res.render("./plan/plan");
        });
    })
    .catch((err) => console.log(err));
};
