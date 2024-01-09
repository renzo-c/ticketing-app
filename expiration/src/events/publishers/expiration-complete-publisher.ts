import { Subjects, Publisher, ExpirationCompleteEvent } from "@rcnp-tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;

}