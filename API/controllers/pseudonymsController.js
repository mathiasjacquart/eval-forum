const Pseudonym = require("../models/Pseudonym");

async function getPseudonyms(req, res) {
  try {
    const pseudonyms = await Pseudonym.find().sort({ createdAt: -1 });
    return res.json(pseudonyms);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

async function createPseudonym(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Le champ name est obligatoire." });
  }

  try {
    const newPseudonym = await Pseudonym.create({ name });
    return res.status(201).json(newPseudonym);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Ce pseudonyme existe deja." });
    }
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

module.exports = {
  getPseudonyms,
  createPseudonym,
};
