import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    LayoutDashboard,
    Image,
    User,
    LogOut,
    Menu,
    Settings,
    Hotel,
    House,
    Type
} from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const navigation = [
        {
            name: "Dashboard",
            href: route('admin.dashboard'),
            icon: LayoutDashboard,
            active: route().current('admin.dashboard')
        },
        {
            name: "Hero Section",
            href: route('admin.herosection'),
            icon: Image,
            active: route().current('admin.herosection')
        },
        {
            name: "Room Types",
            href: route('admin.room.type'),
            icon: Type,
            active: route().current('admin.room.type')
        },
        {
            name: "Rooms",
            href: route('admin.room'),
            icon: House,
            active: route().current('admin.room')
        },
    ];

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-gray-50">
                {/* Desktop Sidebar */}
                <Sidebar className="hidden lg:flex border-r border-gray-200">
                    <SidebarHeader className="border-b border-gray-200">
                        <div className="flex items-center gap-2 px-4 py-4">
                            <Link href="/" className="flex items-center gap-2">
                                <Hotel className="h-8 w-8 text-blue-600" />
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                                    Admin
                                </span>
                            </Link>
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarMenu>
                            {navigation.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton
                                        asChild
                                       className="flex items-center gap-4 px-6 py-5 text-lg font-medium rounded-lg transition-colors"
                                    >
                                        <Link
                                            href={item.href}
                                            className={`
                                                flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors
                                                ${item.active
                                                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700 hover:bg-blue-100 hover:text-blue-700'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-blue-200 hover:border-r-2 border-blue-700 hover:text-blue-700'
                                                }
                                            `}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>

                    <SidebarFooter className="border-t border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={auth?.admin?.avatar_url}
                                    alt={auth?.admin?.name}
                                />
                                <AvatarFallback className="bg-blue-100 text-blue-700">
                                    {auth?.admin?.name?.charAt(0).toUpperCase() || 'A'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {auth?.admin?.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {auth?.admin?.email}
                                </p>
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                {/* Mobile Sidebar Sheet */}
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetContent side="left" className="w-64 p-0">
                        <Sidebar>
                            <SidebarHeader className="border-b border-gray-200">
                                <div className="flex items-center gap-2 px-4 py-4">
                                    <Hotel className="h-8 w-8 text-blue-600" />
                                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                                        LuxStay Admin
                                    </span>
                                </div>
                            </SidebarHeader>

                            <SidebarContent>
                                <SidebarMenu>
                                    {navigation.map((item) => (
                                        <SidebarMenuItem key={item.name}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={item.active}
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <Link
                                                    href={item.href}
                                                   className={`
                                                        flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors
                                                        ${item.active
                                                            ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                        }
                                                    `}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    {item.name}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarContent>

                            <SidebarFooter className="border-t border-gray-200 p-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={auth?.admin?.avatar_url}
                                            alt={auth?.admin?.name}
                                        />
                                        <AvatarFallback className="bg-blue-100 text-blue-700">
                                            {auth?.admin?.name?.charAt(0).toUpperCase() || 'A'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {auth?.admin?.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {auth?.admin?.email}
                                        </p>
                                    </div>
                                </div>
                            </SidebarFooter>
                        </Sidebar>
                    </SheetContent>
                </Sheet>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                            {/* Left side - Mobile menu button */}
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="lg:hidden"
                                    onClick={() => setMobileOpen(true)}
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>

                                {/* Breadcrumb or Page Title */}
                                {header && (
                                    <div className="hidden sm:block">
                                        <h1 className="text-2xl font-semibold text-gray-900">
                                            {header}
                                        </h1>
                                    </div>
                                )}
                            </div>

                            {/* Right side - User dropdown */}
                            <div className="flex items-center gap-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={auth?.admin?.avatar_url}
                                                    alt={auth?.admin?.name}
                                                />
                                                <AvatarFallback className="bg-blue-100 text-blue-700">
                                                    {auth?.admin?.name?.charAt(0).toUpperCase() || 'A'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {auth?.admin?.name}
                                                </p>
                                                <p className="text-xs leading-none text-gray-600">
                                                    {auth?.admin?.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href={route('admin.profile.edit')} className="cursor-pointer">
                                                <User className="h-4 w-4 mr-2" />
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin/settings" className="cursor-pointer">
                                                <Settings className="h-4 w-4 mr-2" />
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            asChild
                                            className="text-red-600 focus:text-red-600"
                                        >
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="w-full cursor-pointer"
                                            >
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Log Out
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Mobile Header Title */}
                        {header && (
                            <div className="sm:hidden px-4 pb-4">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {header}
                                </h1>
                            </div>
                        )}
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 overflow-auto">
                        <div className="p-4 sm:p-6 lg:p-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
