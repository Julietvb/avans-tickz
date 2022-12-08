import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop()
  name: string;
  @Prop()
  birthDate: Date;
  @Prop()
  genre: string;
  @Prop()
  description: string;
  @Prop()
  creatorId: Types.ObjectId
}

export const ArtistSchema = SchemaFactory.createForClass(Artist)