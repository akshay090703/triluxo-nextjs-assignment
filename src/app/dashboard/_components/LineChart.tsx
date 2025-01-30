import { Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, LineChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import axiosClient from "@/lib/axiosClient"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

type ActiveUserEntry = {
    timestamp: string
    activeUsers: number
}

export default function DashboardLineChart() {
    const [activeUserData, setActiveUserData] = useState<ActiveUserEntry[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchActivityData();
    }, [])

    const fetchActivityData = async () => {
        try {
            setLoading(true)
            const res = await axiosClient.get("/activeUserEntries")

            if (res.status === 200) {
                const formattedData = res.data.map((item: ActiveUserEntry) => ({
                    ...item,
                    timestamp: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }));

                setActiveUserData(formattedData);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false)

        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Skeleton className="h-[200px] w-[400px] rounded-xl " />
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Users Over Time</CardTitle>
                <CardDescription>Number of active users in 10-minute intervals</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={activeUserData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}