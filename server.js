const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

require("dotenv").config();
// require("./config/jwt.config");

app.use(
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ credentials: true, origin: `http://localhost:${process.env.FRONTEND_PORT}` })
);

const mailRoutes = require("./routes/mail.routes");
app.use('/api', mailRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Seniors Mobile Tax Services Going To Port: ${process.env.PORT}`)
);
