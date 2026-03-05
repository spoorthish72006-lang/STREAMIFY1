// src/server.js
import express6 from "express";
import "dotenv/config";

// src/routes/auth.route.js
import express from "express";

// src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "agent"],
    default: "agent"
  },
  bio: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  },
  nativeLanguage: {
    type: String,
    default: ""
  },
  learningLanguage: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  isOnboareded: {
    type: Boolean,
    default: false
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, {
  timestamps: true
});
var User = mongoose.model("User", userSchema);
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
var User_default = User;

// src/controller/auth.controller.js
import jwt from "jsonwebtoken";
import bcrypt2 from "bcryptjs";
async function signup(req, res) {
  const { email, password, fullName, role } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const exisitingUser = await User_default.findOne({ email });
    if (exisitingUser) {
      return res.status(400).json({ message: "Emails already exists,please use a different one" });
    }
    const salt = await bcrypt2.genSalt(10);
    const hashedPassword = await bcrypt2.hash(password, salt);
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/boy/${idx}.png`;
    const newUser = await User_default.create(
      {
        email,
        password: hashedPassword,
        fullName,
        role: role || "agent",
        profilePic: randomAvatar
      }
    );
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1e3,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });
    res.status(201).json({ sucess: true, newUser: {
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      profilePic: newUser.profilePic
    } });
  } catch (error) {
    console.error("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User_default.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt2.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d"
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1e3,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
function checkAuth(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// src/middleware/auth.middleware.js
import jwt2 from "jsonwebtoken";
var protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt2.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user = await User_default.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
var auth_middleware_default = protectRoute;

// src/routes/auth.route.js
var router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", auth_middleware_default, checkAuth);
var auth_route_default = router;

// src/routes/agent.route.js
import express2 from "express";

// src/controller/agent.controller.js
var getAgents = async (req, res) => {
  try {
    const agents = await User_default.find({ role: "agent" }).select("-password");
    res.json(agents);
  } catch (error) {
    console.error("Error in getAgents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// src/routes/agent.route.js
var router2 = express2.Router();
router2.get("/", auth_middleware_default, getAgents);
var agent_route_default = router2;

// src/routes/metric.route.js
import express3 from "express";

// src/models/Ticket.js
import mongoose2 from "mongoose";
var ticketSchema = new mongoose2.Schema({
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
  assignedTo: { type: mongoose2.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose2.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
var Ticket_default = mongoose2.model("Ticket", ticketSchema);

// src/controller/metric.controller.js
var getMetrics = async (req, res) => {
  const total = await Ticket_default.countDocuments();
  const open = await Ticket_default.countDocuments({ status: "open" });
  const closed = await Ticket_default.countDocuments({ status: "closed" });
  res.json({ total, open, closed });
};

// src/routes/metric.route.js
var router3 = express3.Router();
router3.get("/", auth_middleware_default, getMetrics);
var metric_route_default = router3;

// src/routes/setting.route.js
import express4 from "express";

// src/models/settings.js
import mongoose3 from "mongoose";
var settingsSchema = new mongoose3.Schema({
  userId: mongoose3.Schema.Types.ObjectId,
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
var settings_default = mongoose3.model("Settings", settingsSchema);

// src/controller/settings.controller.js
var updateSettings = async (req, res) => {
  const settings = await settings_default.findOneAndUpdate(
    { userId: req.user.id },
    req.body,
    { upsert: true, new: true }
  );
  res.json(settings);
};
var getSettings = async (req, res) => {
  const settings = await settings_default.findOne({ userId: req.user.id });
  res.json(settings);
};

// src/routes/setting.route.js
var router4 = express4.Router();
router4.get("/", auth_middleware_default, getSettings);
router4.put("/", auth_middleware_default, updateSettings);
var setting_route_default = router4;

// src/routes/ticket.route.js
import express5 from "express";

// src/controller/ticket.controller.js
var createTicket = async (req, res) => {
  const ticket = await Ticket_default.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.status(201).json(ticket);
};
var assignTicket = async (req, res) => {
  const { ticketId, agentId } = req.body;
  const ticket = await Ticket_default.findByIdAndUpdate(
    ticketId,
    { assignedTo: agentId, status: "in_progress" },
    { new: true }
  );
  res.json(ticket);
};
var getAssignedTickets = async (req, res) => {
  try {
    const tickets = await Ticket_default.find({ assignedTo: req.user._id }).populate("assignedTo", "name email").populate("createdBy", "name");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assigned tickets", error: error.message });
  }
};
var resolveTicket = async (req, res) => {
  const { id } = req.params;
  const { satisfactionScore } = req.body;
  try {
    const ticket = await Ticket_default.findById(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    const resolutionTime = Math.floor((Date.now() - new Date(ticket.createdAt).getTime()) / 6e4);
    const updatedTicket = await Ticket_default.findByIdAndUpdate(
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
var getAllTickets = async (req, res) => {
  const tickets = await Ticket_default.find().populate("assignedTo", "name email").populate("createdBy", "name");
  res.json(tickets);
};
var filterTickets = async (req, res) => {
  const { status, priority, search } = req.query;
  const query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) query.title = { $regex: search, $options: "i" };
  const tickets = await Ticket_default.find(query);
  res.json(tickets);
};
var deleteTicket = async (req, res) => {
  await Ticket_default.findByIdAndDelete(req.params.id);
  res.json({ message: "Ticket deleted" });
};

// src/routes/ticket.route.js
var router5 = express5.Router();
router5.post("/", auth_middleware_default, createTicket);
router5.post("/assign", auth_middleware_default, assignTicket);
router5.get("/assigned", auth_middleware_default, getAssignedTickets);
router5.put("/:id/resolve", auth_middleware_default, resolveTicket);
router5.get("/", auth_middleware_default, getAllTickets);
router5.get("/search", auth_middleware_default, filterTickets);
router5.delete("/:id", auth_middleware_default, deleteTicket);
var ticket_route_default = router5;

// src/lib/db.js
import mongoose4 from "mongoose";
var connectDB = async () => {
  try {
    const conn = await mongoose4.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// src/server.js
import cookieParser from "cookie-parser";

// src/lib/cors.js
import cors from "cors";
var corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
};
var corsMiddleware = cors(corsOptions);

// src/server.js
var app = express6();
var PORT = process.env.PORT || 5001;
app.use(corsMiddleware);
app.use(express6.json());
app.use(cookieParser());
app.use("/api/auth", auth_route_default);
app.use("/api/agents", agent_route_default);
app.use("/api/metrics", metric_route_default);
app.use("/api/settings", setting_route_default);
app.use("/api/tickets", ticket_route_default);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
//# sourceMappingURL=server.js.map