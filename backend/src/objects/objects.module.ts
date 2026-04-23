import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';
import { CloudinaryService } from './cloudinary.service';
import { ObjectsGateway } from './objects.gateway';
import { ObjectModel, ObjectSchema } from './schemas/object.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ObjectModel.name, schema: ObjectSchema }]),
  ],
  controllers: [ObjectsController],
  providers: [ObjectsService, CloudinaryService, ObjectsGateway],
})
export class ObjectsModule {}
