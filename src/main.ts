import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
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
        whitelist: true,
        transform: true,
      })
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://online-school-85bedab87b9c.herokuapp.com"
    ]
  });
  const configService: ConfigService = app.get(ConfigService);
  const port = +configService.get<number>('PORT') || 3000;
  await app.listen(port);

  await app.listen(port, () => console.log(`Server started on port = ${port}`));
}
bootstrap();
