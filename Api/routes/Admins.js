import express from "express";
import {
  AddNormalEvent,
  DeleteEvent,
  updateEvent,
  getAllAdmin,
  DeleteAdmin
} from "../Controllers/Admin.js";
const router = express.Router();

router.post("/addEvent", AddNormalEvent);
router.delete("/DeleteEvent/:id", DeleteEvent);
router.put("/updateEvent/:id", updateEvent);
router.get("/getAdmins", getAllAdmin);
router.delete("/DeleteAdmin/:id",DeleteAdmin)

export default router;
