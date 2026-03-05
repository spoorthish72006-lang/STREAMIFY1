import cors from 'cors';

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
};

export const corsMiddleware = cors(corsOptions);
