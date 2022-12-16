import mongoose from "mongoose";
const { Schema } = mongoose;

const AdminModule = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("Admin", AdminModule);
