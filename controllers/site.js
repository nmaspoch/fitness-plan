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
   response = await getText(req.session.profile, planForm);
   response = JSON.parse(response);
   workouts = response.workout_plan.workouts;

   const profile = await Profile.findOne({where: {email: req.session.profile.email}})
   const plan = await profile.createPlan({numWorkouts: workouts.length});
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
      await profile.save();
   }
   req.session.profile.hasPlan = true;
   res.redirect("/plan");
}

exports.getCreatePlan = (req, res, next) => {
   res.render("./plan/create-plan", {
      pageTitle: "Create Plan",
      isAuthenticated: req.session.isLoggedIn,
      hasPlan: false
   });
};

exports.getPlan = async (req, res, next) => {
   if (!req.session.profile.hasPlan)
   {
      return res.redirect("/create-plan");
   }
   const planInstance = await Plan.findOne({ where: { profileId: req.session.profile.id }, include: { model: Workout, include: Exercise } })
   const plan = planInstance.toJSON();

   res.render("./plan/plan", {
      pageTitle: "Plan",
      profileName: req.session.profile.name,
      plan: plan,
      workouts: plan.workouts,
      isAuthenticated: req.session.isLoggedIn,
      hasPlan: req.session.hasPlan
   });
};

exports.postCreatePlan = (req, res, next) => {
   postPlan(req, res, next);
};

exports.getProfile = (req, res, next) => {
   res.render("./profile/profile", { pageTitle: "Profile", profile: req.session.profile, isAuthenticated: req.session.isLoggedIn, hasPlan: req.session.profile.hasPlan})
};
