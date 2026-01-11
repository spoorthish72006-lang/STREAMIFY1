import express from 'express';
import "dotenv/config";
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import agentRoutes from './routes/agentRoutes.js';
import metricsRoutes from './routes/metricsRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import { connectDB } from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/tickets", ticketRoutes);
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});