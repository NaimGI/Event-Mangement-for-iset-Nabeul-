import express from "express";
import { getallEvent, EventCount, LatsEvent,getEventById,ListUserEvent } from "../Controllers/Event.js";
const router = express.Router();

router.get("/Events", getallEvent);
router.get("/EventUser/:id",ListUserEvent)
router.get("/EventsNumber", EventCount);
router.get("/latsEvent", LatsEvent);
router.get("/OneEvent/:id",getEventById);
export default router;
