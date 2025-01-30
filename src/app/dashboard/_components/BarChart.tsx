'use client'
import { Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import axiosClient from "@/lib/axiosClient"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

type ActivityMetric = {
    timestamp: string
    signUps: number
    messagesSent: number
}

export default function DashboardBarChart() {
    const [activityMetric, setActivityMetric] = useState<ActivityMetric[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchActivityData();
    }, [])

    const fetchActivityData = async () => {
        try {
            setLoading(true)
            const res = await axiosClient.get("/activityMetrics")

            if (res.status === 200) {
                const formattedData = res.data.map((item: ActivityMetric) => ({
                    ...item,
                    timestamp: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }));

                setActivityMetric(formattedData);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
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
                <CardTitle>Activity Metrics</CardTitle>
                <CardDescription>Comparison of sign-ups and messages sent</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityMetric} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="signUps" fill="#8884d8" />
                            <Bar dataKey="messagesSent" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}