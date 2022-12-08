import { Venue } from '../venue/venue.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Artist } from '../artist/artist.schema';
import { Ticket } from '../ticket/ticket.schema';
import { Type } from '@nestjs/common';

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert {
  @Prop()
  title: string;
  @Prop()
  date: Date;
  @Prop()
  time: string;
  @Prop()
  amountOfTickets: Number;
  @Prop({ type: Types.ObjectId, ref: 'Artist' })
  artist!: Artist;
  @Prop([Ticket])
  tickets: Ticket[];
  @Prop({ type: Types.ObjectId, ref: 'Venue' })
  venue!: Venue;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
