import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function AdminGuestLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
                {/* Left Side - Logo and Branding */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <Link href="/" className="mb-8 lg:mb-12">
                        <ApplicationLogo className="h-24 w-24 lg:h-32 lg:w-32 fill-current text-gray-700" />
                    </Link>

                    <div className="space-y-4 max-w-md">
                        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Welcome to LuxStay
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                            Experience luxury and comfort like never before. Book your perfect stay with our exclusive hotel reservation system.
                        </p>

                        <div className="hidden lg:block space-y-3 pt-4">
                            <div className="flex items-center space-x-3 text-gray-600">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>Best price guarantee</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>24/7 customer support</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>Free cancellation</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Card */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
