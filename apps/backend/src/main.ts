import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || jwtSecret === "change-me") {
    throw new Error("JWT_SECRET must be set to a secure value in .env (not the default 'change-me')");
  }

  const app = await NestFactory.create(AppModule);

  const corsOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:3000").split(",");
  app.enableCors({ origin: corsOrigins, credentials: true });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Starshield API")
    .setDescription("Backend API documentation for Starshield")
    .setVersion("0.1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Paste a JWT access token",
      },
      "bearer",
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, swaggerDocument);

  await app.listen(3003);
}

void bootstrap();
