import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, MessageCircle, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const IceBreakerChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 I'm your friendly chat buddy! I'm here to talk with you and help you feel comfortable. What would you like to talk about today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakMessage = (messageId: string, text: string) => {
    // Stop any currently playing speech
    window.speechSynthesis.cancel();

    if (speakingMessageId === messageId) {
      // If clicking the same message, stop speaking
      setSpeakingMessageId(null);
      return;
    }

    // Remove emojis and clean text for better speech
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}]/gu, '')
                          .replace(/[\u{1F300}-\u{1F5FF}]/gu, '')
                          .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
                          .replace(/[\u{2600}-\u{26FF}]/gu, '')
                          .replace(/[\u{2700}-\u{27BF}]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1.1; // Slightly higher pitch for friendliness
    utterance.volume = 1.0;

    // Try to use a child-friendly voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Female') ||
      voice.name.includes('Samantha')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setSpeakingMessageId(messageId);
    };

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeakingMessageId(null);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call AI API
      const response = await fetch('https://brainwaveapi.teamuxh.site/api/ondemand/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: 'ice_breaker',
        }),
      });

      const data = await response.json();
      
      setIsTyping(false);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "That's interesting! Tell me more about that! 😊",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);

      // Fallback responses for offline/error
      const fallbackResponses = [
        "That's really cool! Can you tell me more? 😊",
        "I love hearing about that! What else do you like?",
        "You're doing great at sharing! What makes you happy?",
        "That sounds fun! Do you have a favorite color?",
        "Thanks for sharing! What do you like to do for fun?",
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = [
    "What's your name?",
    "I like animals 🐶",
    "Tell me a joke",
    "I'm feeling happy 😊",
    "What can we talk about?",
  ];

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1C1E] via-[#000000] to-[#1C1C1E] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/5 to-[#0A84FF]/5" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BF5AF2]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0A84FF]/10 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-[#3A3A3C] backdrop-blur-sm bg-[#2C2C2E]/80">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/child-interface')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2C2C2E] border border-[#3A3A3C] text-white hover:bg-[#3A3A3C] transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-[#BF5AF2]" />
            <div>
              <h1 className="text-lg font-bold text-white">Ice Breaker Chat</h1>
              <p className="text-xs text-[#8E8E93]">Let's talk and have fun!</p>
            </div>
          </div>

          {speakingMessageId && (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 transition-all duration-300"
            >
              <VolumeX className="w-4 h-4" />
              <span className="text-sm font-medium">Stop</span>
            </button>
          )}
        </div>
      </header>

      {/* Chat Container */}
      <main className="relative z-10 container mx-auto px-6 py-6 h-[calc(100vh-140px)]">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-[#3A3A3C] scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start gap-2 max-w-[70%]">
                  {message.sender === 'bot' && (
                    <button
                      onClick={() => speakMessage(message.id, message.text)}
                      className={`mt-2 p-2 rounded-lg transition-all duration-300 ${
                        speakingMessageId === message.id
                          ? 'bg-[#30D158] hover:bg-[#30D158]/80'
                          : 'bg-[#3A3A3C] hover:bg-[#48484A]'
                      }`}
                      aria-label={speakingMessageId === message.id ? 'Stop speaking' : 'Read message aloud'}
                    >
                      {speakingMessageId === message.id ? (
                        <VolumeX className="w-4 h-4 text-white" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                  )}
                  <div
                    className={`p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#BF5AF2] to-[#0A84FF] text-white'
                        : 'bg-[#2C2C2E] border border-[#3A3A3C] text-white'
                    }`}
                  >
                    <p className="text-sm md:text-base">{message.text}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#2C2C2E] border border-[#3A3A3C] p-4 rounded-2xl">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#BF5AF2] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-[#BF5AF2] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-[#BF5AF2] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#FFD60A]" />
                <p className="text-xs text-[#8E8E93]">Quick replies:</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-2 rounded-xl bg-[#2C2C2E] border border-[#3A3A3C] text-white text-sm hover:bg-[#3A3A3C] hover:border-[#BF5AF2] transition-all duration-300"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="bg-[#2C2C2E]/80 backdrop-blur-sm border border-[#3A3A3C] rounded-2xl p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 bg-[#1C1C1E] border border-[#3A3A3C] rounded-xl px-4 py-3 text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#BF5AF2] transition-all duration-300"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#BF5AF2] to-[#0A84FF] text-white font-medium hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IceBreakerChat;
