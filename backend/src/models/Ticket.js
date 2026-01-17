import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  customerName: String,
  customerId: String,
  channel: {
    type: String,
    enum: ["phone", "email", "chat", "in-person"],
    default: "phone"
  },
  category: {
    type: String,
    enum: ["account", "transaction", "loan", "card", "general"],
    default: "general"
  },
  status: {
    type: String,
    enum: ["open", "in_progress", "waiting", "resolved", "closed"],
    default: "open"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium"
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
