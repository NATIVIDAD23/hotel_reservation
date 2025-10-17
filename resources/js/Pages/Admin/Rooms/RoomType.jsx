import React, { useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RoomTypeDialog } from "@/Dialogs/RoomTypeDialog";
import { Search, Plus, Hotel } from "lucide-react";

export default function RoomType({ roomTypes }) {
  const [search, setSearch] = useState("");

  // ✅ Define columns with enhanced styling
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Room Type",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <Hotel className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="font-semibold text-gray-900">{row.original.name}</span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "amenities",
        header: "Amenities",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-md">
            {Array.isArray(row.original.amenities) && row.original.amenities.length > 0 ? (
              row.original.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400 text-sm">-</span>
            )}
            {Array.isArray(row.original.amenities) && row.original.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{row.original.amenities.length - 3} more
              </Badge>
            )}
          </div>
        ),
      },
      {
        accessorKey: "rules",
        header: "Rules",
        cell: ({ row }) => (
          <div className="max-w-md">
            {Array.isArray(row.original.rules) && row.original.rules.length > 0 ? (
              <div className="space-y-1">
                {row.original.rules.slice(0, 2).map((rule, index) => (
                  <div key={index} className="text-sm text-gray-600 line-clamp-1">
                    • {rule}
                  </div>
                ))}
                {row.original.rules.length > 2 && (
                  <div className="text-xs text-gray-400">
                    +{row.original.rules.length - 2} more rules
                  </div>
                )}
              </div>
            ) : (
              <span className="text-gray-400 text-sm">-</span>
            )}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button variant="default" size="sm">
              Add Rooms
            </Button>

            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: roomTypes.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // ✅ Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    router.get(
      route("admin.room.type.index"),
      { search: value },
      { preserveState: true, replace: true }
    );
  };

  return (
    <AuthenticatedLayout header="Room Types">
      <Head title="Room Types" />

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-gray-600 mt-2">
              Manage different types of rooms, their amenities, and rules
            </p>
          </div>
          <RoomTypeDialog>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Room Type
            </Button>
          </RoomTypeDialog>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl">All Room Types</CardTitle>
                <CardDescription>
                  {roomTypes.total ?? 0} room type{roomTypes.total !== 1 ? 's' : ''} available
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search room types..."
                  value={search}
                  onChange={handleSearch}
                  className="w-full pl-10"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Table */}
            <div className="overflow-hidden rounded-lg">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="border-b border-gray-200">
                      {headerGroup.headers.map((header) => (
                        <TableHead 
                          key={header.id} 
                          className="py-4 font-semibold text-gray-700"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow 
                        key={row.id} 
                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-4">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <Hotel className="w-12 h-12 mb-4 opacity-40" />
                          <p className="text-lg font-medium text-gray-500">No room types found</p>
                          <p className="text-sm mt-1">
                            {search ? "Try adjusting your search terms" : "Get started by adding your first room type"}
                          </p>
                          {!search && (
                            <RoomTypeDialog>
                              <Button className="mt-4">Add Room Type</Button>
                            </RoomTypeDialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Enhanced Pagination */}
            {table.getRowModel().rows.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{roomTypes.from ?? 0}</span> to{" "}
                  <span className="font-semibold">{roomTypes.to ?? 0}</span> of{" "}
                  <span className="font-semibold">{roomTypes.total ?? 0}</span> results
                </div>
                <div className="flex gap-1">
                  {roomTypes.links.map((link, idx) => (
                    <Button
                      key={idx}
                      variant={link.active ? "default" : "outline"}
                      size="sm"
                      disabled={!link.url}
                      onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
                      className="min-w-[40px]"
                    >
                      {link.label
                        .replace("&laquo;", "«")
                        .replace("&raquo;", "»")
                        .replace("Previous", "←")
                        .replace("Next", "→")}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}