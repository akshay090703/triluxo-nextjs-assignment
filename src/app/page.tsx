"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className={`min-h-screen flex flex-col justify-between`}>
      <main className="flex-grow flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Welcome to Triluxo
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
          A real-time analytics dashboard with a proactive support chatbot. Stay
          on top of your data and assist users effortlessly.
        </p>
        <div className="mt-8">
          <Button
            variant="default"
            className="px-10 py-6 text-white text-lg rounded-md shadow transition"
            size={"lg"}
            onClick={() => router.push('/login')}
          >
            Get Started
          </Button>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Triluxo. All rights reserved.
      </footer>
    </div>
  );
}
