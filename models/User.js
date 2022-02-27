import { default as mongoose } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter a name"], trim: true },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      lowercase: true,
      unique: true,
      trim: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    avatar: { type: String },
    boards: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true }
);

//Hash password
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  } catch (err) {
    next(err);
  }
});
export const User = mongoose.model("user", userSchema);
