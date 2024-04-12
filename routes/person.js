const express = require("express");
const router = express.Router();
const {
  addPerson,
  getAllPerson,
  editPerson,
  deletePerson,
} = require("../controllers/person");

router.route("/").post(addPerson).get(getAllPerson);
router.route("/:id").put(editPerson).delete(deletePerson);

module.exports = router;
