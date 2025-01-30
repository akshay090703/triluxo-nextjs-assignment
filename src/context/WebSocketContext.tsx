'use client';

import { getEmbedding } from '@/lib/gemini';
import { appIndex } from '@/lib/pinecone';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ActivityEntry {
    message: string;
    timestamp: string;
}

interface WebSocketContextType {
    connectionStatus: string;
    activeUsers: { count: number; timestamp: string };
    activityFeed: ActivityEntry[];
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');
    const [activeUsers, setActiveUsers] = useState<{ count: number; timestamp: string }>({
        count: 0,
        timestamp: '',
    });
    const [activityFeed, setActivityFeed] = useState<ActivityEntry[]>([]);

    const updateEmbeddings = async () => {
        const connectionStatusEmbedding = await getEmbedding(connectionStatus);

        const activeUsersText = `Active Users: ${activeUsers.count}, Last Updated: ${activeUsers.timestamp}`;
        const activeUserEmbedding = await getEmbedding(activeUsersText);

        const activityMessages = activityFeed.map(entry => entry.message).join("\n");
        const activityEmbedding = await getEmbedding(activityMessages);

        await appIndex.upsert([
            {
                id: "connection-status",
                values: connectionStatusEmbedding,
                metadata: { status: connectionStatus },
            },
            {
                id: "active-users",
                values: activeUserEmbedding,
                metadata: {
                    activeUsersCount: activeUsers.count,
                    lastUpdated: activeUsers.timestamp,
                },
            },
            {
                id: `activity-feed`,
                values: activityEmbedding,
                metadata: {
                    activityMessages: activityFeed.map(entry => entry.message),
                    timestamp: activityFeed[0]?.timestamp,
                },
            },
        ]);

        console.log("Embeddings updated.");
    };

    useEffect(() => {
        const socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_ORIGIN}:8080`);

        socket.onopen = () => {
            setConnectionStatus('Connected');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);

            if (data.type === 'activeUsers') {
                setActiveUsers({ count: data.count, timestamp: data.timestamp });
            } else if (data.type === 'activityFeed') {
                setActivityFeed((prevFeed) => [
                    { message: data.message, timestamp: data.timestamp },
                    ...prevFeed,
                ]);
            }

            updateEmbeddings();
        };

        socket.onclose = () => {
            setConnectionStatus('Disconnected');
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ connectionStatus, activeUsers, activityFeed }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
