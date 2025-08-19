import amqp from 'amqplib';
import { logger } from '../utils/logger';

export class QueueService {
  private url: string;
  private queue: string;

  constructor(url: string, queue: string) {
    this.url = url;
    this.queue = queue;
  }

  public async watchQueue(onMessage: (msg: string) => void) {
    try {
      const connection = await amqp.connect(this.url);
      const channel = await connection.createChannel();
      await channel.assertQueue(this.queue, { durable: true });
      logger.info(`[*] Waiting for messages in ${this.queue}. To exit press CTRL+C`);

      channel.consume(
        this.queue,
        (msg) => {
          if (msg !== null) {
            const content = msg.content.toString();
            logger.info(`[x] Received: ${content}`);
            onMessage(content);
            channel.ack(msg);
          }
        },
        { noAck: false }
      );
    } catch (err: any) {
      logger.error('RabbitMQ connection error', { error: err.message, stack: err.stack });
      setTimeout(() => this.watchQueue(onMessage), 5000); // Retry after 5 seconds
    }
  }
}
