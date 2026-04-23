require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
// Ensure there's a session secret. Prefer environment-provided value.
const sessionSecret =
  process.env.SESSION_SECRET || "dev-secret-not-for-production-please-change";
if (!process.env.SESSION_SECRET) {
  console.warn(
    "WARNING: SESSION_SECRET not set in .env — using a development fallback. Do NOT use this in production."
  );
}

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

const routes = require("./routes");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
