const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const fitnessRoutes = require("./routes/fitness");

const errorController = require("./controllers/error");

const expressHbs = require("express-handlebars");

const app = express();

app.engine('hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "", layoutsDir: "", }));
app.set("view engine", "hbs");
app.set("views, views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(fitnessRoutes);

// app.use(errorController.get404);

app.listen(3000);