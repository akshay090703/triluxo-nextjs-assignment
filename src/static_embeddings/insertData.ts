import ActivityMetric from "@/models/ActivityMetric";
import ActiveUserCount from "@/models/ActiveUserCount";
import dbConnect from "@/lib/dbConnect";

// Static data for ActivityMetric
const activityMetricsData = [
  {
    timestamp: new Date(`2025-01-29T12:00:00Z`),
    signUps: 10,
    messagesSent: 200,
  },
  {
    timestamp: new Date(`2025-01-29T12:10:00Z`),
    signUps: 15,
    messagesSent: 250,
  },
  {
    timestamp: new Date(`2025-01-29T12:20:00Z`),
    signUps: 12,
    messagesSent: 220,
  },
  {
    timestamp: new Date(`2025-01-29T12:30:00Z`),
    signUps: 20,
    messagesSent: 300,
  },
];

// Static data for ActiveUserEntry
const activeUsersData = [
  { timestamp: new Date(`2025-01-29T12:00:00Z`), activeUsers: 100 },
  { timestamp: new Date(`2025-01-29T12:10:00Z`), activeUsers: 115 },
  { timestamp: new Date(`2025-01-29T12:20:00Z`), activeUsers: 130 },
  { timestamp: new Date(`2025-01-29T12:30:00Z`), activeUsers: 125 },
  { timestamp: new Date(`2025-01-29T12:40:00Z`), activeUsers: 140 },
  { timestamp: new Date(`2025-01-29T12:50:00Z`), activeUsers: 160 },
];

dbConnect();

// Insert data into the database
async function insertData() {
  try {
    await ActivityMetric.insertMany(activityMetricsData);
    console.log("ActivityMetrics data inserted successfully!");

    await ActiveUserCount.insertMany(activeUsersData);
    console.log("ActiveUsers data inserted successfully!");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}

// Call the function to insert data
insertData();
