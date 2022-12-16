import mongoose from "mongoose";
const { Schema } = mongoose;
var ObjectId = Schema.Types.ObjectId;
const EventModule = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    place:{
    type:String,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    MaxPer: {
      type: Number,
      required: true,
    },
    DayStart: {
      type: String,
    },
    DayEnd: {
      type: String,
    },
    users:{
      type:[String]
    }
  },
  { timestamp: true }
);

export default mongoose.model("Event", EventModule);
