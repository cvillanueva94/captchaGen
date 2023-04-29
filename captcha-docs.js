const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'API de CAPTCHA',
      version: '1.0.0',
      description: 'API para generar y validar CAPTCHAs',
    },
    basePath: '/',
  },
  apis: ['./routes/captcha.js'],
};

module.exports = swaggerJsdoc(options);