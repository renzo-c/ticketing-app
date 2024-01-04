import { Publisher, Subjects, TicketUpdatedEvent } from "@rcnp-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
