"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, MoveLeft, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const router = useRouter()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="pt-[100px] min-h-screentext-gray-900 dark:text-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-start gap-4 mb-8">
                    <Button variant={'outline'} onClick={() => router.push("/dashboard")}>
                        <MoveLeft />
                        Back to Dashboard
                    </Button>
                    <h1 className="text-3xl font-bold">Profile</h1>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="Profile Picture"
                            />
                            <AvatarFallback>
                                {session?.user?.fullName
                                    ?.split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-semibold">{session?.user?.fullName}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-4">User Details</h3>
                        <div className="space-y-2">
                            <p>
                                <span className="font-medium">User ID:</span> {session?.user?._id}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span> {session?.user?.email}
                            </p>
                            <p>
                                <span className="font-medium">Full Name:</span> {session?.user?.fullName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}