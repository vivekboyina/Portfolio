import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  Key,
  Trash2,
  Check,
  ChevronDown,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

// System prompt grounding the assistant in Vivek's portfolio context
const SYSTEM_INSTRUCTION = `
You are ViBo, the AI Ambassador for Boyina Veera Venkata Vivek.
Answer questions concisely, professionally, and accurately using this official context:
- Name: Boyina Veera Venkata Vivek (goes by Vivek)
- Status: B.Tech Computer Science student at Aditya Engineering College (CGPA 8.24, 2022-2026).
- Opportunity: Open for SDE Internships 2026.
- LeetCode: Top 14% globally, 750+ problems solved, 1720 peak contest rating. Proficient in Graphs, Dynamic Programming, Trees, Greedy algorithms.
- Core Languages: Java, C++, JavaScript, SQL.
- Web & Frameworks: React, Tailwind CSS, Vite, REST APIs, HTML5, CSS3.
- Core CS: Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Operating Systems.
- Featured Projects:
  1. Student Management System: Robust Java console application with clean MVC layering, persistent file handling, multi-threading, and CRUD operations.
  2. GitHub Profile Finder: High-performance React web application with live GitHub REST API integration, repository metrics, and sleek monochrome UI.
- Internships:
  1. Full Stack Web Development Intern at Brainovision (React, Node.js, RESTful APIs).
  2. Java Development Intern at CodSoft (Core Java, OOP, Collections Framework).
- Honors & Scholarships: ATF Scholarship Awardee (Top 100 of 10,000+ pan-India applicants), 2-Star CodeChef (1400+ peak rating), 5-Star HackerRank (C++ & SQL).
- Contact: Email: vivekboyina77@gmail.com | Phone: 8106464623 | GitHub: github.com/vivekboyina | LeetCode: leetcode.com/u/vivekboyina.

Keep responses concise, informative, and engaging.
`;

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: "Hi! I'm ViBo, Vivek's AI Assistant powered by Gemini. Ask me anything about his projects, LeetCode accomplishments, technical stack, or availability for SDE internships!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Speech Recognition Setup (Web Speech API)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Text to Speech playback
  const speakText = (text: string) => {
    if (!isVoiceOutputEnabled || typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  // Local fallback response engine when no API key is configured
  const getContextualResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('project') || q.includes('student') || q.includes('github finder')) {
      return `Vivek has engineered standout projects:
1. Student Management System: A Java console app implementing clean MVC architecture, multi-threading, and persistent data storage.
2. GitHub Profile Finder: A sleek React + Tailwind application with dynamic GitHub REST API searching, real-time repository stats, and zero external UI libraries.`;
    }

    if (q.includes('leetcode') || q.includes('dsa') || q.includes('algorithm') || q.includes('coding')) {
      return `Vivek is in the Top 14% on LeetCode with over 750 algorithmic problems solved and a peak contest rating of 1720. He has deep expertise in Dynamic Programming, Graphs, Binary Trees, and Greedy algorithms.`;
    }

    if (q.includes('skill') || q.includes('language') || q.includes('tech stack') || q.includes('tool')) {
      return `Vivek's core technical stack includes:
• Languages: Java (strong OOP), C++, JavaScript (ES6+), SQL.
• Web: React, Tailwind CSS, Vite, REST APIs, Framer Motion.
• CS Fundamentals: Data Structures & Algorithms, DBMS, Operating Systems, OOP.
• Tools: Git, GitHub, VS Code, IntelliJ IDEA.`;
    }

    if (q.includes('intern') || q.includes('experience') || q.includes('work') || q.includes('job')) {
      return `Vivek has completed practical software internships:
1. Brainovision: Full Stack Web Development Intern working with React, Node.js, and RESTful APIs.
2. CodSoft: Java Development Intern building core Java applications using OOP principles and Collections.
He is actively seeking SDE Internships for 2026!`;
    }

    if (q.includes('education') || q.includes('college') || q.includes('cgpa') || q.includes('gpa')) {
      return `Vivek is pursuing his B.Tech in Computer Science and Engineering at Aditya Engineering College (2022 - 2026) with an 8.24 CGPA. Prior to this, he scored 96.5% in Intermediate and 9.7 GPA in School.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach')) {
      return `You can connect with Vivek directly:
• Email: vivekboyina77@gmail.com
• Phone: +91 8106464623
• LinkedIn: linkedin.com/in/vivek-boyina
• GitHub: github.com/vivekboyina`;
    }

    if (q.includes('scholarship') || q.includes('award') || q.includes('achievement') || q.includes('atf')) {
      return `Vivek was selected for the prestigious Amazon Future Engineer / ATF Scholarship, ranking in the Top 100 out of 10,000+ applicants nationwide. He is also a 2-Star Coder on CodeChef (1400+ rating) and 5-Star on HackerRank in C++ and SQL.`;
    }

    return `Boyina Veera Venkata Vivek is a Computer Science engineer specializing in Java, React, and Data Structures & Algorithms (Top 14% LeetCode, 750+ solved). He is open to SDE Internships in 2026. What specific area of his work would you like to explore?`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const activeKey = apiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

      if (activeKey) {
        // Direct call to Gemini 1.5 Flash via REST API
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nUser Question: ${text}` }],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 350,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Gemini API call failed');
        }

        const data = await response.json();
        const replyText =
          data.candidates?.[0]?.content?.parts?.[0]?.text || getContextualResponse(text);

        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botMsg]);
        speakText(replyText);
      } else {
        // High-fidelity local context engine
        await new Promise((r) => setTimeout(r, 600));
        const replyText = getContextualResponse(text);

        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botMsg]);
        speakText(replyText);
      }
    } catch (err) {
      // Graceful fallback to context engine on any network or key errors
      const fallbackReply = getContextualResponse(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      speakText(fallbackReply);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    const trimmed = tempApiKey.trim();
    setApiKey(trimmed);
    localStorage.setItem('gemini_api_key', trimmed);
    setShowKeyInput(false);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'init-re',
        sender: 'bot',
        text: 'Chat cleared. How can I assist you with Vivek’s background or technical portfolio?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const quickPrompts = [
    'Tell me about Vivek’s projects',
    'What is his LeetCode ranking?',
    'What are his strongest skills?',
    'Is he open for internships?',
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Open ViBo AI Chatbot"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-white text-black font-semibold text-xs font-mono tracking-wider uppercase shadow-[0_8px_30px_rgba(255,255,255,0.25)] hover:bg-white/90 transition-all cursor-pointer border border-white"
        >
          <Sparkles className="w-4 h-4 text-black animate-pulse" />
          <span>Ask ViBo</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </motion.button>
      </div>

      {/* Chat Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[80vh] rounded-3xl bg-black/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl border border-white/20 bg-white/10 text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-hero text-sm font-bold text-white tracking-tight">
                      ViBo
                    </h3>
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-semibold">
                      • ONLINE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50 block">
                    Powered by Gemini & Portfolio Context
                  </span>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Voice Output Toggle */}
                <button
                  onClick={() => setIsVoiceOutputEnabled(!isVoiceOutputEnabled)}
                  type="button"
                  title={isVoiceOutputEnabled ? 'Voice output enabled' : 'Voice output muted'}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isVoiceOutputEnabled
                      ? 'border-white/50 text-white bg-white/10'
                      : 'border-white/10 text-white/40 hover:text-white'
                  }`}
                >
                  {isVoiceOutputEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* API Key Modal Toggle */}
                <button
                  onClick={() => setShowKeyInput(!showKeyInput)}
                  type="button"
                  title="Configure Gemini API Key"
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    apiKey
                      ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
                      : 'border-white/10 text-white/40 hover:text-white'
                  }`}
                >
                  <Key className="w-3.5 h-3.5" />
                </button>

                {/* Clear Chat */}
                <button
                  onClick={clearChat}
                  type="button"
                  title="Clear chat"
                  className="p-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Close Drawer */}
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="p-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Optional Gemini API Key Drawer */}
            {showKeyInput && (
              <div className="p-3 bg-white/[0.05] border-b border-white/10 flex flex-col gap-2">
                <div className="text-[11px] font-mono text-white/70 flex items-center justify-between">
                  <span>Custom Gemini API Key (Optional)</span>
                  <span className="text-[10px] text-emerald-400">
                    {apiKey ? 'Active' : 'Using Local Engine'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    className="flex-1 bg-black/60 border border-white/20 rounded-lg px-2.5 py-1 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-white"
                  />
                  <button
                    onClick={handleSaveApiKey}
                    type="button"
                    className="px-3 py-1 rounded-lg bg-white text-black font-mono text-xs font-bold hover:bg-white/90 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-white text-black font-medium rounded-tr-none'
                        : 'bg-white/[0.06] text-white/90 border border-white/15 rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-mono text-white/30 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-white/60 text-xs font-mono p-3 bg-white/[0.04] rounded-2xl max-w-[80%] border border-white/10">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span>Gemini is thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  type="button"
                  className="whitespace-nowrap px-2.5 py-1 rounded-full border border-white/15 hover:border-white/40 bg-white/[0.03] text-[11px] font-mono text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input & Voice Controls Footer */}
            <div className="p-3 border-t border-white/10 bg-black flex items-center gap-2">
              {/* Voice Input Microphone Button */}
              <button
                onClick={toggleListening}
                type="button"
                title={isListening ? 'Stop listening' : 'Speak your question'}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isListening
                    ? 'border-red-500 bg-red-500/20 text-red-400 animate-pulse'
                    : 'border-white/20 text-white/70 hover:border-white hover:text-white bg-white/[0.04]'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Text Input */}
              <input
                type="text"
                placeholder={isListening ? 'Listening to voice...' : 'Ask about Vivek...'}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                className="flex-1 bg-white/[0.04] border border-white/15 focus:border-white/60 rounded-full px-4 py-2 text-xs sm:text-sm text-white placeholder-white/35 focus:outline-none transition-colors"
              />

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                type="button"
                className="p-2.5 rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-[0_0_12px_rgba(255,255,255,0.2)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GeminiChatbot;
