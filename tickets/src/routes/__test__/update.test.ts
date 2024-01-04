import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";

const updatedTicket = {
  title: "updated ticket",
  price: 12,
};

it("it returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send(updatedTicket);
  expect(response.status).toEqual(404);
});

it("it returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .put(`/api/tickets/${id}`)
    .send(updatedTicket);
  expect(response.status).toEqual(401);
});

it("it returns a 401 if the user does not own the ticket", async () => {
  const responseCreate = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "new ticket", price: 14 });

  const id = responseCreate.body.id;
  const responseUpdate = await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send(updatedTicket);

  expect(responseUpdate.status).toEqual(401);
});

it("it returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();
  const responseCreate = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "new ticket", price: 14 });

  const id = responseCreate.body.id;

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send({ title: "" })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send({ price: -9 })
    .expect(400);
});

it("it updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();
  const responseCreate = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "new ticket", price: 14 });

  const id = responseCreate.body.id;

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send(updatedTicket)
    .expect(200);

  const response = await request(app).get(`/api/tickets/${id}`).send();
  expect(response.body.title).toEqual(updatedTicket.title);
  expect(response.body.price).toEqual(updatedTicket.price);
});

it("publishes an event", async () => {
  const cookie = global.signin();
  const responseCreate = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "new ticket", price: 14 });

  const id = responseCreate.body.id;

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send(updatedTicket)
    .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled
})