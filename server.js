
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()


require("dotenv").config()

// MIDDLEWARE CONFIG
app.use(
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ 
    credentials: true,
    origin: process.env.NODE_ENV === 'development'
      ? process.env.FRONTEND_DEV_ORIGIN
      : process.env.FRONTEND_ORIGIN
  })
)


const mailRoutes = require("./routes/mail.routes")
app.use('/api', mailRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Seniors Mobile Tax Services Going To Port: ${process.env.PORT}`)
  console.log(`NodeENV = ${process.env.NODE_ENV}`) 
  console.log(`ContactEmail= ${process.env.CONTACT_EMAIL_USER}| NoreplyEmail= ${process.env.NOREPLY_EMAIL_USER}`)

})
