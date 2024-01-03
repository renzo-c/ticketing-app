import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const client = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

console.clear();
client.on("connect", () => {
  console.log("Listener connected to NATS");

  client.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });
  // Set up specific options to change the subscription default behaviour
  // setManualAckMode will let us handle the msg ack manually
  const options = client.subscriptionOptions().setManualAckMode(true);
  const subscription = client.subscribe(
    "ticket:created",
    // creating queue group to ensure that multiple instances of the same service
    // are not going to receive the same event
    "orders-service-queue-group",
    options
  );
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    // it's going to tell the node-nats-streaming library to reach back out
    // to the nat-streaming server an tell it that we received the message
    // and has been processed
    msg.ack();
  });
});

// watcher for interrupt and terminate signals (do not kill this process just yet, let us close our connections)
// sigint and sigterm occurs each time ts tries to restart our program or any time you hit ctrl-c
// needed for graceful restart but signal types not supporterd on Windows
process.on("SIGINT", () => client.close());
process.on("SIGTERM", () => client.close());
