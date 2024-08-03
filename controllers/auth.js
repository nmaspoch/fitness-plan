const Profile = require("../models/profile");

exports.getLogin = (req, res, next) => {
    const login = req.session.isLoggedIn === true;
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false,
    });
  };
  
  exports.postLogin = (req, res, next) => {
    Profile.findByPk(1)
      .then(profile => {
        req.session.isLoggedIn = true;
        req.profile = profile;
        req.session.save((err) =>{
          console.log(err);
          res.redirect("/");
        });
      })
      .catch(err => console.log(err));
  }
  
  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect("/");
    });
  }