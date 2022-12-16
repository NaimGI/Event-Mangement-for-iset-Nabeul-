import express from "express";
const router = express.Router();
import { Register, Login,logout } from "../Controllers/auth.js";
// Register a new Admin
router.post("/Register", Register);
// Check if that a true admin
router.post("/login",Login);
router.get("/logout",logout);

export default router;
