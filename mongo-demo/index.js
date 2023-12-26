const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match:/pattern/ // Regular expression
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    // Arrow function does not work here
    required: function () {
      return this.isPublished;
    },
    min: 5,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema);
const course = new Course({
  name: "React Course",
  category: "mobile",
  author: "Mosh",
  tags: ["react", "frontend"],
  isPublished: true,
  price: 15,
});

const createCourse = async () => {
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};

createCourse();

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
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        isPublished: true,
        author: "Shrikant",
      },
    }
  );

  console.log(result);
};

// updateCourse("6586cbfa112d60640a10614c");

const deleteCourse = async (id) => {
  // const result = await Course.deleteOne({ _id: id });
  const result = await Course.findByIdAndDelete({ _id: id });
  console.log(result);
};

// deleteCourse("6586cbfa112d60640a10614c");
