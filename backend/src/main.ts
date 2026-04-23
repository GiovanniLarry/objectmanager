import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
  
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      frontendUrl,
      /\.vercel\.app$/, // Allow all Vercel previews
    ],
    credentials: true,
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // Bind to all interfaces for Render
  console.log(`Backend running on port ${port}`);
}
bootstrap();
