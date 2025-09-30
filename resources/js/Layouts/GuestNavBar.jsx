import { Link, usePage, router } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
    LogOut,
    User,
    Settings,
    Hotel,
    Calendar,
    History,
    Star,
    HelpCircle,
    Menu,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { LoginDialog } from "./LoginDialog";

export default function GuestNavbar({ children }) {
    const { guest } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleLogout = () => {
        router.post(route("guest.logout"));
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Navbar */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
                    scrolled
                        ? "bg-black/70 backdrop-blur-md shadow-md"
                        : "bg-transparent bg-black/10 backdrop-blur-md shadow-md"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Left side - Logo and Navigation */}
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-xl font-bold text-white"
                            >
                                <Hotel className="h-8 w-8 text-blue-400" />
                                <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                                    Hotel Reservation
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <NavigationMenu className="hidden md:flex ml-10">
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <Link
                                            href="/"
                                            className="px-3 py-2 text-sm font-medium text-white hover:text-amber-400 transition-colors"
                                        >
                                            Home
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link
                                            href="/hotels"
                                            className="px-3 py-2 text-sm font-medium text-white hover:text-amber-400 transition-colors"
                                        >
                                            Hotels
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="text-sm font-medium text-white hover:text-amber-400 bg-transparent">
                                            Services
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <div className="w-[400px] p-4 grid grid-cols-2 gap-4">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/services/spa"
                                                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <Star className="h-4 w-4 text-amber-500" />
                                                        <span>Spa & Wellness</span>
                                                    </Link>
                                                </NavigationMenuLink>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/services/dining"
                                                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <Hotel className="h-4 w-4 text-green-500" />
                                                        <span>Dining</span>
                                                    </Link>
                                                </NavigationMenuLink>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/services/meetings"
                                                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <Calendar className="h-4 w-4 text-blue-500" />
                                                        <span>Meetings & Events</span>
                                                    </Link>
                                                </NavigationMenuLink>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/services/transport"
                                                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <User className="h-4 w-4 text-purple-500" />
                                                        <span>Transport</span>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link
                                            href="/contact"
                                            className="px-3 py-2 text-sm font-medium text-white hover:text-amber-400 transition-colors"
                                        >
                                            Contact
                                        </Link>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        {/* Right side - Auth Links / User Menu */}
                        <div className="flex items-center space-x-4">
                            {guest?.user ? (
                                <>
                                    <div className="hidden md:flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href="/bookings">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                My Bookings
                                            </Link>
                                        </Button>
                                    </div>
                                    {/* User Dropdown - FIXED */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="relative h-10 w-10 rounded-full p-0" // Added p-0 to remove button padding
                                            >
                                                <Avatar className="h-10 w-10 border-2 border-blue-100 dark:border-blue-900">
                                                    <AvatarImage
                                                        src={
                                                            guest.user.avatar_url ??
                                                            undefined
                                                        }
                                                        alt={guest.user.name}
                                                    />
                                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-amber-500 text-white">
                                                        {guest.user.name
                                                            ? guest.user.name
                                                                  .charAt(0)
                                                                  .toUpperCase()
                                                            : "G"}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-56"
                                            align="end"
                                            forceMount
                                        >
                                            <DropdownMenuLabel className="font-normal">
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {guest.user.name}
                                                    </p>
                                                    <p className="text-xs leading-none text-gray-600 dark:text-gray-400">
                                                        {guest.user.email}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="/dashboard"
                                                    className="cursor-pointer flex items-center"
                                                >
                                                    <User className="h-4 w-4 mr-2" />
                                                    Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="/profile"
                                                    className="cursor-pointer flex items-center"
                                                >
                                                    <Settings className="h-4 w-4 mr-2" />
                                                    Profile Settings
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="/bookings/history"
                                                    className="cursor-pointer flex items-center"
                                                >
                                                    <History className="h-4 w-4 mr-2" />
                                                    Booking History
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href="/help"
                                                    className="cursor-pointer flex items-center"
                                                >
                                                    <HelpCircle className="h-4 w-4 mr-2" />
                                                    Help & Support
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={handleLogout}
                                                className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 flex items-center"
                                            >
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Log out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <>
                                    <div className="hidden md:flex items-center space-x-2">
                                        <LoginDialog canResetPassword={true}>
                                            <Button
                                                variant="ghost"
                                                className="text-white"
                                            >
                                                Sign In
                                            </Button>
                                        </LoginDialog>
                                        <Button asChild>
                                            <Link
                                                href={route("guest.register")}
                                            >
                                                Create Account
                                            </Link>
                                        </Button>
                                    </div>
                                </>
                            )}

                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="md:hidden text-white"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
                            <div className="space-y-2">
                                <Link
                                    href="/"
                                    className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/hotels"
                                    className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Hotels
                                </Link>
                                <Link
                                    href="/services"
                                    className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Services
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>

                                {!guest?.user && (
                                    <div className="pt-4 border-t border-white/20 space-y-2">
                                        <LoginDialog canResetPassword={true} asChild>
                                            <Button className="w-full">
                                                Sign In
                                            </Button>
                                        </LoginDialog>
                                        <Button variant="outline" asChild className="w-full bg-transparent border-white text-white hover:bg-white/10">
                                            <Link
                                                href={route('guest.register')}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Create Account
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <main>{children}</main>
        </>
    );
}
