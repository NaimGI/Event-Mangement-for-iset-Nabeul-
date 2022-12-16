import Event from "../Models/Event.js";
import User from "../Models/User.js"
import mongoose from "mongoose";
export const getallEvent = async (req, res, next) => {
  try {
    const AllEvent = await Event.find();
    res.status(200).json(AllEvent);
  } catch (error) {
    next(error);
  }
};
export const getEventById=async(req,res,next)=>{
  try {
    const OneEvent=await Event.findById(req.params.id);
    res.status(200).json(OneEvent);
  } catch (error) {
    next(error);
  }
}
// get List Of users in OneEvent
export const ListUserEvent=async(req,res,next)=>{
try {
  const GetEvent=await Event.findById(req.params.id);
  const UsersList=await Promise.all(
    GetEvent.users.map((user)=>{
  return User.findById(user);
    }),
  );
  const newObjetct={
    U:UsersList,
    E:GetEvent
  }
  res.status(200).json(UsersList);
} catch (error) {
  next(error);
}
}


export const EventCount = async (req, res, next) => {
  try {
    const nbEvent = await Event.countDocuments();
    res.status(200).json(nbEvent);
  } catch (error) {
    next(error);
  }
};
export const LatsEvent = async (req, res, next) => {
  try {
    const Lats = await Event.find().sort({ $natural: -1 }).limit(4); // 10 latest docs
    res.status(200).json(Lats);
  } catch (error) {
    next(error);
  }
};
