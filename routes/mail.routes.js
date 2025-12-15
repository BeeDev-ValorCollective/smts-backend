
const express = require('express')
const { sendContactMail } = require('../controllers/contactMail.controller')
const { sendUnsubMail } = require('../controllers/unsubMail.controller')
const { createCaptcha, verifyCaptcha } = require('../utils/captchaStore')

const router = express.Router()

// ----- CAPTCHA ROUTE -----
router.get('/captcha', (req, res) => {
  const captcha = createCaptcha()
  res.json(captcha)
})

// ----- CAPTCHA MIDDLEWARE -----
function captchaMiddleware(req, res, next) {
  const {
    captchaId,
    captchaAnswer,
    website,
  } = req.body

  if (website) {
    return res.status(400).json({
      success: false,
      message: 'Spam detected.',
    })
  }

  if (!verifyCaptcha(captchaId, captchaAnswer)) {
    return res.status(400).json({
      success: false,
      message: 'Captcha failed. Please try again.',
    })
  }

  next()
}

router.post('/sendContactMail', captchaMiddleware, sendContactMail)

router.post('/sendUnsubMail', sendUnsubMail)

module.exports = router
