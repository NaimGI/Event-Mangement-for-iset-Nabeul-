import Event from "../Models/Event.js";
import mongoose from "mongoose";
import Admin from "../Models/Admin.js";
export const AddNormalEvent = async (req, res, next) => {
  const EventData = new Event(req.body);
  try {
    const newEvent = await EventData.save();
    res.status(200).json(newEvent);
  } catch (error) {
    next(error);
  }
};
export const DeleteEvent = async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted");
  } catch (error) {
    next(error);
  }
};
export const updateEvent = async (req, res, next) => {
  try {
    const EventUpadted = await Event.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(EventUpadted);
  } catch (error) {
    next(error);
  }
};

export const getAllAdmin = async (req, res, next) => {
  try {
    const adminData = await Admin.find();
    res.status(200).json(adminData);
  } catch (error) {
    next(error);
  }
};
export const DeleteAdmin = async (req, res, next) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json("Admin has been deleted");
  } catch (error) {
    next(error);
  }
};
