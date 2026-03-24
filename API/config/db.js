const mongoose = require("mongoose");

async function connectDB() {
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    console.log("Connexion a la base de donnees OK");
  } catch (error) {
    console.error("Erreur de connexion a la base de donnees :", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
