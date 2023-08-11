import nats from "node-nats-streaming";

const client = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});
console.clear();
client.on("connect", () => {
  console.log("Publisher connected to NATS");
  const data = JSON.stringify({
    id: 123,
    title: "title 1",
    price: 12,
  });

  client.publish("ticket:created", data, () => {
    console.log("Event Published");
  }); // 1st arg, the subject (channel we want to publish information to)
});
