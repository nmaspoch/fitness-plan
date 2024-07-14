const OpenAI = require("openai");
const openai = new OpenAI();

const Profile = require("../models/profile");

// async function getText() {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content:
//           "As a Personal Trainer, you are tasked to generate a comprehensive 4-week workout plan that is specifically designed to help the client achieve a particular [fitness goal]. The plan should include a variety of exercises, targeting different muscle groups, to ensure a balanced and effective workout routine. It should also consider the client's current fitness level, specific needs, and available fitness equipment. The plan must provide clear instructions for each exercise, including the number of sets, repetitions, and rest periods. Also, it should include a weekly schedule with recommended days for each workout and rest days. Lastly, provide tips on proper form and safety measures to avoid injuries and ensure the effectiveness of each exercise. Return the data in JSON",
//       },
//       { role: "user", content: "I am a 130 lb 158 cm tall 20 year old man who is skinny fat and wants to lose his beer belly" },
//     ],
//     model: "gpt-3.5-turbo-0125",
//     response_format: { type: "json_object" },
//   });
//   return completion.choices[0].message.content;
// }

exports.getForm = (req, res, next) => {
  // getText()
  //   .then((bodyText) => res.render("index", { bodyText: bodyText }))
  //   .catch((err) => console.log(err));
  res.render("form", { pageTitle: "Home", bodyText: "Placeholder text" });
};

exports.getProfile = (req, res, next) => {
  Profile.findByPk(1).then((profile) =>
    res.render("profile", {name: profile.name, weight:profile.weight, age:profile.age, height:profile.height, goals:profile.goals})
  );
  // console.log(profile);
};
