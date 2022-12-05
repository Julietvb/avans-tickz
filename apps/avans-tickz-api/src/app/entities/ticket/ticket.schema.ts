import { Prop, Schema } from "@nestjs/mongoose";
import {Types} from "mongoose";
import { Concert } from "../concert/concert.schema";

@Schema()
export class Ticket{
    @Prop()
    _id: Types.ObjectId;
    @Prop()
    price: number;
    @Prop()
    type: string;
    @Prop()
    concert: Concert;
}