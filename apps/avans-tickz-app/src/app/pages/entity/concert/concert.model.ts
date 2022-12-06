import { Ticket } from "../ticket/ticket.model";

export interface Concert{
    title: string;
    date: Date;
    time: string;
    amountOfTickets: Number;
    performances: Map<string, string>;
    tickets: Ticket[];
    venueId: string;
}