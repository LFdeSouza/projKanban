import gravatar from "gravatar";
import { User } from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" }),
    });

    const jwtToken = createToken(user._id);
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    const jwtToken = createToken(user._id);
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const logoutUser = (req, res) => {
  //remove jwt token
  res.cookie("jwt", "", { maxAge: 1 });
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.user });
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

const createToken = (user) => {
  return jsonwebtoken.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {};

  // Duplicate email error code
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }
  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties;
    });
  }

  //Incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "This email is not registered";
  }

  //Incorrect Password
  if (err.message === "Incorrect password") {
    errors.password = "Password does not match";
  }

  return errors;
};
