const express = require('express');
const {v4} = require('uuid')

const router = express.Router();
const {generateBackgroundImage} = require('../utils/image');
const Captcha = require('../models/captcha');
const {generateQuestion} = require('../utils/questions')


/**
 * @swagger
 * /captcha:
 *   get:
 *     summary: Genera un nuevo CAPTCHA
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: type
 *         description: UUID del CAPTCHA a validar
 *         in: path
 *         required: true
 *         type: string
 * 
 *     responses:
 *       200:
 *         description: CAPTCHA generado correctamente
 *         schema:
 *           type: object
 *           properties:
 *             uuid:
 *               type: string
 *             image:
 *               type: string
 *       500:
 *         description: Error al guardar el CAPTCHA en la base de datos
 */
router.get('/', async (req, res) => {
  let { type } = req.params;
  if(!type) type='math'
  const {question, message, answer} = generateQuestion(type)
  const backgroundImage = await generateBackgroundImage(question);
  const uuid = v4()
  const captcha = new Captcha({ uuid, question, answer });

  try {
    await captcha.save();

    res.json({
        uuid,
        message,
        image:backgroundImage
    })
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar el CAPTCHA en la base de datos');
  }
});

/**
 * @swagger
 * /captcha/{uuid}:
 *   post:
 *     summary: Valida un CAPTCHA existente
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: uuid
 *         description: UUID del CAPTCHA a validar
 *         in: path
 *         required: true
 *         type: string
 *       - name: answer
 *         description: Respuesta del usuario al CAPTCHA
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             answer:
 *               type: string
 *     responses:
 *       200:
 *         description: CAPTCHA validado correctamente
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             isOk:
 *               type: boolean
 *       400:
 *         description: Respuesta incorrecta
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             isOk:
 *               type: boolean
 *       500:
 *         description: Error al validar el CAPTCHA en la base de datos
 */
router.post('/:uuid', async (req, res) => {
  const { answer } = req.body;
  const { uuid } = req.params;

  try {
    const captcha = await Captcha.findOne({ uuid });

    if (captcha && answer === captcha.answer) {
      res.status(200).json({message:'CAPTCHA validado correctamente', isOk:true});
    } else {
      res.status(400).send({message:'Respuesta incorrecta', isOk:false});
    }
    await Captcha.deleteOne({ uuid });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al validar el CAPTCHA en la base de datos');
  }
});


module.exports = router;