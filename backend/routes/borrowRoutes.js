import express from "express";
import { getBorrowingHistory, getOverdueNotifications } from "../controllers/borrowController.js";

const router = express.Router();

// Fetch borrowing history
router.get("/history/:userId", getBorrowingHistory);

// Fetch overdue notifications
router.get("/notifications/:userId", getOverdueNotifications);

export default router;
