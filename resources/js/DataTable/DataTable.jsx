"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Wrap with forwardRef
export const DataTable = React.forwardRef(function DataTable(
  { url, columns, resourceKey },
  ref
) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [pagination, setPagination] = React.useState({
    total: 0,
    per_page: 10,
    current_page: 1,
  })

  const fetchData = async (page = 1, searchTerm = "") => {
    setLoading(true)
    try {
      const res = await fetch(
        `${url}?page=${page}&per_page=${pagination.per_page}&search=${searchTerm}`,
        { headers: { Accept: "application/json" } }
      )

      const response = await res.json()
      const result = response[resourceKey]
      if (!result) {
        console.error(`ResourceKey "${resourceKey}" not found in:`, response)
        return
      }

      setData(result.data)
      setPagination({
        total: result.total,
        per_page: result.per_page,
        current_page: result.current_page,
      })
    } catch (err) {
      console.error("Fetch error", err)
    } finally {
      setLoading(false)
    }
  }

  // Run on mount
  React.useEffect(() => {
    fetchData(pagination.current_page, search)
  }, [pagination.current_page, search])

  // Expose methods to parent
  React.useImperativeHandle(ref, () => ({
    refresh: () => fetchData(pagination.current_page, search),
    setData,
  }))

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(pagination.total / pagination.per_page),
  })

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center py-4">
        <span className="text-sm text-muted-foreground">
          Page {pagination.current_page} of{" "}
          {Math.ceil(pagination.total / pagination.per_page)}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((p) => ({ ...p, current_page: p.current_page - 1 }))
            }
            disabled={pagination.current_page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((p) => ({ ...p, current_page: p.current_page + 1 }))
            }
            disabled={
              pagination.current_page ===
              Math.ceil(pagination.total / pagination.per_page)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
})
