import mongoose from "mongoose";

const voterschema = new mongoose.Schema({
  firstname: { required: true, type: String },
  lastname: { required: true, type: String },
  email: { required: true, unique: true, type: String },
  password: { required: true, type: String },
  faculty: { required: true, type: String },
  regno: { required: true, type: String },
  hasVoted: { required: true, type: Boolean, default: false }
});

const adminschema = new mongoose.Schema({
  firstname: { required: true, type: String },
  lastname: { required: true, type: String },
  email: { required: true, unqiue: true, type: String },
  password: { required: true, type: String },
  
});

const classRepschema = new mongoose.Schema({
  name: {required: true, type: String},
  votes: {required: true, type: Number},
  faculty: {required: true, type: String}
});

const facultyRepschema = new mongoose.Schema({
  name: {required: true, type: String},
  votes: {required: true, type: Number},
  faculty: {required: true, type: String}
});

const delegateschema = new mongoose.Schema({
  name: {required: true, type: String},
  votes: {required: true, type: Number},
  faculty: {required: true, type: String}
});

const reviewschema = new mongoose.Schema({
  name: {required: true, type: String},
  rating: {required: true, type: Number},
  review: {required: true, type: String}
});

export const delegates = mongoose.model("delegates", delegateschema);
export const facultyReps = mongoose.model("facultyreps", facultyRepschema);
export const classReps = mongoose.model("classreps", classRepschema);
export const voters = mongoose.model("voters", voterschema);
export const admins = mongoose.model("admins", adminschema);
export const reviews = mongoose.model("reviews", reviewschema);
