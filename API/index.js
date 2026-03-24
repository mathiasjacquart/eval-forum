require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 80;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Serveur demarre sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur au demarrage du serveur :", error.message);
    process.exit(1);
  }
}

startServer();
