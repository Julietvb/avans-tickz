import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: Date;

  @Prop()
  emailAdres: string;

  @Prop()
  password: string;

  @Prop([String])
  favoriteArtists: string[];
}

export const UserSchema = SchemaFactory.createForClass(User)
