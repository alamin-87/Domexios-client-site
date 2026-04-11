import React, { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaBrain,
  FaSpinner,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hello! I'm **Domexis AI** 🏢 — your intelligent property assistant. Ask me about available apartments, amenities, rent, coupons, or anything about Domexis living!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const axiosInstance = useAxios();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Build chat history for context (exclude the initial greeting)
      const history = messages
        .slice(1)
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          content: m.content,
        }));

      const res = await axiosInstance.post("/ai/chat", {
        message: trimmed,
        history: history,
      });

      const botReply = res.data.reply || "Sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "I'm having trouble connecting right now. Please try again or visit our [Support](/support) page.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Simple markdown-like bold rendering
  const renderContent = (text) => {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-black">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const quickQuestions = [
    "Show available apartments",
    "What amenities do you offer?",
    "Any active coupons?",
    "How do I rent a unit?",
  ];

  return (
    <>
      {/* Floating Button */}
      <Motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[999] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-slate-800 hover:bg-slate-700 shadow-slate-300"
            : "bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-300"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <Motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FaTimes className="text-white text-xl" />
            </Motion.div>
          ) : (
            <Motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <FaBrain className="text-white text-xl" />
            </Motion.div>
          )}
        </AnimatePresence>

        {/* Notification Pulse */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
          </span>
        )}
      </Motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-28 right-6 z-[998] w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-10rem)] bg-white rounded-[2rem] shadow-2xl shadow-slate-300/50 border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 flex items-center gap-4 flex-shrink-0">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaRobot className="text-white text-lg" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-black text-sm leading-none">
                  Domexis AI
                </h4>
                <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-widest">
                  {isTyping ? "Thinking..." : "Online • Instant Replies"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-white transition-colors p-1"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-slate-50/50">
              {messages.map((msg, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "bot" && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FaRobot className="text-white text-xs" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-md font-medium"
                        : "bg-white text-slate-700 rounded-bl-md border border-slate-100 shadow-sm"
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <FaUser className="text-slate-500 text-xs" />
                    </div>
                  )}
                </Motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <Motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 items-start"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FaRobot className="text-white text-xs" />
                  </div>
                  <div className="bg-white text-slate-400 px-4 py-3 rounded-2xl rounded-bl-md border border-slate-100 shadow-sm flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </Motion.div>
              )}

              {/* Quick Questions (show only when conversation is fresh) */}
              {messages.length === 1 && !isTyping && (
                <div className="pt-2 space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    Quick Questions
                  </p>
                  {quickQuestions.map((q, i) => (
                    <Motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      onClick={() => {
                        setInput(q);
                        setTimeout(() => {
                          setInput(q);
                          const fakeEvent = { key: "Enter", shiftKey: false, preventDefault: () => {} };
                          // Directly trigger send
                          const userMessage = { role: "user", content: q };
                          setMessages((prev) => [...prev, userMessage]);
                          setIsTyping(true);
                          axiosInstance
                            .post("/ai/chat", { message: q, history: [] })
                            .then((res) => {
                              setMessages((prev) => [
                                ...prev,
                                { role: "bot", content: res.data.reply },
                              ]);
                            })
                            .catch(() => {
                              setMessages((prev) => [
                                ...prev,
                                {
                                  role: "bot",
                                  content: "Sorry, I couldn't process that right now.",
                                },
                              ]);
                            })
                            .finally(() => setIsTyping(false));
                          setInput("");
                        }, 50);
                      }}
                      className="w-full text-left px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600 transition-all duration-200 shadow-sm"
                    >
                      {q}
                    </Motion.button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-100 bg-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about apartments, amenities..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-3.5 bg-slate-50 rounded-xl border border-transparent focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none text-sm font-medium placeholder:text-slate-300 transition-all disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:hover:bg-blue-600 active:scale-95 shadow-lg shadow-blue-200"
                >
                  {isTyping ? (
                    <FaSpinner className="animate-spin text-sm" />
                  ) : (
                    <FaPaperPlane className="text-sm" />
                  )}
                </button>
              </div>
              <p className="text-center text-[9px] font-bold text-slate-300 mt-2 uppercase tracking-widest">
                Powered by Gemini AI
              </p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
