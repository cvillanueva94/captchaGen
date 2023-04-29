const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define el esquema para la colección de CAPTCHAs
const captchaSchema = new Schema(
  {
    uuid: { type: String, required: true, unique: true },
    question: { type: String, required: true },
    answer: { type: Number, required: true }
  },
  { timestamps: true }
);

// Crea el modelo de Mongoose para la colección de CAPTCHAs
const Captcha = mongoose.model('Captcha', captchaSchema);

module.exports = Captcha;