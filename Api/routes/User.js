import express from "express";
import { getUsers, addUsers, UserCount,CreateEventWithUserId ,deleteUser,getUserById,updateUser} from "../Controllers/User.js";
const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/addUser", addUsers);
router.put("/New/:EventId/:id",CreateEventWithUserId);
router.get("/UsersNumber", UserCount);
router.get("/:id",getUserById);
router.put("/update/:id",updateUser)
router.delete("/RemoveUser/:id/:EventId",deleteUser)

export default router;
