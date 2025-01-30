'use client';

import { useWebSocket } from '@/context/WebSocketContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect } from 'react';

const WebSocketDashboard = () => {
    const { connectionStatus, activeUsers, activityFeed } = useWebSocket();

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className='flex flex-col justify-center gap-4'>
                <Card className="shadow-lg transition-all dark:bg-gray-900 bg-white text-center">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Connection Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <Badge
                            className={cn(
                                'px-4 py-2 text-sm font-medium',
                                connectionStatus === 'Connected' ? 'bg-green-500' :
                                    connectionStatus === 'Disconnected' ? 'bg-red-500' :
                                        'bg-yellow-500'
                            )}
                        >
                            {connectionStatus}
                        </Badge>
                    </CardContent>
                </Card>

                <Card className="shadow-lg transition-all dark:bg-gray-900 bg-white text-center">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex flex-col justify-center items-center">{activeUsers.count}</span>

                        <p className='text-blue-600 dark:text-blue-400 text-center'>Last Update: {activeUsers.timestamp}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Feed Card */}
            <Card className="shadow-lg transition-all dark:bg-gray-900 bg-white">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Activity Feed</CardTitle>
                </CardHeader>
                <CardContent className="h-40 overflow-hidden">
                    <ScrollArea className="h-full">
                        {activityFeed.length > 0 ? (
                            <ul className="space-y-2">
                                {activityFeed.map((feed, index) => (
                                    <li
                                        key={index}
                                        className="p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-between"
                                    >
                                        {feed.message}
                                        <span>{feed.timestamp}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};

export default WebSocketDashboard;
