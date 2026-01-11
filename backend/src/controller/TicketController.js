import Ticket from "../models/Ticket.js";

/* Create Ticket */
export const createTicket = async (req, res) => {
  const ticket = await Ticket.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.status(201).json(ticket);
};

/* Assign Task */
export const assignTicket = async (req, res) => {
  const { ticketId, agentId } = req.body;

  const ticket = await Ticket.findByIdAndUpdate(
    ticketId,
    { assignedTo: agentId, status: "in_progress" },
    { new: true }
  );

  res.json(ticket);
};

/* Show All Tickets */
export const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find()
    .populate("assignedTo", "name email")
    .populate("createdBy", "name");

  res.json(tickets);
};

/* Filter & Search Tickets */
export const filterTickets = async (req, res) => {
  const { status, priority, search } = req.query;

  const query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) query.title = { $regex: search, $options: "i" };

  const tickets = await Ticket.find(query);
  res.json(tickets);
};

/* Delete Ticket */
export const deleteTicket = async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ message: "Ticket deleted" });
};
