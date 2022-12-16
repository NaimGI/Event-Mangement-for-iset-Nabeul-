import express from "express";
import mongoose from "mongoose";
import AdminRoute from "./routes/Admins.js";
import EventRoute from "./routes/Event.js";
import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/User.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const connect = async () => {
  try {
    mongoose.connect(
      //"mongodb+srv://naim:123@cluster3.n6n5ruh.mongodb.net/gestion?retryWrites=true&w=majority"
      "mongodb+srv://naim:234@cluster0.gecowfn.mongodb.net/gestion?retryWrites=true&w=majority"
    );
    console.log("monog db connected");
  } catch (error) {
    console.log(error);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoBd disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDb connected");
});
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/admin", AdminRoute);
app.use("/api/Event", EventRoute);
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errormesssage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errormesssage,
    stack: err.stack,
  });
});
app.listen(4000, () => {
  console.log("Port is runing in 4000");
  connect();
});
