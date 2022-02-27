import gravatar from "gravatar";
import { User } from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" }),
    });
    res.status(201).json({ user });
  } catch (err) {
    const errors = handleValidationError(err);
    res.status(400).json({ errors });
  }
};

export const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then(returnJson(res))
    .catch(send500Status(res));
};

const returnJson = (res) => (user) => res.json({ user });

const handleValidationError = (err) => {
  console.log(err.message, err.code);
  let errors = {};

  // Duplicate email error code
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }
  // Validation errors
  if (err._message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties;
    });
  }
  return errors;
};
const send400Response = (res, error) => {
  res.status(400).json({ error });
};
const send500Status = (res) => (err) => {
  console.error(err);
  res.status(500).send(err);
};
