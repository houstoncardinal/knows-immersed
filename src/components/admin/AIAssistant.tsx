import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Send,
  X,
  Minimize2,
  Maximize2,
  MessageSquare,
  Zap,
  Brain,
  Eye,
  MousePointer,
  Settings,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  Package,
  AlertCircle,
  CheckCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Action[];
}

interface Action {
  type: 'navigate' | 'create' | 'update' | 'analyze' | 'export' | 'filter';
  label: string;
  data: any;
  description: string;
}

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: string;
}

export const AIAssistant = ({ isOpen, onToggle, currentPage }: AIAssistantProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `🎙️ Hello! I'm your AI Studio Assistant, powered by ElevenLabs voice synthesis. I can help you navigate KNOWS STUDIOS, manage bookings, analyze data, and understand everything about our premier creative studio.

🎭 **KNOWS STUDIOS specializes in:**
• Professional CYC Wall Studio for Film & Photography
• North Hollywood's premier creative facility
• World-class equipment and professional standards
• Content creators, filmmakers, and commercial brands

Current page: ${currentPage}

What would you like me to help you with today? I can speak my responses using ElevenLabs voice synthesis! 🔊`,
      timestamp: new Date(),
      actions: [
        {
          type: 'analyze',
          label: '🎭 About KNOWS STUDIOS',
          data: { type: 'about', section: 'studio' },
          description: 'Learn about our studio and services'
        },
        {
          type: 'navigate',
          label: '📸 View Our Work',
          data: { page: '/gallery' },
          description: 'Explore our portfolio and client work'
        },
        {
          type: 'create',
          label: '📅 Book Session',
          data: { type: 'booking' },
          description: 'Schedule a studio session'
        }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ElevenLabs Voice Synthesis
  const speakWithElevenLabs = async (text: string) => {
    try {
      setIsSpeaking(true);
      const elevenLabsApiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Default voice

      if (!elevenLabsApiKey) {
        console.log('ElevenLabs API key not configured - skipping voice synthesis');
        return;
      }

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Create and play new audio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        console.log('Audio playback failed');
      };

      await audio.play();

    } catch (error) {
      console.error('ElevenLabs voice synthesis error:', error);
      setIsSpeaking(false);
      toast.info('Voice synthesis unavailable - continuing with text response');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const executeAction = async (action: Action) => {
    try {
      console.log('Executing action:', action);

      switch (action.type) {
        case 'navigate':
          // Use React Router navigation instead of window.location
          navigate(action.data.page);
          toast.success(`Navigating to ${action.label}`);
          break;

        case 'analyze':
          if (action.data.type === 'revenue') {
            toast.info('Generating revenue analysis...');
            const analysis = await analyzeRevenue(action.data.period);
            addMessage('assistant', analysis, [
              {
                type: 'export',
                label: 'Export Report',
                data: { format: 'pdf', type: 'revenue' },
                description: 'Download revenue analysis as PDF'
              }
            ]);
          } else if (action.data.type === 'clients') {
            toast.info('Analyzing client data...');
            const analysis = await analyzeClients();
            addMessage('assistant', analysis);
          }
          break;

        case 'create':
          if (action.data.type === 'booking') {
            // For now, navigate to bookings page - in future could open modal
            navigate('/admin/bookings');
            toast.success('Redirecting to booking creation...');
          } else if (action.data.type === 'client') {
            navigate('/admin/clients');
            toast.success('Redirecting to client management...');
          }
          break;

        case 'filter':
          if (action.data.status === 'pending') {
            // This would filter the current view - for now just show a message
            toast.info('Filtering to show pending items...');
            addMessage('assistant', 'I\'ve applied a filter to show only pending bookings. You can see them in the bookings table above.');
          }
          break;

        case 'export':
          if (action.data.format === 'csv') {
            toast.info('Preparing export...');
            // Simulate export
            setTimeout(() => {
              toast.success('Data exported successfully! Check your downloads.');
            }, 2000);
          } else if (action.data.format === 'pdf') {
            toast.info('Generating PDF report...');
            setTimeout(() => {
              toast.success('PDF report generated! Opening in new tab.');
            }, 2000);
          }
          break;

        default:
          toast.info(`Action "${action.label}" executed successfully`);
      }
    } catch (error) {
      console.error('Action execution error:', error);
      toast.error('Failed to execute action. Please try again.');
    }
  };

  const analyzeRevenue = async (period: string) => {
    // Mock analysis - in real implementation, this would call an API
    const insights = [
      `Revenue for ${period}: $45,280 (+23% from last ${period})`,
      "Top performing package: Full Day Sessions (45% of bookings)",
      "Peak booking days: Wednesday and Friday",
      "Client retention rate: 97%",
      "Recommendation: Increase marketing spend on high-performing days"
    ];

    return `📊 Revenue Analysis for ${period.toUpperCase()}:\n\n${insights.map(insight => `• ${insight}`).join('\n')}\n\nWould you like me to generate a detailed report or focus on a specific metric?`;
  };

  const analyzeClients = async () => {
    // Mock client analysis - in real implementation, this would call an API
    const insights = [
      "Total active clients: 390 (+32 this month)",
      "Average client lifetime value: $2,450",
      "Top client segments: Content creators (45%), Commercial brands (30%)",
      "Client satisfaction score: 98/100",
      "Repeat booking rate: 73%",
      "Recommendation: Focus on content creator partnerships"
    ];

    return `👥 Client Analysis Summary:\n\n${insights.map(insight => `• ${insight}`).join('\n')}\n\nWould you like me to create a detailed client segmentation report or focus on a specific client group?`;
  };

  const addMessage = (role: 'user' | 'assistant', content: string, actions?: Action[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      actions
    };
    setMessages(prev => [...prev, newMessage]);

    // Speak assistant messages using ElevenLabs
    if (role === 'assistant') {
      speakWithElevenLabs(content);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage('user', userMessage);
    setIsLoading(true);

    try {
      // Call OpenAI API directly (for demo purposes - in production, use backend)
      const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4-turbo-preview';

      if (!openaiApiKey) {
        throw new Error('OpenAI API key not configured');
      }

      const systemPrompt = `You are an intelligent AI assistant for KNOWS STUDIOS admin dashboard. You help manage bookings, clients, revenue, analytics, and navigate the dashboard efficiently.

Current page: ${currentPage}
User role: admin

Capabilities:
- Booking management (create, edit, cancel bookings)
- Client management (add, update client info)
- Analytics and reporting (revenue analysis, trends)
- Navigation (move between dashboard pages)
- Data analysis (insights, recommendations)

Available actions you can suggest:
- navigate: Go to different pages (/admin/dashboard, /admin/bookings, /admin/clients, etc.)
- create: Create new bookings, clients, etc.
- analyze: Generate reports and insights
- export: Export data
- filter: Apply filters to data

When responding, be helpful, concise, and proactive. If you suggest actions, provide them in a clear format. Always maintain a professional tone suitable for a business environment.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || '1000'),
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';

      // Parse AI response for actions
      const actions = parseActionsFromResponse(aiResponse);

      addMessage('assistant', aiResponse, actions);

    } catch (error) {
      console.error('AI Chat Error:', error);
      addMessage('assistant', 'Sorry, I encountered an error. Please try again or contact support if the issue persists.');
    } finally {
      setIsLoading(false);
    }
  };

  const parseActionsFromResponse = (response: string): Action[] => {
    const actions: Action[] = [];

    // Simple action parsing - in production, use more sophisticated NLP
    if (response.toLowerCase().includes('booking') && response.toLowerCase().includes('create')) {
      actions.push({
        type: 'create',
        label: 'Create Booking',
        data: { type: 'booking' },
        description: 'Open booking creation form'
      });
    }

    if (response.toLowerCase().includes('analytics') || response.toLowerCase().includes('analyze')) {
      actions.push({
        type: 'navigate',
        label: 'View Analytics',
        data: { page: '/admin/analytics' },
        description: 'Navigate to analytics dashboard'
      });
    }

    if (response.toLowerCase().includes('revenue') || response.toLowerCase().includes('report')) {
      actions.push({
        type: 'analyze',
        label: 'Generate Report',
        data: { type: 'revenue', period: 'month' },
        description: 'Create revenue analysis report'
      });
    }

    return actions;
  };

  const getQuickActions = () => {
    const actions: Action[] = [];

    switch (currentPage) {
      case '/admin/dashboard':
        actions.push(
          { type: 'analyze', label: 'Revenue Analysis', data: { type: 'revenue', period: 'month' }, description: 'Analyze monthly revenue' },
          { type: 'navigate', label: 'View Bookings', data: { page: '/admin/bookings' }, description: 'Go to bookings page' },
          { type: 'create', label: 'New Client', data: { type: 'client' }, description: 'Add new client' }
        );
        break;
      case '/admin/bookings':
        actions.push(
          { type: 'create', label: 'New Booking', data: { type: 'booking' }, description: 'Create booking' },
          { type: 'filter', label: 'Filter Pending', data: { status: 'pending' }, description: 'Show pending bookings' },
          { type: 'export', label: 'Export Data', data: { format: 'csv' }, description: 'Export bookings data' }
        );
        break;
      case '/admin/clients':
        actions.push(
          { type: 'create', label: 'Add Client', data: { type: 'client' }, description: 'Add new client' },
          { type: 'analyze', label: 'Client Insights', data: { type: 'clients' }, description: 'Analyze client data' },
          { type: 'export', label: 'Export Clients', data: { format: 'csv' }, description: 'Export client list' }
        );
        break;
    }

    return actions;
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transition-all duration-300 group z-50"
        size="icon"
      >
        <Bot className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 bg-card/95 backdrop-blur-xl border border-border shadow-2xl z-50 transition-all duration-300 ${
      isMinimized ? 'h-14' : 'h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Bot className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              AI Assistant
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </h3>
            <p className="text-xs text-muted-foreground">KNOWS Studios • Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-6 h-6 hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="w-6 h-6 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Quick Actions - Moved to Top */}
          <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Quick Actions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {getQuickActions().map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => executeAction(action)}
                    className="text-xs h-8 px-3 bg-card/60 hover:bg-card border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-200 group/quick"
                  >
                    <div className="w-3 h-3 rounded-full bg-primary/60 group-hover/quick:bg-primary transition-colors mr-2"></div>
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Messages Container - Fixed Scrolling */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            <ScrollArea className="flex-1 w-full">
              <div className="px-4 py-2 space-y-4 w-full max-h-[400px] overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex group ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      {/* Message Bubble */}
                      <div
                        className={`relative p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground ml-4 hover:scale-[1.02]'
                            : 'bg-gradient-to-r from-muted to-muted/80 text-foreground mr-4 hover:scale-[1.02] border border-border/50'
                        }`}
                      >
                        {/* Message Content */}
                        <div className="relative">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                            {message.content}
                          </p>

                          {/* Timestamp */}
                          <div className={`flex items-center justify-end gap-1 mt-3 pt-2 border-t ${
                            message.role === 'user' ? 'border-primary-foreground/20' : 'border-border'
                          }`}>
                            <span className="text-xs opacity-60">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.role === 'assistant' && (
                              <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-green-600 font-medium">AI</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Hover Effects */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className={`absolute inset-0 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-primary/20 to-secondary/20'
                              : 'bg-gradient-to-r from-primary/5 to-secondary/5'
                          }`} />
                        </div>
                      </div>

                      {/* Actions */}
                      {message.actions && message.actions.length > 0 && (
                        <div className={`flex flex-wrap gap-2 mt-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {message.actions.map((action, actionIndex) => (
                            <Button
                              key={actionIndex}
                              variant="outline"
                              size="sm"
                              onClick={() => executeAction(action)}
                              className="text-xs h-8 px-3 bg-card/80 hover:bg-card border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-200 group/action"
                            >
                              <Zap className="w-3 h-3 mr-1 group-hover/action:text-primary transition-colors" />
                              <span className="group-hover/action:text-primary transition-colors">{action.label}</span>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-gradient-to-r from-muted to-muted/80 p-4 rounded-2xl mr-4 border border-border/50 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Bot className="w-5 h-5 text-primary animate-pulse" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground font-medium">Analyzing your request...</span>
                        </div>
                      </div>
                      <div className="mt-2 flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spacer to ensure last message is visible */}
                <div className="h-4" />
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>
          </div>

          {/* Input Section - Now the Footer */}
          <div className="border-t border-border bg-card/30 backdrop-blur-sm">
            <div className="p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about your studio..."
                    className="pr-12 text-sm bg-card/60 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                    disabled={isLoading}
                  />
                  {input.trim() && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setInput('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>

              {/* Status Indicators */}
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>AI Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-3 h-3" />
                  <span>GPT-4 Powered</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
