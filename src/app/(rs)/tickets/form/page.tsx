import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import * as Sentry from "@sentry/nextjs"
import TicketForm from "./TicketForm";

export default async function TicketFormPage({
  searchParams,

}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { customerId, ticketId } = await searchParams

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2 text-white">
            Ticket id or Cusomter Id required to load ticket form
          </h2>
          <BackButton
            title="Go Back"
            variant={"default"}
          />
        </>
      )
    }
    //New Ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId))
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer Id: #{customerId} not found
            </h2>
            <BackButton
              title="Go Back"
              variant={"default"}
            />
          </>
        )
      }
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer Id: #{customerId} is Not Active
            </h2>
            <BackButton
              title="Go Back"
              variant={"default"}
            />
          </>
        )
      }
      console.log(customer)
      //return ticket form
      return <TicketForm customer={customer} />
    }
    //Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId))

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Ticket Id: #{ticketId} not found
            </h2>
            <BackButton
              title="Go Back"
              variant={"default"}
            />
          </>
        )
      }
      const customer = await getCustomer(ticket.customerId)
      //return ticket form
      return <TicketForm customer={customer} ticket={ticket} />
      console.log("ticket: ", ticket)
      console.log("customer: ", customer)
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e)
      throw e
    }
  }
}
