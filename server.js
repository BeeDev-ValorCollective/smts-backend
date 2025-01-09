//IMPORT REQUIRED MODULES
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// LOAD ENVIROMENT VARIABLES FROM .ENV FILE
require("dotenv").config();

// MIDDLEWARE CONFIG
app.use(
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ credentials: true, origin: `http://localhost:${process.env.FRONTEND_PORT}` })
);

// IMPORT AND USE MAIL ROUTES
const mailRoutes = require("./routes/mail.routes");
app.use('/api', mailRoutes);

// START THE SERVER AND LISTEN ON SPECIFIED PORT
app.listen(process.env.PORT, () =>
  console.log(`Seniors Mobile Tax Services Going To Port: ${process.env.PORT}`)
);
