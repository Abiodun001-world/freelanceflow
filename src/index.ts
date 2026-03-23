import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';
import clientRoutes from './routes/client.routes';
import invoiceRoutes from './routes/invoice.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: {
    success: false,
    message: 'Too many requests, please try again after 15 minutes',
  },
});

app.use(limiter);

// Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    console.log(` [${req.method} ${req.originalUrl}] Response [${res.statusCode}]:`, JSON.stringify(body, null, 2));
    return originalJson(body);
  };
  next();
});

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);

// Health check
app.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'FreelanceFlow API is live' });
});

// 404 handler
app.use((_req: Request, res: Response, _next: NextFunction) => {
  console.error(` Route not found: ${_req.method} ${_req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});