import { Subjects, Publisher, PaymentCreatedEvent } from "@rcnp-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
