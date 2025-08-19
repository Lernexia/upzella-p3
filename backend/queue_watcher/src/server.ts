import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import healthRoutes from './routes/health.routes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import { QueueService } from './services/queue.service';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.WATCHER_PORT ? parseInt(process.env.WATCHER_PORT, 10) : (process.env.PORT ? parseInt(process.env.PORT, 10) : 4000);
const RABBITMQ_URL = process.env.RABBITMQ_URL || '';
const QUEUE_NAME = process.env.QUEUE_NAME || '';

app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

app.use('/', healthRoutes);

app.use(errorHandler);

if (!RABBITMQ_URL || !QUEUE_NAME) {
  logger.error('RABBITMQ_URL and QUEUE_NAME must be set in environment variables.');
  process.exit(1);
}

const queueService = new QueueService(RABBITMQ_URL, QUEUE_NAME);
queueService.watchQueue((msg) => {
  // You can add file fetch/processing logic here
  logger.info(`Processed message: ${msg}`);
});

app.listen(PORT, () => {
  logger.info(`Queue watcher Express app listening on port ${PORT}`);
});
