import User from "../Models/User.js";
import Event from "../Models/Event.js"
import mongoose from "mongoose";
export const getUsers = async (req, res, next) => {
  try {
    const listUser = await User.find();
    res.status(200).json(listUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const UserUpadted = await User.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(UserUpadted);
  } catch (error) {
    next(error);
  }
};
export const addUsers = async (req, res, next) => {
  const UserData = new User(req.body);
  try {
    const newUser = await UserData.save();
    res.status(200).json(newUser._id);
  } catch (error) {
    next(error);
  }
};
/* export const deleteUser=async(req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User is Deleted Succefuly ");
  } catch (error) {
    next(error)
  }
} */
export const deleteUser = async (req, res, next) => {
  const EventID = req.params.EventId;
  try {
    await User.findByIdAndDelete(req.params.id);
    try {
      await Event.findByIdAndUpdate(EventID, {
        $pull: { users: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("users has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getUserById=async(req,res,next)=>{
  try {
    const OneUser=await User.findById(req.params.id);
    res.status(200).json(OneUser);
  } catch (error) {
    next(error);
  }
}
export const CreateEventWithUserId=async(req,res,next)=>{
  const {EventId,id}= req.params;
  console.log(id);
    try {
      await Event.findByIdAndUpdate(EventId, {
        $push: {
          users:id
        }
      });
      res.status(200).json("Okdoki");
    } catch (error) {
      next(error);
    }
}

export const UserCount = async (req, res, next) => {
  try {
    const nbUsers = await User.countDocuments();
    res.status(200).json(nbUsers);
  } catch (error) {
    next(error);
  }
};
