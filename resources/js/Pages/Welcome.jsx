import { Head, Link } from '@inertiajs/react';
import GuestNavbar from '../Layouts/GuestNavbar';
export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <GuestNavbar>
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Welcome Page</h1>
                <p className="text-gray-600">This is landing page.</p>
            </div>
            </GuestNavbar>
        </>
    );
}
