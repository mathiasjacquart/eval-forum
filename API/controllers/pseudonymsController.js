const pseudonyms = [];
function getPseudonyms(req, res) {
  res.json(pseudonyms);
}

function createPseudonym(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Le champ name est obligatoire." });
  }

  const newPseudonym = {
    id: pseudonyms.length + 1,
    name,
  };

  pseudonyms.push(newPseudonym);
  return res.status(201).json(newPseudonym);
}

module.exports = {
  getPseudonyms,
  createPseudonym,
};
