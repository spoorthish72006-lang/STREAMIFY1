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

/* Get Assigned Tickets */
export const getAssignedTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ assignedTo: req.user._id })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assigned tickets", error: error.message });
  }
};

/* Resolve Ticket */
export const resolveTicket = async (req, res) => {
  const { id } = req.params;
  const { satisfactionScore } = req.body;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // Calculate resolution time in minutes
    const resolutionTime = Math.floor((Date.now() - new Date(ticket.createdAt).getTime()) / 60000);

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { 
        status: "resolved", 
        satisfactionScore, 
        resolutionTime 
      },
      { new: true }
    );

    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: "Error resolving ticket", error: error.message });
  }
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
