const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);
const course = new Course({
  name: "React Course",
  author: "Mosh",
  tags: ["react", "frontend"],
  isPublished: true,
});

const createCourse = async () => {
  const result = await course.save();
  console.log(result);
};

// createCourse();

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in
// nin (not in)

const getCourses = async () => {
  const courses = await Course
    // .find({ isPublished: true, author: "Mosh" })
    // .fing({ price: { $gte: 10, $lte: 20 } })
    .fing({ price: { $in: [5, 10, 15] } })
    .select({ name: 1, tags: 1 })
    .sort({ name: -1 })
    .limit(10);
  console.log(courses);
};

getCourses();
