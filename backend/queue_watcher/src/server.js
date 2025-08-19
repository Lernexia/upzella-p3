"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var helmet_1 = require("helmet");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var health_routes_1 = require("./routes/health.routes");
var errorHandler_1 = require("./middleware/errorHandler");
var logger_1 = require("./utils/logger");
var queue_service_1 = require("./services/queue.service");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
var app = (0, express_1.default)();
var PORT = process.env.WATCHER_PORT ? parseInt(process.env.WATCHER_PORT, 10) : (process.env.PORT ? parseInt(process.env.PORT, 10) : 4000);
var RABBITMQ_URL = process.env.RABBITMQ_URL || '';
var QUEUE_NAME = process.env.QUEUE_NAME || '';
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: '*', credentials: true }));
app.use(express_1.default.json({ limit: '2mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '2mb' }));
app.use('/', health_routes_1.default);
app.use(errorHandler_1.errorHandler);
if (!RABBITMQ_URL || !QUEUE_NAME) {
    logger_1.logger.error('RABBITMQ_URL and QUEUE_NAME must be set in environment variables.');
    process.exit(1);
}
var queueService = new queue_service_1.QueueService(RABBITMQ_URL, QUEUE_NAME);
queueService.watchQueue(function (msg) {
    // You can add file fetch/processing logic here
    logger_1.logger.info("Processed message: ".concat(msg));
});
app.listen(PORT, function () {
    logger_1.logger.info("Queue watcher Express app listening on port ".concat(PORT));
});
