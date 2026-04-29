"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there. I'm the Hisenbug automation assistant. How can we help streamline your operations today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: "Thanks for reaching out. A human automation strategist will review your request and get back to you shortly." }
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-[400px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-3xl z-50 flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right ${
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center bg-white border-b border-slate/5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 bg-off-white rounded-full flex items-center justify-center shadow-sm overflow-hidden border border-slate/5">
              <Image src="/logo.png" alt="Hisenbug Logo" fill className="object-contain p-2 grayscale" sizes="40px" />
            </div>
            <div>
              <h3 className="font-medium text-navy text-sm">Hisenbug Systems</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-slate font-medium">Active Assistant</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-off-white flex items-center justify-center text-slate hover:text-navy hover:bg-slate/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-[380px] overflow-y-auto px-6 py-6 bg-[#FAFBFC] flex flex-col gap-6 relative">
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#FAFBFC] to-transparent pointer-events-none"></div>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-2xl rounded-br-sm' 
                    : 'bg-white text-navy rounded-2xl rounded-bl-sm border border-slate/5'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} className="h-1"></div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate/5">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about automations..."
              className="w-full bg-[#FAFBFC] border border-slate/10 rounded-full pl-6 pr-14 py-3.5 text-sm text-navy focus:outline-none focus:border-primary/30 transition-colors shadow-inner"
            />
            <button 
              type="submit"
              className="absolute right-2 w-10 h-10 bg-primary text-white rounded-full hover:bg-navy transition-colors flex items-center justify-center shadow-md disabled:opacity-50 disabled:hover:bg-primary"
              disabled={!input.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-x-[-1px] translate-y-[1px]"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-navy text-white rounded-full shadow-[0_10px_40px_-10px_rgba(2,6,23,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(2,6,23,0.6)] hover:-translate-y-1 hover:bg-primary transition-all duration-400 flex items-center justify-center z-50"
        aria-label="Toggle Chat"
      >
        <div className={`absolute transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div className={`absolute transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
      </button>
    </>
  );
}
