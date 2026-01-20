// --------------- THIS TEST IS TEMPORARILY COMMENTED OUT AND WILL BE FINISHED AFTER https://github.com/nestjs/nest/issues/16051 IS RESOLVED OR A WORKING WORKAROUND FOR THIS APP IS FOUND --------------------

// import { Test, TestingModule } from '@nestjs/testing';
// import {
//   ClassSerializerInterceptor,
//   INestApplication,
//   ValidationPipe,
// } from '@nestjs/common';
// import request from 'supertest';
// import { AppModule } from './../src/app.module';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { Reflector } from '@nestjs/core';
// import { GlobalExceptionFilter } from 'src/common/filters/global-exception.filter';
// import { AssetType } from 'src/asset/enums/asset-type.enum';
// import { AssetResponseDto } from 'src/asset/dto/response/asset-response.dto';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;
//   let prisma: PrismaService;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     app.useGlobalInterceptors(
//       new ClassSerializerInterceptor(app.get(Reflector)),
//     );
//     app.useGlobalFilters(new GlobalExceptionFilter());
//     app.useGlobalPipes(
//       new ValidationPipe({
//         whitelist: true,
//         forbidNonWhitelisted: true,
//         transform: true,
//       }),
//     );
//     await app.init();
//     prisma = app.get(PrismaService);
//   });

//   afterEach(async () => {
//     await prisma.asset.deleteMany();
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('/assets (POST) should successfully create an asset', async () => {
//     const response = await request(app.getHttpServer())
//       .post('/assets')
//       .send({ code: 'P01B', assetType: AssetType.PARKING })
//       .expect(201);

//     const responseBody = response.body as AssetResponseDto;

//     expect(responseBody.assetType).toBe(AssetType.PARKING);
//   });
// });
