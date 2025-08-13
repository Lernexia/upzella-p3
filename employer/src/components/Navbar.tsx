import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui-components/Button';
import { Logo } from '@/components/Logo';
import { UserIcon, LogoutIcon, ChevronDownIcon, ButtonIcon, NavigationIcon } from '@/components/svg-icons';

export interface NavbarProps {
    className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/auth/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navigationItems = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/jobs', label: 'Jobs' },
        { href: '/jobs/create', label: 'Create Job' },
    ];

    return (
        <nav className={`bg-transparent border-b border-gray-200 ${className}`}>
            <div className="sizer py-0">
                <div className="flex justify-between items-center h-20">
                    {/* Logo and Brand */}
                    <div className="flex items-center pb-4">
                        <Logo tagline link={'/'} />
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* User Profile Dropdown */}
                    <div className="flex items-center space-x-4">
                        <div className="relative w-full flex items-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center justify-center space-x-2 p-2 hover:bg-blue-50"
                            >
                                <div className='flex items-center justify-center space-x-1'>
                                    <div className='w-fit shrink-0'>
                                        {user?.avatar_url ? (
                                            <img
                                                src={user.avatar_url}
                                                alt="Profile"
                                                className="h-8 w-8 rounded-full object-cover border border-gray-200"
                                            />
                                        ) : (
                                            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <UserIcon className="h-4 w-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex items-center justify-center shrink-0'>
                                        <span className="hidden md:block text-sm font-medium text-gray-700">
                                            {user?.full_name || 'User'}
                                        </span>
                                        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                                    </div>
                                </div>
                            </Button>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 z-20 bg-black/20"
                                        onClick={() => setIsProfileDropdownOpen(false)}
                                    />

                                    {/* Dropdown Content */}
                                    <div className="absolute right-0 mt-2 top-5 w-64 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 z-20">
                                        <div className="py-2">
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <div className="flex items-center space-x-3">
                                                    {user?.avatar_url ? (
                                                        <img
                                                            src={user.avatar_url}
                                                            alt="Profile"
                                                            className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                            <UserIcon className="h-5 w-5 text-white" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {user?.full_name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {user?.email}
                                                        </p>
                                                        {user?.company?.name && (
                                                            <p className="text-xs text-blue-600 font-medium mt-1">
                                                                {user.job_role} @ {user.company.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-1">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                                    onClick={() => setIsProfileDropdownOpen(false)}
                                                >
                                                    <UserIcon className="h-4 w-4 mr-3" />
                                                    My Profile
                                                </Link>

                                                <div className="border-t border-gray-100 mt-1 pt-1">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                                    >
                                                        <LogoutIcon className="h-4 w-4 mr-3" />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 hover:bg-blue-50"
                            >
                                <NavigationIcon className="h-6 w-6 text-gray-600" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 mt-4 pt-4 space-y-1">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};
