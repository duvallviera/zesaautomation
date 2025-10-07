import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage } from '../../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your ZESA AI Assistant. I can help you with photography services, portfolio exploration, booking sessions, and answering any questions about our work. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI service call)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        role: 'assistant',
        timestamp: new Date(),
        metadata: {
          intent: 'general_inquiry',
          confidence: 0.95,
          suggestions: ['View Portfolio', 'Book Session', 'Get Quote']
        }
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('portfolio') || input.includes('photos') || input.includes('gallery')) {
      return "I'd be happy to show you our portfolio! We specialize in portrait, documentary, movement, and motion photography. You can explore our work by category or browse all collections. Would you like to see a specific type of photography?";
    }
    
    if (input.includes('booking') || input.includes('schedule') || input.includes('appointment')) {
      return "Great! I can help you book a photography session. We offer portrait sessions, event photography, commercial work, and documentary projects. What type of session are you interested in? I can check availability and provide pricing information.";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return "Our pricing varies based on the type of session and requirements. Portrait sessions start at $200, event photography from $500, and commercial work from $800. I can provide a detailed quote based on your specific needs. What type of photography service are you looking for?";
    }
    
    if (input.includes('contact') || input.includes('phone') || input.includes('email')) {
      return "You can reach us at info@mateoseza.com or call us directly. I can also help you schedule a consultation call to discuss your photography needs in detail. Would you like me to help you get in touch?";
    }
    
    if (input.includes('about') || input.includes('who') || input.includes('background')) {
      return "Mateo Serna Zapata is a professional photographer with a focus on 'Human First & Foremost' approach. We specialize in capturing authentic moments and creating meaningful visual stories. Our work spans portrait, documentary, movement, and motion photography.";
    }
    
    return "Thank you for your question! I'm here to help with all aspects of our photography services. I can assist with portfolio exploration, booking sessions, pricing information, or answer any other questions you might have. What would you like to know more about?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    'Show me your portfolio',
    'I want to book a session',
    'What are your prices?',
    'Tell me about your services',
    'How do I contact you?'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card h-[600px] flex flex-col p-0">
        {/* Chat Header */}
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-lg">ZESA AI Assistant</h2>
            <p className="text-sm text-gray-500">Online • Ready to help</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-primary-500' 
                    : 'bg-gray-100'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className={`rounded-xl px-5 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.metadata?.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.metadata.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full hover:bg-opacity-30 transition-colors"
                          onClick={() => setInputMessage(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="p-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Quick actions:</p>
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(action)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 input-field"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
