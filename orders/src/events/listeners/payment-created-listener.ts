import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from "@rcnp-tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();
    // technically speaking we would have had to emit an order update event
    // so the order version gets updated in every service. However, we are not
    // doing that for a matter of simplicity, backed up on the fact that after
    // an order is complete, it will not be touched again.

    msg.ack();
  }
}
