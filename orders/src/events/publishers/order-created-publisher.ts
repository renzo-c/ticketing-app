import { Publisher, OrderCreatedEvent, Subjects } from "@rcnp-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
}
