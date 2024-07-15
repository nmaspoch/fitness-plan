const Profile = require("../models/profile");

exports.getCreateProfile = (req, res, next) => {
  // getText()
  //   .then((bodyText) => res.render("index", { bodyText: bodyText }))
  //   .catch((err) => console.log(err));
  res.render("./profile/create-profile", { pageTitle: "Home", bodyText: "Placeholder text" });
};

exports.getProfile = (req, res, next) => {
  Profile.findByPk(1).then((profile) =>
    res.render("./profile/profile", {name: profile.name, weight:profile.weight, age:profile.age, height:profile.height, goals:profile.goals})
  );
};
