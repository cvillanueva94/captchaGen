const express = require('express');
const {v4} = require('uuid')

const router = express.Router();
const {generateBackgroundImage} = require('../utils/image');
const Captcha = require('../models/captcha');
const {generateQuestion} = require('../utils/questions')


// Genera la imagen de CAPTCHA y guarda la respuesta en MongoDB
router.get('/math', async (req, res) => {
  // Genera una nueva pregunta de CAPTCHA y su respuesta

  const {question, answer} = generateQuestion('math')

  // Genera la imagen de fondo con un color aleatorio
  const backgroundImage = await generateBackgroundImage(question);

  // Genera un UUID para la respuesta de CAPTCHA
  const uuid = v4()

  // Crea un nuevo documento de CAPTCHA con la respuesta y el UUID
  const captcha = new Captcha({ uuid, question, answer });

  try {
    // Guarda el documento de CAPTCHA en MongoDB
    await captcha.save();

    res.json({
        uuid,
        image:backgroundImage
    })
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar el CAPTCHA en la base de datos');
  }
});

// Ruta para validar la respuesta del usuario
router.post('/:uuid', async (req, res) => {
  const { answer } = req.body;
  const { uuid } = req.params;

  try {
    // Busca la respuesta de CAPTCHA en MongoDB
    const captcha = await Captcha.findOne({ uuid });

    // Comprueba si la respuesta del usuario es correcta
    if (captcha && answer === captcha.answer) {
      res.status(200).send('CAPTCHA validado correctamente');
    } else {
      res.status(400).send('Respuesta incorrecta');
    }

    // Elimina la respuesta de CAPTCHA de MongoDB
    await captcha.remove();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al validar el CAPTCHA en la base de datos');
  }
});


module.exports = router;