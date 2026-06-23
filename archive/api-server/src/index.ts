import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
// We import our shared core logic (Appwrite clients) here once configured
// import { createAdminClient } from '@soulfest/core-logic';

dotenv.config({ path: '../../.env.local' });

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
if (!process.env.ALLOWED_ORIGINS) {
    throw new Error("FATAL: ALLOWED_ORIGINS is not defined in the environment variables.");
}

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ 
        status: 'UP', 
        message: 'Soulfest API Server is running robustly!',
        timestamp: new Date().toISOString()
    });
});

// Mock Ticketing Route (Phase 4 groundwork)
app.post('/api/tickets/purchase', (req: Request, res: Response) => {
    // Expected body: { tierId, quantity, customerInfo }
    const { tierId, quantity } = req.body;
    
    // In the future, this will connect to Appwrite and Stripe/Bank Slip logic
    res.json({
        success: true,
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        message: `Successfully mocked purchase of ${quantity} ticket(s) for tier ${tierId}.`
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Soulfest API Server is actively listening on http://localhost:${PORT}`);
});
