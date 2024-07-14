const env = require("dotenv").config();

const sequelize = require("./util/database");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const fitnessRoutes = require("./routes/fitness");

const errorController = require("./controllers/error");

const Profile = require("./models/profile");

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
  })
);
app.set("view engine", "hbs");
app.set("views, views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(fitnessRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
