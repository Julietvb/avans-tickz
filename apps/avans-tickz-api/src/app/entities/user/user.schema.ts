import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Types} from 'mongoose';
import { Document } from 'mongoose';
import { Artist } from '../artist/artist.schema';
import { Ticket } from '../ticket/ticket.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
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

  @Prop()
  favoriteArtists: Artist[];

  @Prop([Ticket])
  myTickets: Ticket[];
}

export const UserSchema = SchemaFactory.createForClass(User)
