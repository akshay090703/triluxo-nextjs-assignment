'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ChromeIcon from "@/components/ChromeIcon"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function Component() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError("");
        setLoading(true)

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (res?.error) {
            setError(res.error);
            toast.error(res.error)
        } else {
            router.replace("/dashboard");
            toast.success("Logged in successfully")
        }
    }

    return (
        <div className="mx-auto max-w-sm space-y-6 min-h-screen flex flex-col justify-center items-center">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button disabled={loading} className="w-full" onClick={handleSubmit}>
                    {loading && <Loader2 className="animate-spin" />}
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    <ChromeIcon className="mr-2 h-4 w-4" />
                    Login with Google
                </Button>
                <Link href="/signup" className="inline-block w-full text-center text-sm underline" prefetch={false}>
                    Create New Account
                </Link>
            </div>
        </div>
    )
}