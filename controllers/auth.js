const bcrypt = require("bcryptjs");

const Profile = require("../models/profile");

exports.getLandingPage = (req, res, next) => {
  res.render("landing-page", {layout: "landing", pageTitle: "Home", isAuthenticated: false })
};

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    layout: "landing",
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Profile.findOne({ where: { email: email } })
    .then(profile => {
      if (!profile) {
        return res.redirect("/login");
      }
      bcrypt.compare(password, profile.password).then(doMatch => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.profile = profile;
          return req.session.save((err) => {
            return res.redirect("/profile")
          });
        };
        res.redirect("/login")
      })
        .catch(err => { console.log(err); res.redirect("/login") });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", { layout: "landing", path: "/signup", pageTitle: "Signup", isAuthenticated: false });
};
exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;
  const weight = req.body.weight;
  const height = req.body.height;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (!(password === confirmPassword))
  {
    return res.redirect("/signup")
  }

  Profile.findOne({ where: { email: email } }).then(profileDoc => {
    if (profileDoc) {
      return res.redirect("/signup");
    }

    return bcrypt.hash(password, 12).then(hashedPassword => {
      const profile = new Profile(
        {
          name: name,
          age: age,
          weight: weight,
          height: height,
          email: email,
          password: hashedPassword
        }
      );
      return profile.save();
    });
  }
  ).then(result => res.redirect("/login")).catch(err => console.log(err));
};