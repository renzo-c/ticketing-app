import express, { Request, Response } from "express";
import { NotFoundError } from "@rcnp-tickets/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
    console.log({ticket})
  if (!ticket) {
    throw new NotFoundError();
  }

  // the status will default to 200
  res.send(ticket);
});
export { router as showTicketRouter };
