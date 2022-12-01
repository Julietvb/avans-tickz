import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Concert{
    @Prop()
    concertId: Number;
    @Prop()
    title: string;
    @Prop()
    venueName: string;
    @Prop()
    venueImage: string;
    @Prop()
    date: Date;
    @Prop()
    time: string;
    @Prop()
    adres: string;
    @Prop()
    city: string;
    @Prop()
    amountOfTickets: Number;
}