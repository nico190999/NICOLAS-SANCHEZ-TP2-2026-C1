import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar TODAS las validaciones de nuestra appp.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/* 

Una vez creados los resource, realizar el dto y entities. Luego autenticacion.service y autenticacion.module

*/
