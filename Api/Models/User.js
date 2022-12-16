import mongoose from "mongoose";
const { Schema } = mongoose;

const UserModule = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true
  },
  Class: {
    type: String,
    required: true,
  },
});
export default mongoose.model("User", UserModule);
