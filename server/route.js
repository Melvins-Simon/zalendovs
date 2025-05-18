import {Router} from "express";
import { register, getFacultyReps, getDelegates, getClassReps, updateVotes, recordReview, getReviews, getResults, resetResults, login } from "./handlers.js";

const router = Router();
router.post("/signup", register);
router.get("/facultyreps", getFacultyReps);
router.get("/classreps", getClassReps);
router.get("/delegates", getDelegates);
router.post("/vote", updateVotes);
router.post("/review", recordReview);
router.get("/reviews", getReviews);
router.get("/results", getResults);
router.post("/reset-results", resetResults);
router.post("/login", login);

export default router;
