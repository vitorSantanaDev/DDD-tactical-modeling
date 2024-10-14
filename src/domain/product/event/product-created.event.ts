import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOccured: string;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccured = new Date().toISOString();
    this.eventData = eventData;
  }
}
