const express = require("express");
const router = express.Router();
const Joi = require("joi");

// Data DB
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// Validation
const validateCourse = (course) => {
  const schema = Joi.string().min(4).messages({
    "string.min": `"name" should have a minimum length of 4`,
    "string.empty": `"name" is a required field`,
  });

  return schema.validate(course);
};

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

router.post("/", (req, res) => {
  const { error, value } = validateCourse(req.body.name);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: value,
  };

  courses.push(course);
  res.status(201).send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  const { error, value } = validateCourse(req.body.name);

  if (error) return res.status(400).send(error.details[0].message);

  course.name = value;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

module.exports = router;
