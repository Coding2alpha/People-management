const Person = require("../models/person");

const addPerson = async (req, res) => {
  console.log(req.body);
  const { name, age, gender, mobileNumber } = req.body;

  const person = new Person({
    name,
    age,
    gender,
    mobileNumber,
  });

  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllPerson = async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update a person by ID
const editPerson = async (req, res) => {
  const { name, age, gender, mobileNumber } = req.body;

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        gender,
        mobileNumber,
      },
      { new: true }
    );

    res.json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a person by ID
const deletePerson = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPerson = await Person.findOneAndDelete({ _id: id });

    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.json({ message: "Person deleted successfully", deletedPerson });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addPerson, getAllPerson, editPerson, deletePerson };
