const mongoose = require("mongoose");

async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log("Connexion a MongoDB OK");
  } catch (error) {
    console.error("Erreur de connexion a la base de donnees :", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
