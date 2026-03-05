import express from 'express';
import "dotenv/config";
import authRoutes from './routes/auth.route';
import agentRoutes from './routes/agent.route';
import metricsRoutes from './routes/metric.route';
import settingsRoutes from './routes/setting.route';
import ticketRoutes from './routes/ticket.route';
import { connectDB } from './lib/db';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './lib/cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/tickets", ticketRoutes);
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});