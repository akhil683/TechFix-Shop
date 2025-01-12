'use client'

import type { selectCustomerSchemaType } from "@/lib/zod-schema/customer"

import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, TableOfContents } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

type Props = {
  data: selectCustomerSchemaType[],
}

export default function CustomerTable({ data }: Props) {

  const columnHeadersArray: Array<keyof selectCustomerSchemaType> = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "city",
    "zip"
  ]

  const columnHelper = createColumnHelper<selectCustomerSchemaType>()

  const ActionsCell = ({ row }: CellContext<selectCustomerSchemaType, unknown>) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/tickets/form?customerId=${row.original.id}`}
              className="w-full"
              prefetch={false}
            >
              New Ticket
            </Link>
          </DropdownMenuItem>
          <div className="h-2" />
          <DropdownMenuItem>
            <Link
              href={`/customers/form?customerId=${row.original.id}`}
              className="w-full"
              prefetch={false}
            >
              Edit Customer
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  ActionsCell.displayName = "ActionsCell"

  const columns = [
    ...columnHeadersArray.map((columnName) => {
      return columnHelper.accessor(columnName, {
        id: columnName,
        header: columnName[0].toUpperCase() + columnName.slice(1)
      })
    }),
    columnHelper.display({
      id: "actions",
      header: () => <TableOfContents />,
      cell: ActionsCell,
    })
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="rounded-lg overflow-hidden border border-border">
        <Table className="border bg-gray-950">

          {/* Table Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    <div>
                      {/* Render each header cell */}
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </div>
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
                className="cursor-pointer hover:bg-border/25 dark:hover:bg-gray-700/40"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border md:py-4 py-3">
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
      </div >
    </div>
  )
}

