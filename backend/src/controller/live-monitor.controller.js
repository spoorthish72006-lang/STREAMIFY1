import Ticket from "../models/Ticket.js";

export const liveMonitor = async (req, res) => {
  const activeTickets = await Ticket.find({ status: "in_progress" });
  res.json(activeTickets);
};
