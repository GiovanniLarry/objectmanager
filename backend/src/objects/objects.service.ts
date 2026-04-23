import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectModel, ObjectDocument } from './schemas/object.schema';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectModel(ObjectModel.name) private objectModel: Model<ObjectDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createObjectDto: any,
    file: Express.Multer.File,
  ): Promise<ObjectModel> {
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    const newObject = new this.objectModel({
      ...createObjectDto,
      imageUrl,
    });
    return newObject.save();
  }

  async findAll(): Promise<ObjectModel[]> {
    return this.objectModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<ObjectModel | null> {
    return this.objectModel.findById(id).exec();
  }

  async remove(id: string): Promise<ObjectModel | null> {
    const object = await this.objectModel.findById(id).exec();
    if (object && object.imageUrl) {
      await this.cloudinaryService.deleteImage(object.imageUrl);
    }
    return this.objectModel.findByIdAndDelete(id).exec();
  }
}
