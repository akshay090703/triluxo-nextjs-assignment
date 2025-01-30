'use client'
import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react"
import { Bot, Loader2, Trash, XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import axiosClient from "@/lib/axiosClient";

interface AIChatBoxProps {
    open: boolean,
    onClose: () => void
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
    const {
        messages,
        input,
        handleInputChange,
        setMessages,
        error,
        setInput,
    } = useChat(); // /api/chat

    const [isLoading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const newMessage = { role: "user", content: input, id: crypto.randomUUID() }

        e.preventDefault();
        setMessages((prev) => [...prev, newMessage as Message]);
        setInput('')
        setLoading(true)

        try {
            const response = await axiosClient.post("/chat", { newMessage });

            if (response.status === 200) {
                setMessages((prev) => [...prev, response.data]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)

        }
    }

    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages])

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open])

    return (
        <div className={cn("bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36", open ? "fixed" : "hidden")}>
            <button onClick={onClose} className="mb-3 ms-auto block">
                <XCircle size={30} />
            </button>

            <div className="flex h-[550px] flex-col rounded bg-background border shadow-xl">
                <div className="h-full mt-3 px-3 overflow-y-auto" ref={scrollRef}>
                    {messages.map((message, index) => (
                        <ChatMessage message={message} key={index} />
                    ))}

                    {
                        isLoading && (
                            <ChatMessage message={{ role: "assistant", content: "Thinking...", id: crypto.randomUUID() }} />
                        )
                    }
                </div>

                <form onSubmit={handleSubmit} className="m-3 flex gap-1">
                    <Button title="Clear chat" variant={'outline'} size={'icon'} className="shrink-0" type="button" onClick={() => setMessages([])} disabled={isLoading}>
                        <Trash />
                    </Button>
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Say something..."
                        ref={inputRef}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="animate-spin" />}
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}

function ChatMessage({ message: { role, content } }: { message: Message }) {
    const isAiMessage = role === "assistant";

    return <div className={cn("mb-3 flex items-center", isAiMessage ? "justify-start me-5" : "justify-end ms-5")}>
        {isAiMessage && <Bot className="mr-3 shrink-0" />}
        <p className={cn("whitespace-pre-line rounded-md border px-3 py-2", isAiMessage ? "bg-background" : "bg-primary text-primary-foreground")}>
            {content}
        </p>
        {!isAiMessage && <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full ml-2 dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
        </div>}
    </div>
}