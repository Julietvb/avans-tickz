import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

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
}
