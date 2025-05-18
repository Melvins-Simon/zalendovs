import { response } from "express";
import { voters, admins, facultyReps, delegates, classReps, reviews } from "./tables.js";
import { comparePassword, hashPassword } from "./helpers.js";

async function register(req, res) {
  const { firstname, lastname, email, password, faculty, regno } = req.body;

  try {
    if (!firstname || !lastname || !email || !password || !faculty || !regno) {
      return res.status(400).json({ message: "Input all required details" });
    }
    console.log(111111111);
    const user = await voters.findOne({ email });
    console.log(222222222);
    if (user) {
      return res.status(400).json({ message: "Email already exits" });
    }

    // Hash the password before saving
    const hashedPassword = hashPassword(password);
    const newuser = new voters({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      faculty,
      regno,
    });
    
    const registered_user = await newuser.save();
    res
      .status(200)
      .json({
        message: "User Registered Successfully!!!",
        registered_user: { ...registered_user._doc, password: undefined },
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function login(req, res) {
  const { email, password, category } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }


    // Determine the model based on the category
    let model;
    if (category === "admin") {
      model = admins;
    } else if (category === "voter") {
      model = voters;
    } else {
      return res.status(400).json({ message: "Invalid category" });
    }
    // Find the user by email
    const user = await model.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Compare the provided password with the hashed password if the category is "voter"
    if (category === "voter") {
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
    }

    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function recordReview(req, res) {
  const { name, rating, review } = req.body;
  try { 
    if (!name || !rating || !review) {
      return res.status(400).json({ message: "Input all required details" });
    }
    const newReview = new reviews({
      name,
      rating,
      review
    });
    const savedReview = await newReview.save();
    res.status(200).json({ message: "Review recorded successfully", savedReview });
  } catch (error) {
    console.error("Error recording review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getResults(req, res) {
  const { electionType } = req.query; // Get the election type from the query parameters
  console.log("Election Type:", electionType); // Log the election type for debugging
  try {
    let model;

    // Determine the model based on the election type
    if (electionType === "classreps") {
      model = classReps;
    } else if (electionType === "facultyreps") {
      model = facultyReps;
    } else if (electionType === "delegates") {
      model = delegates;
    } else {
      return res.status(400).json({ message: "Invalid election type" });
    }

    const results = await model.find().sort({ votes: -1 }); // Sort by votes in descending order
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getReviews(req, res) {
  try {
    const reviewsList = await reviews.find();
    res.status(200).json({ reviews: reviewsList }); 
  }catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getFacultyReps(req, res) {
  try {
    const aspirants = await facultyReps.find();
    res.status(200).json({ aspirants });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getDelegates(req, res) {
  try {
    const aspirants = await delegates.find();
    res.status(200).json({ aspirants });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getClassReps(req, res) {
  try {
    const aspirants = await classReps.find();

    res.status(200).json({ aspirants });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateVotes(req, res) {
  const { candidateId, electionType, userId } = req.body;

  try {
    // Check if the user has already voted
    const user = await voters.findById(userId);
    if (user.hasVoted) {
      return res.status(400).json({ message: "You had already voted!" });
    }

    let model;

    // Determine the model based on the election type
    if (electionType === "classreps") {
      model = classReps;
    } else if (electionType === "facultyreps") {
      model = facultyReps;
    } else if (electionType === "delegates") {
      model = delegates;
    } else {
      throw new Error("No Elections Available");
    }
    // Find the aspirant by ID and increment the votes
    const updatedAspirant = await model.findByIdAndUpdate(
      candidateId,
      { $inc: { votes: 1 } }, // Increment the votes field by 1
      { new: true } // Return the updated document
    );

    if (!updatedAspirant) {
      return res.status(404).json({ message: "Aspirant not found" });
    }

    // Mark the user as having voted
    user.hasVoted = true;
    await user.save();
    
    res
      .status(200)
      .json({
        message: "Vote updated successfully",
        aspirant: updatedAspirant
      });
  } catch (error) {
    console.error("Error updating vote:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}

async function resetResults(req, res) {
  try {
    // Reset votes for all election models
    await classReps.updateMany({}, { $set: { votes: 0 } });
    await facultyReps.updateMany({}, { $set: { votes: 0 } });
    await delegates.updateMany({}, { $set: { votes: 0 } });

    // Reset hasVoted for all voters
    await voters.updateMany({}, { $set: { hasVoted: false } });

    res.status(200).json({ message: "Results and voting status reset successfully" });
  } catch (error) {
    console.error("Error resetting results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export {
  register,
  getClassReps,
  getFacultyReps,
  getDelegates,
  updateVotes,
  recordReview,
  getReviews,
  getResults,
  resetResults,
  login
};
