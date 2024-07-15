const OpenAI = require("openai");
const openai = new OpenAI();

async function getText(profile, planForm) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "As a Personal Trainer, you are tasked to generate a comprehensive 4-week workout plan that is specifically designed to help the client achieve a particular [fitness goal]. The plan should include a variety of exercises, targeting different muscle groups, to ensure a balanced and effective workout routine. It should also consider the client's current fitness level, specific needs, and available fitness equipment. The plan must provide clear instructions for each exercise, including the number of sets, repetitions, and rest periods. Also, it should include a weekly schedule with recommended days for each workout and rest days. Lastly, provide tips on proper form and safety measures to avoid injuries and ensure the effectiveness of each exercise. Return the data in JSON",
      },
      {
        role: "user",
        content: `I am a ${profile.age} year old who weighs ${profile.weight} lb and is ${profile.height} cm tall. 
        I want a plan that lasts ${planForm.duration} weeks with ${planForm.sessions} sessions per week. 
        The exercises I want to do are: ${planForm.exercises}. My fitness goal is to ${planForm.goal}`,
      },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });
  return completion.choices[0].message.content;
}

const Profile = require("../models/profile");

exports.getCreatePlan = (req, res, next) => {
  res.render("./plan/create-plan", {
    pageTitle: "Create Profile",
    bodyText: "",
  });
};

exports.postPlan = (req, res, next) => {
  const planForm = req.body;
  Profile.findByPk(1)
    .then((profile) => {
      getText(profile, planForm).then(response => console.log(response));
      // res.render("./plan/plan", {
      //   pageTitle: "Plan",
      // });
    })
    .catch((err) => console.log(err));
};
