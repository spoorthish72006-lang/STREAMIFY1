import User from "../models/User.js";

export const getAgents = async (req, res) => {
  const agents = await User.find({ role: "agent" });
  res.json(agents);
};
