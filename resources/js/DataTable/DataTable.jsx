"use client";

import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/Components/ui/button";

// Wrap with forwardRef
export const DataTable = React.forwardRef(function DataTable(
    { url, columns, data },
    ref
) {
    const table = useReactTable({
        data: data.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className="overflow-hidden rounded-lg">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-b border-gray-200"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="py-4 font-semibold text-gray-700"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
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
                                        <TableCell
                                            key={cell.id}
                                            className="py-4"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="py-12 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <p className="text-lg font-medium text-gray-500">
                                            No results found
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {table.getRowModel().rows.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                        Showing{" "}
                        <span className="font-semibold">
                            {data.from ?? 0}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold">
                            {data.to ?? 0}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold">
                            {data.total ?? 0}
                        </span>{" "}
                        results
                    </div>
                    <div className="flex gap-1">
                        {data.links.map((link, idx) => (
                            <Button
                                key={idx}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                disabled={!link.url}
                                onClick={() =>
                                    link.url &&
                                    router.visit(link.url, {
                                        preserveScroll: true,
                                    })
                                }
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
        </>
    );
});
