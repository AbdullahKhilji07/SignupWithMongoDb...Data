import userModel from "../models/userModel.js";
import { stringToHash, verifyHash } from "bcrypt-inzi";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, age, isMarried } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {
    const existingUser = await userModel.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).send({ message: "Email is already registered." });
    }

    const hashedPassword = await stringToHash(password);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,         // add age here
      isMarried,   // add isMarried here
    });

    await newUser.save();
    res.status(201).send({ message: "User created successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    if (error.code === 11000) {
      return res.status(400).send({ message: "Email is already registered." });
    }
    res.status(500).send({ message: "Internal server error." });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {
    const user = await userModel.findOne({ email }).exec();
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password." });
    }

    const isPasswordValid = await verifyHash(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid email or password." });
    }

    // Login successful (you can send a JWT token here or any other login response)
    res.status(200).send({ message: "Login successful." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().exec();
    res.status(200).send(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};
