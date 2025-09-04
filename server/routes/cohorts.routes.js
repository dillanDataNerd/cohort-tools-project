const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohorts.model");

//Cohort Routes
//POST /api/cohorts - Creates a new cohort
router.post("/", async (req, res, next) => {
  console.log(req.body);
  const { inProgress, cohortSlug, cohortName, program, campus, startDate, endDate, programManager, leadTeacher, totalHours } = req.body;
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
    next(error);
  }
});

//GET /api/cohorts - Retrieves all of the cohorts in the database collection
router.get("/", async (req, res, next) => {
  try {
    const response = await Cohort.find();
    res.json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
router.get("/:cohortId", async (req, res, next) => {
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.json(response);
  } catch (error) {
    console.error(error);
     next(error);
  }
});

//PUT /api/cohorts/:cohortId - Updates a specific cohort by id
router.put("/:cohortId", async (req, res, next) => {
  try {
    const response = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    res.status(202).json(response);
  } catch (error) {
    console.error(error);
     next(error);
  }
});

//DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
router.delete("/:cohortId", async (req, res, next) => {
  try {
    const response = await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(202).json(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
