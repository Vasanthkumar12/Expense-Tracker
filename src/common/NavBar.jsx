import React from 'react'
import { FiHome } from "react-icons/fi";
import { GrAnalytics } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div className='flex justify-start items-center pl-10 pt-3 pb-3 shadow-md'>
            <div className='flex justify-start items-center pl-20'>
                <FiHome className='h-10 w-7' />
                <NavLink to='/'>
                    <span className='pl-2 text-[18px]'>Dashboard</span>
                </NavLink>
            </div>
            <div className='flex justify-start items-center pl-20'>
                <GrAnalytics className='h-10 w-7' />
                <NavLink to='/analytics'>
                    <span className='pl-2 text-[18px]'>Analytics</span>
                </NavLink>
            </div>
            <div className='flex justify-start items-center pl-20'>
                <MdHistory className='h-10 w-7' />
                <NavLink to='/history'>
                    <span className='pl-2 text-[18px]'>History</span>
                </NavLink>
            </div>
        </div>
    )
}