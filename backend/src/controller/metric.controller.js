import Ticket from "../models/Ticket.js";

export const getMetrics = async (req, res) => {
  const total = await Ticket.countDocuments();
  const open = await Ticket.countDocuments({ status: "open" });
  const closed = await Ticket.countDocuments({ status: "closed" });

  res.json({ total, open, closed });
};
