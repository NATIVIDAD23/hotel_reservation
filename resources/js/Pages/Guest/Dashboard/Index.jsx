import { Head, usePage } from '@inertiajs/react';

export default function GuestDashboard() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Guest Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in as guest! {auth.user?.name}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
