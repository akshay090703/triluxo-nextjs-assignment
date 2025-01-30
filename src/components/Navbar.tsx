'use client'

import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ModeToggle'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AIChatButton from './AIChatButton'
import Image from 'next/image'

const Navbar = () => {
    const [mounted, setMounted] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

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

                <AIChatButton />

                {session ? <div className="w-10 h-10 rounded-full overflow-hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <Image src={"https://github.com/shadcn.png"} alt='avatar image' width={40} height={40} />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div> : (
                    <Button variant={'default'} onClick={() => router.push("/login")}>Login</Button>
                )}
            </div>
        </nav>
    )
}

export default Navbar