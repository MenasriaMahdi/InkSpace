import app from './app';
import { config } from './config/env';
import prisma from './utils/prisma';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log('🚀 ════════════════════════════════════════');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🚀 Environment: ${config.nodeEnv}`);
  console.log('🚀 ════════════════════════════════════════');
});

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\n🛑 Shutting down gracefully...');
  
  server.close(async () => {
    await prisma.$disconnect();
    console.log('✅ Database disconnected');
    console.log('✅ Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
