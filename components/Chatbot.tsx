
import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/geminiService';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon, XMarkIcon, SparklesIcon } from './icons';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I\'m your Aveksana AI assistant. How can I help with your research today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Format history for Gemini API
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const responseText = await sendChatMessage(userMessage, history);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col border border-brand-light-grey mb-4 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-brand-dark-teal p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <SparklesIcon />
              <h3 className="font-bold">Aveksana Assistant</h3>
            </div>
            <button onClick={toggleChat} className="text-brand-light-gray-blue hover:text-white transition-colors">
              <XMarkIcon />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm shadow-sm ${msg.role === 'user' ? 'bg-brand-medium-teal text-white' : 'bg-white text-brand-dark-grey border border-brand-light-grey'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-brand-light-grey rounded-lg p-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-brand-grey rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-brand-grey rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-brand-grey rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-brand-light-grey">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-grow px-4 py-2 border border-brand-light-grey rounded-full focus:outline-none focus:border-brand-medium-teal focus:ring-1 focus:ring-brand-medium-teal text-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-brand-medium-teal text-white p-2 rounded-full hover:bg-brand-teal transition-colors disabled:bg-brand-light-grey disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="bg-brand-medium-teal hover:bg-brand-teal text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <XMarkIcon /> : <ChatBubbleLeftRightIcon />}
      </button>
    </div>
  );
};

export default Chatbot;
