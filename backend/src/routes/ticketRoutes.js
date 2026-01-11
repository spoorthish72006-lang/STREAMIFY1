import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createTicket,
  assignTicket,
  getAllTickets,
  filterTickets,
  deleteTicket
} from "../controller/ticketController.js";

const router = express.Router();

router.post("/", auth, createTicket);
router.post("/assign", auth, assignTicket);
router.get("/", auth, getAllTickets);
router.get("/search", auth, filterTickets);
router.delete("/:id", auth, deleteTicket);

export default router;
