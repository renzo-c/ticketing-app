import { Publisher, Subjects, TicketCreatedEvent } from "@rcnp-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
