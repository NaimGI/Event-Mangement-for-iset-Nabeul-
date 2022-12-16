import mongoose from "mongoose";
import Admin from "../Models/Admin.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createError } from "../Errors/ErrorsHandel.js";

export const Register = async (req, res, next) => {
  try {
    const {password,username}=req.body;
    const userISfound =await Admin.findOne({...req.body.username});
    if(userISfound){
      res.status(200).json("User is Already Found !");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const NewAdmin = new Admin({
      username: req.body.username,
      password: hash,
      isAdmin: req.body.isAdmin,
    });
    await NewAdmin.save();
    res.status(200).json("The new Admin is Regitred !");
  } catch (error) {
    next(error);
  }
};
export const logout =(req,res,next)=>{
  try{
      return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  }catch(err){
      next(err);
  }
}
export const Login = async (req, res, next) => {
  try {
    const AdminName = await Admin.findOne({ ...req.body.username });
    if (!AdminName) {
      return next(createError(404, "This Admin is not found "));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      AdminName.password
    );
    if (!isPasswordCorrect) {
      return next(createError(404, "password incorrect !"));
    }
    console.log(AdminName);
    const { password, isAdmin, ...otherDetail } = AdminName._doc;
    const jwtToken = Jwt.sign(
      { id: AdminName._id, isAdmin: AdminName.isAdmin },
      "AdminToken"
    );
    res
      .cookie("access_token", jwtToken, { httpOnly: true })
      .status(200)
      .json({ detail: { ...otherDetail, password }, isAdmin, jwtToken });
  } catch (error) {
    next(error);
  }
};
