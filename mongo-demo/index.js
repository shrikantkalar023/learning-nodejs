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
    lowercase: true,
    // uppercase: true,
    // trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: async (v) => {
        // Do some async work
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 1000);
        });
      },
      message: "A course should have at least one tag.",
    },
  },
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
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);
const course = new Course({
  name: "React Course",
  category: "Web",
  author: "Mosh",
  tags: ["react", "frontend"],
  isPublished: true,
  price: 40.8,
});

const createCourse = async () => {
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (field in err.errors) {
      console.log(err.errors[field]);
    }
  }
};

// createCourse();

const getCourses = async () => {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ price: { $gt: 40 } })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1, price: 1 });
  console.log(courses[0].price);
};

getCourses();

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
