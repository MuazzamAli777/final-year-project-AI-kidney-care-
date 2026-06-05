import { useState, useRef, useEffect } from "react";
import Header from "../homepagecomponets/header";
import conf from "../conf/conf.js";
import { div } from "@tensorflow/tfjs";

export default function Chatbot() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = conf.apikey;

  const keywords = [
    "kidney", "kideny", "gurda", "pathri", "stone",
    "dialysis", "renal", "urine", "cyst", "tumor"
  ];

  const isKidneyRelated = (msg) => {
    return keywords.some(k => msg.toLowerCase().includes(k));
  };

  // ✅ load chats
  useEffect(() => {
    const savedChats = localStorage.getItem("chatHistory");
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed);
      if (parsed.length > 0) setCurrentChatId(parsed[0].id);
    } else {
      createNewChat();
    }
  }, []);
const generateTitle = (text) => {
  return text.length > 25
    ? text.substring(0, 25) + "..."
    : text;
};
  // ✅ save chats
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chats));
    }
  }, [chats]);

  // ✅ scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatId]);

  // ✅ new chat
  const createNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: crypto.randomUUID(),
          text: "Assalam o Alaikum! Main aapki kaise madad kar sakta hoon?",
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const deleteChat = (chatId) => {
    const updated = chats.filter(c => c.id !== chatId);
    setChats(updated);

    if (currentChatId === chatId) {
      updated.length ? setCurrentChatId(updated[0].id) : createNewChat();
    }
  };

  const getCurrentChat = () =>
    chats.find(c => c.id === currentChatId);

  // ✅ retry function (FIXED)
  const fetchWithRetry = async (body, retries = 2) => {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("API error");

      return await res.json();

    } catch (err) {
      if (retries > 0) {
        await new Promise(r => setTimeout(r, 1000));
        return fetchWithRetry(body, retries - 1);
      }
      throw err;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !currentChatId || loading) return;

    const userText = inputValue;
    setLoading(true);

    const userMessage = {
      id: crypto.randomUUID(),
      text: userText,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    // ✅ add user msg
    setChats(prev =>
  prev.map(chat => {
    if (chat.id === currentChatId) {
      const isFirstMessage = chat.messages.length === 1; 
      // because 1 bot welcome message already exists

      return {
        ...chat,
        title: isFirstMessage ? generateTitle(userText) : chat.title,
        messages: [...chat.messages, userMessage],
      };
    }
    return chat;
  })
);

    setInputValue("");

    // ❌ kidney filter
    if (!isKidneyRelated(userText)) {
      const botMessage = {
        id: crypto.randomUUID(),
        text: "❌ Sirf kidney related sawalat allowed hain.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      setChats(prev =>
        prev.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, botMessage] }
            : chat
        )
      );

      setLoading(false);
      return;
    }

    try {
      const data = await fetchWithRetry({
        contents: [
          {
            parts: [
              {
                text: `You are a professional medical AI assistant.

STRICT OUTPUT FORMAT RULES:
- Use clear section headings ONLY
- Each section must start on a new line
- Add one blank line between sections
- No markdown (** ### --- are NOT allowed)
- Keep text simple and structured
- Do NOT write long paragraphs
- Maximum 8–12 lines total

LANGUAGE RULE:
- Respond ONLY in the same language as the user's question
- If user writes in Roman Urdu → reply in Roman Urdu only
- If user writes in English → reply in English only
- Do NOT mix languages

OUTPUT FORMAT MUST BE EXACTLY LIKE THIS:

Overview:
Kidney is a vital organ...

Key Points:
• Point 1
• Point 2
• Point 3

Summary:
Short final explanation...


User: ${userText}`,
              },
            ],
          },
        ],
      });

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response";

      const botMessage = {
        id: crypto.randomUUID(),
        text: reply,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      setChats(prev =>
        prev.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, botMessage] }
            : chat
        )
      );

    } catch {
      const errorMessage = {
        id: crypto.randomUUID(),
        text: "⚠️ Server busy, dobara try karein.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      setChats(prev =>
        prev.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat
        )
      );
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentChat = getCurrentChat();


  return (
    <>
      <Header />
      <div className=" h-screen size-full flex bg-gray-100 fixed top-13">
<div className="flex h-screen">
        <div
          className={`${sidebarOpen ? "w-64" : "w-0"
            } transition-all duration-300 border-r bg-white border-gray-200 flex flex-col overflow-hidden`}
        >
          <div className="p-1.5 border-b bg-gradient-to-br from-blue-600 to-purple-600 ">
            <button
              onClick={createNewChat}
              className="w-full flex items-center justify-center gap-2 rounded-lg  bg-gradient-to-br from-blue-600 to-purple-600 px-4 py-3 text-sm text-gray-100 hover:bg-blue-50 transition"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center gap-2 rounded-lg px-3 py-2.5 cursor-pointer transition ${currentChatId === chat.id
                    ? " bg-blue-100"
                    : " hover:bg-blue-100"
                  }`}
                onClick={() => setCurrentChatId(chat.id)}
              >
                <svg
                  className="size-4 shrink-0 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span className="flex-1 truncate text-sm text-gray-700">
                  {chat.title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition"
                >
                  <svg
                    className="size-4 text-neutral-400 hover:text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        </div>

        <div className="flex-1 flex flex-col">
          <header className="border-b bg-white border-gray-200 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-neutral-400 hover:text-gray-800 transition"
            >
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
                <svg
                  className="size-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-lg">AI Chatbot</h2>
                <p className="text-sm text-gray-500">
                  Har waqt aapki khidmat mein
                </p>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-100 ">
            <div className="w-full space-y-4">
              {currentChat?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                >
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${message.sender === "bot"
                        ? "bg-gradient-to-br from-blue-600 to-purple-600"
                        : "bg-gradient-to-br from-green-600 to-teal-600"
                      }`}
                  >
                    {message.sender === "bot" ? (
                      <svg
                        className="size-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="size-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 mb-7 sm:max-w-[75%]  sm:mb-7 ${message.sender === "user"
                        ? "bg-white text-gray-800 shadow"
                        : " bg-blue-300 text-gray-1000 shadow"
                      }`}
                  >
                    <p className="text-[15px] m leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <p className="mt-1.5 text-xs opacity-50">
                      {new Date(message.timestamp).toLocaleTimeString("ur-PK", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
              <div className="">
                <p className="text-sm text-gray-500 mb-16 animate-pulse">
                  Typing...
                </p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
{/* //border-t */}
          <div className=" bg-transparent px-4 py-4 sticky bottom-0">
            <div className="mx-auto max-w-3xl">
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Apna message yahan type karein..."
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-black placeholder-neutral-500 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}