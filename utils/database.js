const mongoose = require('mongoose');

// Conexión a MongoDB utilizando Mongoose
const connectDB = async () => {
  try {

    let url = 'mongodb://'
    if (process.env.DB_USER) {
        url += process.env.DB_USER

        if (process.env.DB_PASSWORD) {
        url += `:${process.env.DB_PASSWORD}`
        }
        url += '@'
    }
    url = process.env.DB_CONNECTION_STRING.replace('mongodb://', url)

    mongoose.set('strictQuery', false)

    mongoose.connect(url, {
        useNewUrlParser: true,
    });
    console.log('Conexión a la base de datos establecida');
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;