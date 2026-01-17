import User from "../models/User.js";

export const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" }).select("-password");
    res.status(200).json(agents);
  } catch (error) {
    console.error("Error in getAgents: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
