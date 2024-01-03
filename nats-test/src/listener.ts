import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

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

  new TicketCreatedListener(client).listen();
});

// watcher for interrupt and terminate signals (do not kill this process just yet, let us close our connections)
// sigint and sigterm occurs each time ts tries to restart our program or any time you hit ctrl-c
// needed for graceful restart but signal types not supporterd on Windows
process.on("SIGINT", () => client.close());
process.on("SIGTERM", () => client.close());
