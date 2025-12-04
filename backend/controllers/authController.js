const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register a new user
const registerUser = async (req, res) => {};

// Login user
const loginUser = async (req, res) => {};

// Get user profile
const getUserProfile = async (req, res) => {};

modules.exports = { registerUser, loginUser, getUserProfile };
