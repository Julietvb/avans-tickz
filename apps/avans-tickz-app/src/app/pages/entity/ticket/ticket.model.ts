import { Types } from "mongoose";
import { Concert } from "../concert/concert.model";

export interface Ticket {
  _id: Types.ObjectId;
  price: Number;
  type: string;
  concertName: string;
  concert: Concert;
}
