import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "./db.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Validate Gmail condition
  if (!username.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Username must end with @gmail.com" });
  }

  // Check if user exists
  const [existing] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
  if (existing.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  // Insert new user
  const [result] = await db.query(
    "INSERT INTO users (username, password_hash) VALUES (?, ?)",
    [username, hash]
  );

  return res.status(201).json({
    message: "Signup successful",
    user_id: result.insertId   // unique id returned
  });
});


// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Invalid username format" });
  }

  const [user] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
  if (user.length === 0) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const isMatch = await bcrypt.compare(password, user[0].password_hash);
  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  // create login session token
  const token = jwt.sign(
    { user_id: user[0].user_id },
    "SECRET_KEY",
    { expiresIn: "2h" }
  );

  return res.status(200).json({
    message: "Login Success",
    token,
    user_id: user[0].user_id
  });
});

export default router;
