import User from "../models/User.js";

export const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" }).select("-password");
    res.json(agents);
  } catch (error) {
    console.error("Error in getAgents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
