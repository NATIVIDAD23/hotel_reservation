import React, { useMemo, useState } from "react";
import { Head, Link, } from "@inertiajs/react";
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
import { Search, Plus, Hotel } from "lucide-react";
import { DataTable } from "@/DataTable/DataTable";

export default function Room({  }) {
    const [search, setSearch] = useState("");

    return (
        <AuthenticatedLayout header="Rooms">
            <Head title="Rooms" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <p className="text-gray-600 mt-2">
                            Manage different types of rooms, their amenities,
                            and rules
                        </p>
                    </div>
                    <Link href={route("admin.room.create")}>
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Room
                        </Button>
                    </Link>

                </div>

                {/* Main Card */}
                <Card className="">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle className="text-xl">
                                    Rooms
                                </CardTitle>
                                <CardDescription>
                                    Manage different types of rooms
                                </CardDescription>
                            </div>
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search room name or types..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10"
                                />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">

                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
