const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:

const Cohort = require("./models/Cohorts.model");
const Student = require("./models/Students.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//connect to database using mongoose
mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then((x) => console.log(`connected to database: ${x.connections[0].name}`))
  .catch((err) => console.error(err));

// MIDDLEWARE
//app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohort) => res.json(cohort))
    .catch((err) => console.error(err));
});

//POST /api/students - Creates a new student

app.post("/api/students", async (req, res) => {
  console.log(req.body);
  try {
    await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
    });

    res.status(201).send("Student Created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while creating Student");
  }
});

// GET /api/students - Retrieves all of the students in the database collection
app.get("/api/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((student) => res.json(student))
    .catch((err) => console.error(err));
});

//GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:id", (req, res) => {
  Student.find({ cohort: req.params.id })
    .populate("cohort")
    .then((student) => {
      res.status(201).json(student);
    })
    .catch((err) => console.error(err));
});

//GET /api/students/:studentId - Retrieves a specific student by id
app.get("/api/students/:id", (req, res) => {
  Student.findById(req.params.id)
    .populate("cohort")
    .then((student) => {
      res.status(201).json(student);
    })
    .catch((err) => console.error(err));
});

// PUT /api/students/:studentId - Updates a specific student by id
app.put("/api/students/:id", (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(201).json(updatedStudent);
    })
    .catch((err) => console.error(err));
});

//DELETE /api/students/:studentId - Deletes a specific student by id
app.delete("/api/students/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then((deletedStudent) => {
      res.status(201).json(deletedStudent);
    })
    .catch((err) => console.error(err));
});

//Cohort Routes

//POST /api/cohorts - Creates a new cohort

app.post("/api/cohorts", async (req, res) => {
  console.log(req.body);
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;
  try {
    await Cohort.create({
      inProgress,
      cohortSlug,
      cohortName,
      program,
      campus,
      startDate,
      endDate,
      programManager,
      leadTeacher,
      totalHours,
    });

    res.status(201).send("Cohort Created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while creating Cohort");
  }
});

//GET /api/cohorts - Retrieves all of the cohorts in the database collection
app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohort) => res.json(cohort))
    .catch((err) => console.error(err));
});

//GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
app.get("/api/cohorts/:id", (req, res) => {
  Cohort.findById(req.params.id)
    .then((student) => {
      res.status(201).json(student);
    })
    .catch((err) => console.error(err));
});

//PUT /api/cohorts/:cohortId - Updates a specific cohort by id
app.put("/api/cohorts/:id", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(201).json(updatedCohort);
    })
    .catch((err) => console.error(err));
});

//DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
app.delete("/api/cohorts/:id", (req, res) => {
  Cohort.findByIdAndDelete(req.params.id)
    .then((deletedCohort) => {
      res.status(200).json(deletedCohort);
    })
    .catch((err) => console.error(err));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
