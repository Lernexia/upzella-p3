import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { jobRoutes } from './routes/jobs.routes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Upzella Job Creation API',
      version: '1.0.0',
      description: 'API documentation for Upzella job creation and related services',
    },
    servers: [
      {
        url: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 3001}`,
        description: 'Local Dev Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format **Bearer <token>**'
        }
      }
    }
  },
  apis: [
    './src/routes/*.ts',
    './dist/routes/*.js',
    './src/server.ts', // include self so /health doc is loaded
  ]
};

const specs = swaggerJSDoc(options);


const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use('/api',limiter);

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the API's current status, timestamp, and environment. Public, no authentication required.
 *     tags:
 *       - Public
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-08-10T12:34:56.000Z
 *                 environment:
 *                   type: string
 *                   example: development
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/jobs', jobRoutes);

// 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Error handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
    logger.info(`📄 Swagger docs: http://localhost:${PORT}/api-docs`);
    logger.info(`💓 Health check: http://localhost:${PORT}/health`);
  });
}

export default app;
