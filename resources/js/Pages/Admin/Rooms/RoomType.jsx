import React, { useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { RoomTypeDialog } from "@/Dialogs/RoomTypeDialog";
import { Search, Plus, Hotel } from "lucide-react";
import { DataTable } from "@/DataTable/DataTable";

export default function RoomType({ roomTypes }) {
    const [search, setSearch] = useState("");

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
                            <span className="font-semibold text-gray-900">
                                {row.original.name}
                            </span>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: "amenities",
                header: "Amenities",
                cell: ({ row }) => (
                    <div className="flex flex-wrap gap-1 max-w-md">
                        {Array.isArray(row.original.amenities) &&
                        row.original.amenities.length > 0 ? (
                            row.original.amenities
                                .slice(0, 3)
                                .map((amenity, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        {amenity}
                                    </Badge>
                                ))
                        ) : (
                            <span className="text-gray-400 text-sm">-</span>
                        )}
                        {Array.isArray(row.original.amenities) &&
                            row.original.amenities.length > 3 && (
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
                        {Array.isArray(row.original.rules) &&
                        row.original.rules.length > 0 ? (
                            <div className="space-y-1">
                                {row.original.rules
                                    .slice(0, 2)
                                    .map((rule, index) => (
                                        <div
                                            key={index}
                                            className="text-sm text-gray-600 line-clamp-1"
                                        >
                                            • {rule}
                                        </div>
                                    ))}
                                {row.original.rules.length > 2 && (
                                    <div className="text-xs text-gray-400">
                                        +{row.original.rules.length - 2} more
                                        rules
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
                    <div
                        //className="flex justify-end gap-2"
                    >
                        <Button variant="outline" size="sm">
                            Edit
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <AuthenticatedLayout header="Room Types">
            <Head title="Room Types" />

            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <p className="text-gray-600 mt-2">
                            Manage different types of rooms, their amenities,
                            and rules
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
                <Card className="">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle className="text-xl">
                                    All Room Types
                                </CardTitle>
                                <CardDescription>
                                    {roomTypes.total ?? 0} room type
                                    {roomTypes.total !== 1 ? "s" : ""} available
                                </CardDescription>
                            </div>
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search room types..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10"
                                />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="overflow-hidden rounded-lg">
                            <DataTable data={roomTypes} columns={columns} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
