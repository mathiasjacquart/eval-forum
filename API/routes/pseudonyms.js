const express = require("express");
const {
  getPseudonyms,
  createPseudonym,
} = require("../controllers/pseudonymsController");

const router = express.Router();

router.get("/", getPseudonyms);
router.post("/", createPseudonym);

module.exports = router;
