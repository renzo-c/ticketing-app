import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const client = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

console.clear();
client.on("connect", () => {
  console.log("Listener connected to NATS");
  const subscription = client.subscribe(
    "ticket:created",
    // creating queue group to ensure that multiple instances of the same service
    // are not going to receive the same event
    "orders-service-queue-group"
  );
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
  });
});
