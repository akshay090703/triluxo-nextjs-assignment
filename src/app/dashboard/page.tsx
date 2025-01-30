"use client"

import DashboardBarChart from "./_components/BarChart"
import DashboardLineChart from "./_components/LineChart"
import WebSocketDashboard from "./_components/WebSocketDashboard"

export default function AnalyticsDashboard() {
    return (
        <div className="space-y-4 pt-[100px] px-6 pb-4">
            <h2 className="text-center text-2xl">Dashboard</h2>
            <WebSocketDashboard />

            <DashboardLineChart />

            <DashboardBarChart />
        </div>
    )
}

