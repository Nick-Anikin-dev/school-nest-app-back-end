import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
      .setTitle("School Back-end")
      .setDescription("Rest API documentation")
      .setVersion("1.0.0")
      .addTag("API")
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
  );

  app.useStaticAssets(join(__dirname, '..', 'files'));

  app.enableCors({
    origin: [
      "http://localhost:3000"
    ]
  });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
