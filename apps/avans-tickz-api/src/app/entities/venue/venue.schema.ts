import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Venue {
  @Prop()
  _id: Types.ObjectId;
  @Prop()
  venueName: string;
  @Prop()
  venueImage: string;
  @Prop()
  adres: string;
  @Prop()
  city: string;
}
