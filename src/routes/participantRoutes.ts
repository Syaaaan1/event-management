import { Router } from "express";
import { registerParticipant, getRegisteredEventsForUser } from "../controllers/participantController";
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post("/", authenticateToken, registerParticipant);
router.get("/user/:userId", getRegisteredEventsForUser);

export default router;