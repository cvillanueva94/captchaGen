const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');

const swaggerDocs = require('./captcha-docs.js');

const connectDB = require('./utils/database');

const captchaRoutes = require('./routes/captcha');
const healthcheckRoutes = require('./routes/health');

const app = express();

dotenv.config()

// Conexión a la base de datos
connectDB();

// Middleware para manejar las solicitudes JSON
app.use(express.json());

//Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas para CAPTCHA
app.use('/captcha', captchaRoutes);
app.use('/healthcheck', healthcheckRoutes);


// Puerto de escucha del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});