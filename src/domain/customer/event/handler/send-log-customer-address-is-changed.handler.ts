import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendLogWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(
      `Endereço do cliente: name=${event.eventData.customer.name} id=${event.eventData.customer.id}, 
			foi alterado para: ${event.eventData.address.city},  ${event.eventData.address.street}, ${event.eventData.address.zip}, 
			${event.eventData.address.number}`
    );
  }
}
