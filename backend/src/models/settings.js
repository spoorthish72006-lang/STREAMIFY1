import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,

  notifications: {
    email: Boolean,
    sms: Boolean,
    push: Boolean
  },

  contact: {
    email: String,
    phone: String
  },

  businessHours: {
    start: String,
    end: String,
    timezone: String
  },

  security: {
    twoFactorAuth: Boolean
  }
});

export default mongoose.model("Settings", settingsSchema);
