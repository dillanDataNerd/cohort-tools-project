const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const studentsSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  projects: [],
  cohort: []
});

const Student = mongoose.model("Student", studentsSchema);

module.exports = Student;
