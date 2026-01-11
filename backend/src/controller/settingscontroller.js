import Settings from "../models/settings.js";

export const updateSettings = async (req, res) => {
  const settings = await Settings.findOneAndUpdate(
    { userId: req.user.id },
    req.body,
    { upsert: true, new: true }
  );
  res.json(settings);
};

export const getSettings = async (req, res) => {
  const settings = await Settings.findOne({ userId: req.user.id });
  res.json(settings);
};
