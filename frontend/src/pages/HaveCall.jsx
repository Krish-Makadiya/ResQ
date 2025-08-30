import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import {
    Mail,
    MessageCircleMore,
    Phone,
    PhoneMissed,
    PhoneOutgoing,
    TriangleAlert,
} from "lucide-react";


const HaveCall = () => {
    const [vapi, setVapi] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState([]);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [transcript]);

    const apiKey="8dde8525-ed25-48c4-93bb-e84ab4183572" 
    const assistantId="f5bc50a9-14f9-4cbb-94b6-81fd59c45722"

    useEffect(() => {
        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);
        // Event listeners
        vapiInstance.on("call-start", () => {
            console.log("Call started");
            setIsConnected(true);
        });
        vapiInstance.on("call-end", () => {
            console.log("Call ended");
            setIsConnected(false);
            setIsSpeaking(false);
        });
        vapiInstance.on("speech-start", () => {
            console.log("Assistant started speaking");
            setIsSpeaking(true);
        });
        vapiInstance.on("speech-end", () => {
            console.log("Assistant stopped speaking");
            setIsSpeaking(false);
        });
        vapiInstance.on("message", (message) => {
            if (message.type === "transcript") {
                if (
                    message.type === "transcript" &&
                    message.transcriptType == "final"
                ) {
                    setTranscript((prev) => [
                        ...prev,
                        {
                            role: message.role,
                            text: message.transcript,
                        },
                    ]);
                }
            }
        });
        vapiInstance.on("error", (error) => {
            console.error("Vapi error:", error);
        });
        return () => {
            vapiInstance?.stop();
        };
    }, [apiKey]);

    const startCall = () => {
        if (vapi) {
            vapi.start(assistantId);
        }
    };
    const endCall = () => {
        if (vapi) {
            vapi.stop();
            setTranscript([]);
        }
    };

    return (
        <div
            className="min-h-screen"
            style={{
                transition: "background 0.2s",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <div className="w-full max-w-6xl mx-auto px-4 pt-12">
                {/* Page Header */}
                <h1 className="text-3xl font-bold mb-2 text-[#222] dark:text-white">
                    Customer Support
                </h1>
                <p className="text-[#666] dark:text-[#bbb] text-base mb-6 font-medium">
                    We’re here to help! You can talk to our AI assistant, or contact us directly through other channels.
                </p>

                {/* Alert */}
                <div
                    className="flex gap-3 items-start p-4 rounded-lg mb-8"
                    style={{
                        background: "#fefce8",
                        borderLeft: "5px solid #facc15",
                        color: "#b45309",
                        fontWeight: 500,
                        fontSize: 15,
                    }}
                >
                    <TriangleAlert size={26} style={{ marginTop: 2, color: "#b45309" }} />
                    <span>
                        <strong>Note:</strong> This is an AI-powered assistant. While it’s helpful for most queries, it may occasionally give incorrect or incomplete answers. For urgent or sensitive matters, please use our official contact channels below.
                    </span>
                </div>

                {/* Main Content */}
                <div className="flex justify-center gap-[2%] flex-wrap">
                    {/* Call Interface */}
                    <div
                        className="rounded-xl mb-8 flex flex-col items-center"
                        style={{
                            width: "49%",
                            minWidth: 320,
                            padding: "2rem 1.5rem",
                            transition: "background 0.2s",
                        }}
                    >
                        {!isConnected ? (
                            <button
                                className="flex gap-2 items-center font-semibold"
                                style={{
                                    background: "var(--wm-bg, #12A594)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 999,
                                    padding: "16px 32px",
                                    fontSize: 18,
                                    boxShadow: "0 2px 8px rgba(18,165,148,0.10)",
                                    transition: "background 0.2s",
                                }}
                                onClick={startCall}
                                onMouseOver={e => (e.currentTarget.style.background = "#0e7c6a")}
                                onMouseOut={e => (e.currentTarget.style.background = "#12A594")}
                            >
                                <PhoneOutgoing size={22} /> <span>Talk to Assistant</span>
                            </button>
                        ) : (
                            <div
                                className="rounded-xl"
                                style={{
                                    border: "1px solid #e1e5e9",
                                    width: "100%",
                                    maxWidth: 500,
                                    padding: 20,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                                }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            style={{
                                                background: isSpeaking ? "#ff4444" : "#12A594",
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                                marginRight: 4,
                                                animation: isSpeaking ? "pulse 1.2s infinite" : undefined,
                                            }}
                                        ></div>
                                        <span className="font-bold text-[#222] dark:text-white text-base">
                                            {isSpeaking ? "Assistant Speaking..." : "Listening..."}
                                        </span>
                                    </div>
                                    <button
                                        onClick={endCall}
                                        className="flex gap-2 items-center text-white border-none rounded-md px-3 py-1.5 text-xs cursor-pointer"
                                        style={{
                                            background: "#ff4444",
                                            fontWeight: 600,
                                        }}
                                    >
                                        <PhoneMissed />
                                        <span>End Call</span>
                                    </button>
                                </div>
                                <div
                                    ref={scrollRef}
                                    className="max-h-[200px] overflow-y-auto mb-3 p-2 rounded-lg"
                                    style={{
                                        color: "var(--wm-chat-text, #222)",
                                        border: "1px solid #e1e5e9",
                                        minHeight: 70,
                                        transition: "background 0.2s",
                                }}
                                >
                                    {transcript.length === 0 ? (
                                        <p className="text-[#666] dark:text-[#bbb] text-sm m-0">
                                            Conversation will appear here...
                                        </p>
                                    ) : (
                                        transcript.map((msg, i) => (
                                            <div
                                                key={i}
                                                className="mb-2 flex"
                                                style={{
                                                    justifyContent:
                                                        msg.role === "user" ? "flex-end" : "flex-start",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        background:
                                                            msg.role === "user"
                                                                ? "#12A594"
                                                                : (window.matchMedia &&
                                                                    window.matchMedia("(prefers-color-scheme: dark)").matches
                                                                    ? "#333"
                                                                    : "#e6e6e6"),
                                                        color:
                                                            msg.role === "user"
                                                                ? "#fff"
                                                                : (window.matchMedia &&
                                                                    window.matchMedia("(prefers-color-scheme: dark)").matches
                                                                    ? "#fff"
                                                                    : "#222"),
                                                        padding: "10px 18px",
                                                        borderRadius: 18,
                                                        fontSize: 15,
                                                        fontWeight: 500,
                                                        maxWidth: "80%",
                                                        display: "inline-block",
                                                        boxShadow:
                                                            msg.role === "user"
                                                                ? "0 2px 8px rgba(18,165,148,0.10)"
                                                                : "0 2px 8px rgba(51,51,51,0.06)",
                                                    }}
                                                >
                                                    {msg.text}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Other Contact Details */}
                    <div
                        className="rounded-xl"
                        style={{
                            width: "49%",
                            minWidth: 320,
                            padding: "2rem 1.5rem",
                            transition: "background 0.2s",
                        }}
                    >
                        <h2 className="text-xl font-bold mb-4 text-[#222] dark:text-white">
                            Other Ways to Contact Us
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex gap-2 items-center text-base text-[#222] dark:text-white">
                                <Phone size={20} /> Phone:{" "}
                                <a
                                    href="tel:+1800123456"
                                    className="font-semibold"
                                    style={{ color: "#12A594", marginLeft: 4, textDecoration: "none" }}
                                >
                                    +1 800 123 456
                                </a>
                            </li>
                            <li className="flex gap-2 items-center text-base text-[#222] dark:text-white">
                                <Mail size={20} /> Email:{" "}
                                <a
                                    href="mailto:support@example.com"
                                    className="font-semibold"
                                    style={{ color: "#12A594", marginLeft: 4, textDecoration: "none" }}
                                >
                                    support@example.com
                                </a>
                            </li>
                            <li className="flex gap-2 items-center text-base text-[#222] dark:text-white">
                                <MessageCircleMore size={20} />
                                <span>
                                    Live Chat:{" "}
                                    <span style={{ color: "#12A594", fontWeight: 600 }}>
                                        Available 9 AM – 6 PM
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Pulse animation for speaking indicator */}
            <style>
                {`
                @media (prefers-color-scheme: dark) {
                    :root {
                        --wm-bg: #23272f;
                        --wm-card: #23272f;
                        --wm-chat: #23272f;
                        --wm-chat-text: #fff;
                    }
                }
                @media (prefers-color-scheme: light) {
                    :root {
                        --wm-bg: #f8f9fa;
                        --wm-card: #fff;
                        --wm-chat: #f8f9fa;
                        --wm-chat-text: #222;
                    }
                }
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(255,68,68,0.15); }
                    70% { box-shadow: 0 0 0 8px rgba(255,68,68,0.10); }
                    100% { box-shadow: 0 0 0 0 rgba(255,68,68,0.15); }
                }
                `}
            </style>
        </div>
    );
}

export default HaveCall