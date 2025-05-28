import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, min: 17, max: 65, default: 18 },
  isMarried: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
