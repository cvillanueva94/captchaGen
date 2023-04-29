const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const helmet = require("helmet");

const swaggerDocs = require('./captcha-docs.js');

const connectDB = require('./utils/database');

const captchaRoutes = require('./routes/captcha');
const healthcheckRoutes = require('./routes/health');

const app = express();

dotenv.config()

// Conexión a la base de datos
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(helmet());

//Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas para CAPTCHA
app.use('/captcha', captchaRoutes);
app.use('/healthcheck', healthcheckRoutes);

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send("Something broke!");
});

// Puerto de escucha del servidor
const PORT = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
	// Exit the app with error status.
	try {
		console.log("*** uncaughtException:", err);
	} catch (e) {}
});
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});