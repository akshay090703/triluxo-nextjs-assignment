'use client'
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gray-100 dark:bg-gray-900">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Triluxo
            </div>
            <div className="flex items-center gap-4">
                {mounted && (
                    <ModeToggle />
                )}

                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar