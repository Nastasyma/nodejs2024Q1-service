import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

const PORT = Number(process.env.PORT) || 4001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`App running on port ${PORT}`));
}
bootstrap();
