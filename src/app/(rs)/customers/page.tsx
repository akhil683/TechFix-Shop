import * as Sentry from "@sentry/nextjs"
import { getCustomerSearchResults } from "@/lib/queries/getCustomerResults";
import CustomerSearch from "./CustomerSearch";
import CustomerTable from "./CustomerTable";

export const metadata = {
  title: "Customer Search",
}

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {

  const { searchText } = await searchParams
  if (!searchText) return <CustomerSearch />


  //query database: Analyse performance with sentry
  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResults-2"
  })
  const results = await getCustomerSearchResults(searchText)
  span.end()

  //return results
  return (
    <>
      <CustomerSearch />
      {results.length
        ? <CustomerTable data={results} />
        : <p className="mt-6 text-lg">No Results Found</p>
      }

    </>
  )
}

