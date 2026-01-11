import express from "express";
import ticketRoutes from "./routes/ticketRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/tickets", ticketRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/settings", settingsRoutes);

export default app;
