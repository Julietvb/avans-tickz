import { Prop, Schema } from "@nestjs/mongoose";
import {Types} from "mongoose";

@Schema()
export class Concert{
    @Prop()
    _id: Types.ObjectId;
    @Prop()
    title: string;
    @Prop()
    date: Date;
    @Prop()
    time: string;
    @Prop()
    amountOfTickets: Number;
}