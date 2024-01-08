import { Publisher, OrderCancelledEvent, Subjects } from "@rcnp-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
