import { Module } from '@nestjs/common';
import { AssetModule } from './asset/asset.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AssetModule,
    PrismaModule,
  ],
})
export class AppModule {}
