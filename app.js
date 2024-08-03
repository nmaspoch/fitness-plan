const env = require("dotenv").config();

const sequelize = require("./util/database");

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const planRoutes = require("./routes/plan");
const profileRoutes = require("./routes/profile");
const authRoutes = require("./routes/auth");

const profileController = require("./controllers/profile");
const planController = require("./controllers/plan");
const authController = require("./controllers/auth");
const errorController = require("./controllers/error");

const Profile = require("./models/profile");
const Plan = require("./models/plan");
const Workout = require("./models/workout");
const Exercise = require("./models/exercise");

const mysql = require("mysql2/promise")
const session = require("express-session");
const MySqlStore = require("express-mysql-session")(session);
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  createDatabaseTable: true
}

const store = new MySqlStore(options);

if (env.error) {
  throw new Error("Failed to load .env file");
}

const app = express();

app.engine(
  "hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "main-layout",
    layoutsDir: "views/layouts",
    partialsDir: "views/partials"
  }), 
);

app.set("view engine", "hbs");
app.set("views, views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: process.env.SESS_SECRET, resave: false, saveUninitialized: false, store: store }));

app.use((req, res, next) => {
  if (!req.session.profile)
  {
    return next();
  }
  Profile.findByPk(req.session.profile.id)
    .then(profile => {
      req.profile = profile;
      next();
    })
    .catch(err => console.log(err));
});

app.use(planRoutes);
app.use(profileRoutes);
app.use(authRoutes);
app.use(errorController.get404);

Plan.belongsTo(Profile);
Profile.hasOne(Plan);

Plan.hasMany(Workout);
Workout.belongsTo(Plan);

Workout.hasMany(Exercise);
Exercise.belongsTo(Workout);

sequelize
  .sync({force: true})
  .then((result) => {
    return Profile.findByPk(1);
  })
  .then((profile) => {
    if (!profile) {
      return Profile.create({
        name: "Nicholas Maspoch",
        weight: 130,
        age: 20,
        height: 158,
        goals: "Lose fat",
      });
    }
    return profile;
  })
  .then(profile => profile.createPlan())
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));