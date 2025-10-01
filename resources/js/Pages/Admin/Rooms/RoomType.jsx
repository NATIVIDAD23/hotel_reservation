import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { RoomTypeDialog } from '@/Dialogs/RoomTypeDialog'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React, { useState } from 'react'

export default function RoomType() {

  return (
    <AuthenticatedLayout header="Room Types">
      <Head title="Room Types" />

      <Card>
      <CardHeader>
            <div className="flex justify-between items-center w-full">
                <CardTitle>Room Types</CardTitle>
                <div className="flex gap-2">
                    <RoomTypeDialog>
                        <Button>Add Room Type</Button>
                    </RoomTypeDialog>
                </div>
            </div>
        </CardHeader>


        <CardContent>

        </CardContent>
      </Card>
    </AuthenticatedLayout>
  )
}
