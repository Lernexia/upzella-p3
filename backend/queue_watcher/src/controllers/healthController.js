"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthController = void 0;
var healthController = function (req, res) {
    res.json({
        status: 'ok',
        service: 'queue-watcher',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
};
exports.healthController = healthController;
