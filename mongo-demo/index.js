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

const getCourses = async () => {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ isPublished: true, author: "Mosh" })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
};

// getCourses();

const updateCourse = async (id) => {
  // Approach: Query first
  // findById()
  // Modify its properties
  // save()

  const course = await Course.findById(id);
  if (!course) return;

  // course.isPublished = true;

  course.set({
    isPublished: true,
    author: "Shri",
  });

  const result = await course.save();
  console.log(result);

  // Approach: Update first
  // Update directly
  // Optionally: get the updated document
};

updateCourse("6586cbfa112d60640a10614c");
