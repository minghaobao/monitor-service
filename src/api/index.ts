import { config } from 'dotenv';
import { app } from './server.js';
import pino from 'pino';

// 加载环境变量
config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const PORT = process.env.API_PORT || 3001;

app.listen(PORT, () => {
  logger.info(`🚀 Monitor API server started on port ${PORT}`);
  logger.info(`📊 Health check: http://localhost:${PORT}/health`);
  logger.info(`📋 API docs: http://localhost:${PORT}/api`);
});
