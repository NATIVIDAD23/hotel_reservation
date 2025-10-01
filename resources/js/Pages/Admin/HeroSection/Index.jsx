import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { HeroSectionDialog } from '@/Dialogs/HeroSectionDialog'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import { Input } from '@/Components/ui/input'
import React, { useState } from 'react'

export default function Index({ heroSections }) {
  const [search, setSearch] = useState("")

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "image_path",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.getValue("image_path")}
          alt="hero"
          className="h-12 w-12 object-cover rounded"
        />
      ),
    },
  ]

  const table = useReactTable({
    data: heroSections.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <AuthenticatedLayout header="Hero Section">
      <Head title="Hero Section" />

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center w-full">
                <CardTitle>Hero Sections</CardTitle>
                <div className="flex gap-2">
                    <HeroSectionDialog>
                        <Button>Upload New</Button>
                    </HeroSectionDialog>
                </div>
            </div>
        </CardHeader>

        <CardContent>
          {/* Search */}
          <div className="flex items-center py-4 gap-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Table */}
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
              {table.getRowModel().rows.length ? (
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
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  )
}
