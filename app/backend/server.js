import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js';
import client from 'prom-client';

dotenv.config();

const app = express();

// ---------------- Prometheus metrics setup ----------------
const register = new client.Registry();

// Collect default Node.js & process metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Single /metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  } catch (err) {
    console.error('Error generating metrics:', err.message);
    res.status(500).end(err.message);
  }
});
// ----------------------------------------------------------

// CORS setup
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:8090';

app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.options('*', cors()); // enable preflight for all routes

app.use(express.json());

// API routes
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Listen for runtime Mongo errors
mongoose.connection.on('error', (err) => {
  console.log(`MongoDB runtime error: ${err.message}`);
});
