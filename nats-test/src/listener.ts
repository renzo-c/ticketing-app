import nats, { Message } from "node-nats-streaming";

const client = nats.connect("ticketing", "123", {
  url: "http://localhost:4222",
});

console.clear();
client.on("connect", () => {
  console.log("Listener connected to NATS");
  const subscription = client.subscribe("ticket:created");
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(
        `Received event #${msg.getSequence()}, with data: ${data}`
      );
    }
  });
});
