import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserService } from './common/user/user.service';
import { ProductService } from './common/product/product.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = config.get('port');
  const VERSION = config.get('swagger.version');
  const TITLE = config.get('swagger.title');
  const swaggerOptions = new DocumentBuilder()
    .setTitle(TITLE)
    .setVersion(VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, document);

  // add fake users
  const userService = app.get(UserService);
  await userService.addFakeUsers();

  // add fake products
  const productService = app.get(ProductService);
  await productService.addFakeProducts();

  await app.listen(PORT);
  console.log(`App is listening on port ${PORT}`);
}
bootstrap();
