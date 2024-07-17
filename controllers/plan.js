const Plan = require("../models/plan");

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
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });
  return completion.choices[0].message.content;
}

const Profile = require("../models/profile");

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
          return new Plan(sessions);
        })
        .then((plan) =>
          res.render("./plan/plan", { pageTitle: "Plan", sessions: plan.getSessions() })
        );
    })
    .catch((err) => console.log(err));
};
