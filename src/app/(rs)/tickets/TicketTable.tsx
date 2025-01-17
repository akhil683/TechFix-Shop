'use client'

import { useState, useMemo, useEffect } from "react"
import type { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults"
import { useRouter, useSearchParams } from "next/navigation"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  SortingState,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  CircleCheckIcon,
  CircleXIcon,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import Filter from "@/components/react-table/Filter"
import { usePolling } from "@/hooks/usePolling"

type Props = {
  data: TicketSearchResultsType,
}
type RowType = TicketSearchResultsType[0]

export default function TicketTable({ data }: Props) {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "ticketDate",
      desc: false, //false for ascending
    }
  ])

  //live updating
  usePolling(600000, searchParams.get("searchText"))

  const pageIndex = useMemo(() => {
    const page = searchParams.get("page")
    return page ? parseInt(page) - 1 : 0
  }, [searchParams.get("page")]) // eslint-disable-line

  const columnHeadersArray: Array<keyof RowType> = [
    'ticketDate',
    "title",
    "tech",
    "firstName",
    "lastName",
    "email",
    "completed"
  ]
  const columnWidths = {
    completed: 150,
    ticketDate: 150,
    title: 250,
    tech: 225,
    email: 225
  }

  const columnHelper = createColumnHelper<RowType>()
  const columns = columnHeadersArray.map((columnName) => {
    return columnHelper.accessor((row) => { // Transform data format
      const value = row[columnName]
      if (columnName === "ticketDate" && value instanceof Date) {
        return value.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      }
      if (columnName === "completed") {
        return value
          ? "COMPLETED"
          : "OPEN"
      }
      return value
    }, {
      id: columnName,
      size: columnWidths[columnName as keyof typeof columnWidths] ?? undefined,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="pl-1 w-full flex justify-between"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {columnName[0].toUpperCase() + columnName.slice(1)}
            {column.getIsSorted() === "asc" && (
              <ArrowUp className="ml-2 h-4 w-4" />
            )}
            {column.getIsSorted() === "desc" && (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
            {column.getIsSorted() !== "desc" &&
              column.getIsSorted() !== "asc" && (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
          </Button>
        )
      },
      cell: ({ getValue }) => { // presentational data
        const value = getValue()
        if (columnName === "completed") {
          return (
            <div className="grid place-content-center">
              {value === "OPEN"
                ? <CircleXIcon className="opacity-25" />
                : <CircleCheckIcon className="text-green-600" />
              }
            </div>
          )
        }
        return value
      }
    })
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  })

  //sync filters with pagination
  useEffect(() => {
    const currentPageIndex = table.getState().pagination.pageIndex
    const pageCount = table.getPageCount()
    if (pageCount <= currentPageIndex && currentPageIndex > 0) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("page", "1")
      router.replace(`${params.toString()}`, { scroll: false })
    }
  }, [table.getState().columnFilters]) //eslint-disable-line  react-hooks/exhaustive-deps

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="rounded-lg overflow-hidden border border-border">
        <Table className="border bg-gray-950">

          {/* Table Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead style={{ width: header.getSize() }} key={header.id} className="bg-secondary p-1">
                    <div>
                      {/* Render each header cell */}
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </div>
                    {/* Filter Inputs */}
                    {header.column.getCanFilter() ? (
                      <div className="grid place-content-center">
                        <Filter
                          column={header.column}
                          filteredRows={table.getFilteredRowModel().rows.map(row => row.getValue(header.column.id))}
                        />
                      </div>
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows.map((row) => (

              // Table Row
              <TableRow
                key={row.id}
                className="text-gray-200 cursor-pointer hover:bg-border/25 dark:hover:bg-gray-700/40"
                onClick={() => router.push(`/tickets/form?ticketId=${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border py-3 md:py-4">
                    {/* Render each cell data */}
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between gap-2 flex-wrap items-center">
        <div className="flex basis-1/3 items-center">
          <p className="whitespace-nowrap font-bold">
            {`Page ${table.getState().pagination.pageIndex + 1} of ${Math.max(1, table.getPageCount())}`}
            &nbsp;&nbsp;
            {`${table.getFilteredRowModel().rows.length} ${table.getFilteredRowModel().rows.length !== 1 ? "total results" : "result"}`}
          </p>
        </div>
        <div className="space-x-1 flex flex-wrap">
          <div>
            <Button
              variant='outline'
              onClick={() => table.resetColumnFilters()}
            >
              Reset Filters
            </Button>
            <Button
              variant='outline'
              onClick={() => table.resetSorting()}
            >
              Reset Sorting
            </Button>
            <Button
              variant='outline'
              onClick={() => router.refresh()}
            >
              Latest Data
            </Button>
          </div>
          <Button
            variant='outline'
            onClick={() => {
              const newIndex = table.getState().pagination.pageIndex - 1
              table.setPageIndex(newIndex)
              const params = new URLSearchParams(searchParams.toString())
              params.set("page", (newIndex + 1).toString())
              router.replace(`?${params.toString()}`, { scroll: false })
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              const newIndex = table.getState().pagination.pageIndex + 1
              table.setPageIndex(newIndex)
              const params = new URLSearchParams(searchParams.toString())
              params.set("page", (newIndex + 1).toString())
              router.replace(`?${params.toString()}`, { scroll: false })
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div >
  )
}

