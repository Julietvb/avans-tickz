import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type VenueDocument = Venue & Document;

@Schema()
export class Venue {
  @Prop()
  venueName: string;
  @Prop()
  venueImage: string;
  @Prop()
  adres: string;
  @Prop()
  city: string;
  @Prop()
  capacity: Number;
}

export const VenueSchema = SchemaFactory.createForClass(Venue)