import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ObjectDocument = ObjectModel & Document;

@Schema({ timestamps: true })
export class ObjectModel {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ObjectSchema = SchemaFactory.createForClass(ObjectModel);
