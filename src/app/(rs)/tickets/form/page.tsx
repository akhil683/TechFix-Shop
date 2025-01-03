import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import * as Sentry from "@sentry/nextjs"
import TicketForm from "./TicketForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Users, init as kindeInit } from "@kinde/management-api-js"


export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { customerId, ticketId } = await searchParams

  if (!customerId && !ticketId) return {
    title: 'Missing Ticket ID or Customer ID'
  }
  if (customerId) return {
    title: `New Ticket for Customer #${customerId}`
  }
  if (ticketId) return {
    title: `Edit Ticket #${ticketId}`
  }
  return {
    title: "Ticket Form"
  }
}

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

    const { getPermission, getUser } = getKindeServerSession()
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ])
    const isManager = managerPermission?.isGranted

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
      //return ticket form
      if (isManager) {
        kindeInit() // Initializes the kinde management API
        const { users } = await Users.getUsers()
        const techs = users ? users.map(user => ({
          id: user.email!,
          description: user.email!,
        })) : []
        return <TicketForm
          isManager={isManager}
          customer={customer}
          techs={techs}
        />

      } else {
        return <TicketForm isManager={isManager} customer={customer} />
      }
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
      if (isManager) {
        kindeInit() // Initializes the kinde management API
        const { users } = await Users.getUsers()
        const techs = users ? users.map(user => ({
          id: user.email!,
          description: user.email!,
        })) : []
        return <TicketForm
          isManager={isManager}
          customer={customer}
          ticket={ticket}
          techs={techs}
        />
      } else {
        const isEditable = user.email?.toLowerCase() === ticket.tech.toLowerCase()
        return <TicketForm
          isManager={isManager}
          customer={customer}
          ticket={ticket}
          isEditable={isEditable}
        />
      }

    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e)
      throw e
    }
  }
}
