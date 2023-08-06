import request from "supertest";
import { app } from "../../app";
import mongoose, { mongo } from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app).get(`/api/tickets/${id}`).send();
  expect(response.status).toEqual(404);
});

it("returns the ticket if the ticket is found", async () => {
  const newTicket = {
    title: "Ticket for test",
    price: 35,
  };

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send(newTicket);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(newTicket.title);
  expect(ticketResponse.body.price).toEqual(newTicket.price);
});
