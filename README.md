# Triluxo Next.js Assignment

## Overview
This project is a **real-time analytics dashboard** with a **proactive support chatbot**. It includes features like authentication, dark/light mode, real-time data visualization, and a context-aware chatbot powered by **Gemini API** and **Vercel AI SDK**. The backend uses **Node.js** for RESTful APIs and WebSocket connections, while the frontend is built with **Next.js 15** (App Router). Data is stored in **MongoDB**, and vector embeddings are managed using **Pinecone**.

---

## Features

### Dashboard (Private)
- **Authentication System**: Secure login and signup using NextAuth.
- **Dark/Light Mode**: Toggle between themes using `next-themes`.
- **Real-Time Visualization**:
  - Active users line chart.
  - Activity metrics bar chart.
- **WebSocket Integration**:
  - Live user counter.
  - Activity feed.
  - Connection status.

### Support Chat (Public)
- **Proactive Messaging**: Chatbot initiates conversations during user inactivity.
- **Context-Aware Responses**: Powered by Gemini API and Vercel AI SDK.
- **Error and Loading States**: Handles errors and loading states gracefully.

---

## Technical Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** for pre-built components
- **Recharts** for data visualization

### Backend
- **Node.js** for RESTful APIs and WebSocket server
- **Next.js API Routes** for backend logic
- **MongoDB** for data storage
- **Pinecone** for vector embeddings

### AI Integration
- **Vercel AI SDK** for chatbot functionality
- **Gemini API** for generating responses and embeddings

### Authentication
- **NextAuth** for session management

---

## Project Structure

```
triluxo-nextjs-assignment/
├── app/
│   ├── api/                  # Next.js API routes
│   ├── dashboard/            # Private dashboard pages
│   ├── chat/                 # Public chat page
│   ├── login/                # Login page
│   ├── signup/               # Signup page
│   ├── profile/              # User profile page
│   └── layout.tsx            # Root layout with theme provider
├── components/               # Reusable components
├── lib/                      # Utility functions and WebSocket server
├── models/                   # MongoDB models
├── public/                   # Static assets
├── styles/                   # Global styles
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

---

## Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **Bun** (for running WebSocket server)
- **MongoDB** (local or cloud instance)
- **Pinecone** account (for vector embeddings)
- **Gemini API** key

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/triluxo-nextjs-assignment.git
cd triluxo-nextjs-assignment
```

### Step 2: Install Dependencies
```bash
bun install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
# MongoDB
MONGODB_URI=your-mongodb-atlas-url

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Pinecone
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX=your-pinecone-index

# Gemini API
GEMINI_API_KEY=your-gemini-api-key
```

### Step 4: Run the Project
Start the development server and WebSocket server concurrently:

```bash
bun run dev:all
```

- **Frontend**: Runs on `http://localhost:3000`
- **WebSocket Server**: Runs on `ws://localhost:8080`

---

## Architecture

### Frontend
- **Next.js 14**: Handles routing, server-side rendering, and API routes.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Recharts**: Library for rendering charts (line chart, bar chart).
- **shadcn/ui**: Pre-built, customizable components for UI.

### Backend
- **Next.js API Routes**: Handles RESTful API requests (e.g., authentication, data fetching).
- **WebSocket Server**: Manages real-time communication for live user count and activity feed.
- **MongoDB**: Stores user data, active user counts, and activity metrics.
- **Pinecone**: Manages vector embeddings for the chatbot.

### AI Integration
- **Vercel AI SDK**: Simplifies AI integration and chat functionality.
- **Gemini API**: Generates context-aware responses and embeddings.

---

## MongoDB Models

### 1. User Model
Stores user information for authentication.

```typescript
interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
  createdAt: Date;
  comparePassword(userPassword: string): Promise<boolean>;
}
```

### 2. ActiveUserCount Model
Tracks the number of active users over time.

```typescript
interface IActiveUserCount extends Document {
  timestamp: Date;
  activeUsers: number;
}
```

### 3. ActivityMetric Model
Tracks activity metrics like sign-ups and messages sent.

```typescript
interface IActivityMetric extends Document {
  timestamp: Date;
  signUps: number;
  messagesSent: number;
}
```

---

## WebSocket Implementation
The WebSocket server (`src/lib/ws.ts`) handles real-time updates for:
- Live user count.
- Activity feed.
- Connection status.

### Key Features
- **Broadcasting**: Sends updates to all connected clients.
- **Connection Management**: Tracks active connections and handles disconnections.

---

## Chatbot Implementation
The chatbot is powered by **Vercel AI SDK** and **Gemini API**. Key features include:
- **Proactive Messaging**: Initiates conversations during user inactivity.
- **Context-Aware Responses**: Uses vector embeddings from Pinecone for context.
- **Chat History Persistence**: Stores messages in MongoDB for continuity.

---

## Deployment
To deploy the project:
1. Build the project:
   ```bash
   bun run build
   ```
2. Start the production server:
   ```bash
   bun run start
   ```

For hosting, consider platforms like **Vercel**, **Netlify**, or **AWS**.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
- **Next.js** for the powerful React framework.
- **Vercel AI SDK** for simplifying AI integration.
- **Gemini API** for intelligent chatbot responses.
- **Pinecone** for vector database management.

---
