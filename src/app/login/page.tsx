import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ChromeIcon from "@/components/ChromeIcon"

export default function Component() {
    return (
        <div className="mx-auto max-w-sm space-y-6 min-h-screen flex flex-col justify-center items-center">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    <ChromeIcon className="mr-2 h-4 w-4" />
                    Login with Google
                </Button>
                <Link href="#" className="inline-block w-full text-center text-sm underline" prefetch={false}>
                    Forgot your password?
                </Link>
            </div>
        </div>
    )
}