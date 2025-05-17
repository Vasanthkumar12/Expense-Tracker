import React, { useState } from 'react';
import { FiHome, FiMenu, FiX } from "react-icons/fi";
import { GrAnalytics } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { to: '/', label: 'Dashboard', icon: <FiHome className='h-6 w-6' /> },
        { to: '/analytics', label: 'Analytics', icon: <GrAnalytics className='h-6 w-6' /> },
        { to: '/history', label: 'History', icon: <MdHistory className='h-6 w-6' /> },
    ];

    return (
        <div className='bg-white shadow-md w-full px-4 py-3'>
            <div className='flex justify-between items-center'>

                {/* Hamburger Icon for Mobile */}
                <button
                    onClick={toggleMenu}
                    className='sm:hidden text-gray-700 focus:outline-none'
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Nav Items */}
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-10 mt-4 sm:mt-0 ${isOpen ? 'block' : 'hidden'} sm:flex`}>
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.to}
                        onClick={() => setIsOpen(false)} // close menu on click
                        className={({ isActive }) =>
                            `flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium transition-colors duration-200 ${
                                isActive ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-500'
                            }`
                        }
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};
