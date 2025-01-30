'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ChromeIcon from "@/components/ChromeIcon"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axiosClient from "@/lib/axiosClient"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function Component() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError("")
        setLoading(true)

        try {
            const res = await axiosClient.post("/auth/signup", {
                email,
                password,
                fullName,
            })

            if (res.status === 201) {
                toast.success("New User successfully created!")
                router.replace("/login")
            }
        } catch (error: any) {
            setError(error.message || "Something went wrong")
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)

        }
    }

    return (
        <div className="mx-auto max-w-md space-y-5 pt-[8%]">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-muted-foreground">Create your account to get started.</p>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="relative rounded-lg backdrop-blur-xl shadow-lg">
                <Card className="border border-muted/50 pt-5">
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Enter your email" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" type="text" placeholder="Enter your full name" value={fullName}
                                onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSubmit} className="w-full" disabled={loading}>
                            {loading && <Loader2 className="animate-spin" />}
                            Sign Up
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium underline" prefetch={false}>
                    Sign in
                </Link>
            </div>
        </div>
    )
}

