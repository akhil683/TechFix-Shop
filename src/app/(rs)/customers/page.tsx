import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerResults";

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

  //query database
  const results = await getCustomerSearchResults(searchText)

  //return results
  return (
    <>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  )
}

