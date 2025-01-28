import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ChromeIcon from "@/components/ChromeIcon"

export default function Component() {
    return (
        <div className="mx-auto max-w-md space-y-5 pt-[80px]">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-muted-foreground">Create your account to get started.</p>
            </div>
            <div className="relative rounded-lg backdrop-blur-xl shadow-lg">
                <Card className="border border-muted/50 pt-5">
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="Enter your username" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="Enter your phone number" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            {/* <div className="text-center">
                <Button variant="outline" className="w-full">
                    <ChromeIcon className="mr-2 h-4 w-4" />
                    Sign up with Google
                </Button>
            </div> */}
            <div className="text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium underline" prefetch={false}>
                    Sign in
                </Link>
            </div>
        </div>
    )
}

