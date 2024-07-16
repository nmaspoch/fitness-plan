const OpenAI = require("openai");
const openai = new OpenAI();

const prompts = require("../util/prompts");

async function getText(profile, planForm) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompts.system
      },
      {
        role: "user",
        content: eval('`' + prompts.user + '`')
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
      getText(profile, planForm).then(response => console.log(response))
        // .then((response) => {
        //   return JSON.parse(response).workout_plan.sessions;
        // })
        // .then((sessions) =>
        //   console.log(sessions[0])
        //   res.render("./plan/plan", { pageTitle: "Plan", sessions: sessions.count })
        // );
    })
    .catch((err) => console.log(err));
};
