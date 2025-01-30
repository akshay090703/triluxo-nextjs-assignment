import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let activeUsers = 0;
const activityFeed: string[] = [];

wss.on("connection", (ws) => {
  activeUsers++;
  broadcastActiveUsers();
  broadcastActivityFeed("A new user connected");

  ws.on("message", (message) => {
    const messageString = message.toString();
    broadcastActivityFeed(`User: ${messageString}`);
  });

  ws.on("close", () => {
    activeUsers--;
    broadcastActiveUsers();
    broadcastActivityFeed("A user disconnected");
  });
});

function broadcastActiveUsers() {
  const message = JSON.stringify({
    type: "activeUsers",
    count: activeUsers,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function broadcastActivityFeed(activity: string) {
  activityFeed.push(activity);
  const message = JSON.stringify({
    type: "activityFeed",
    message: activity,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

console.log("WebSocket server is running on ws://localhost:8080");
