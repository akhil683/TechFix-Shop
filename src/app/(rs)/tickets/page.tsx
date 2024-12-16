import TicketSearch from "./TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import TicketTable from "./TicketTable";

export const metadata = {
  title: "Ticket Search",
}
export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {

  const { searchText } = await searchParams

  const defaultResults = await getOpenTickets()
  if (!searchText) {
    return (
      <>
        <TicketSearch />
        {defaultResults.length
          ? <TicketTable data={defaultResults} />
          : <p className="text-center mt-12 text-xl text-gray-500">No Result Found</p>
        }
      </>

    )
  }

  const results = await getTicketSearchResults(searchText)
  return (
    <>
      <TicketSearch />
      {results.length
        ? <TicketTable data={results} />
        : <p className="text-center mt-12 text-xl text-gray-500">No Result Found</p>
      }
    </>
  )
  //query serach results
}
