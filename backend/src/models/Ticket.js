import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["open", "in_progress", "closed"],
    default: "open"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
