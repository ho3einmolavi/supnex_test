import { Module } from '@nestjs/common';
import * as config from 'config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from '../common/user/user.module';
import { ProductModule } from '../common/product/product.module';
import { V1ApiModule } from '../api/v1/api-v1.module';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatter } from '../helpers/interceptors/formatter/formatter.interceptor';

@Module({
  imports: [
    UserModule,
    ProductModule,
    MongooseModule.forRootAsync({
      imports: [AppModule],
      useFactory: async () => ({
        uri: config.get('mongo.url'),
      }),
    }),
    V1ApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatter,
    },
  ],
})
export class AppModule {}
