import React, { useState } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Container from '../components/Container/Container';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth();
    const location = useLocation();

    const navItems = [
        {
            path: '/dashboard/userHome',
            label: 'User Home',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full bg-black shadow-lg">
                <div className="h-16 flex items-center justify-between px-4 lg:px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-lg text-white hover:bg-gray-800 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                        <h1 className="text-xl font-semibold text-white">{user?.displayName}</h1>
                    </div>

                    <div className='pr-3'>
                        {user?.photoURL && (
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-black rounded-full"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`
                    fixed top-16 bottom-0 lg:sticky lg:top-16 
                    w-64 min-h-screen 
                    bg-black
                    transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 
                    transition-transform duration-300 ease-in-out
                    z-30
                    border-r border-gray-800
                `}>
                    <div className="h-full overflow-y-auto">
                        <div className="px-4 py-6 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-200
                                        ${isActive(item.path)
                                            ? 'bg-[#FF8080] text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }
                                    `}
                                >
                                    <span className={`${isActive(item.path) ? 'text-white' : 'text-gray-400'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0 bg-gray-100">
                    <Container>
                        <div className="py-6">
                            <Outlet />
                        </div>
                    </Container>
                </div>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;