import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SANS = "'Josefin Sans', sans-serif";
const SERIF = "'Raleway', 'Josefin Sans', sans-serif";

const API_KEY = process.env.REACT_APP_ANTHROPIC_KEY;

const SYSTEM_PROMPT = `You are a professional portfolio assistant for Stuti Jain.
Help recruiters learn about her in a warm, compelling way.
Keep answers concise — 2-4 sentences maximum.
Always highlight her strengths positively and confidently.

ABOUT STUTI:
- Master in Management student at Emlyon Business School, Paris (Aug 2024 - Present)
- Currently: Growth Specialist Intern at PulpoAR Inc (Beauty Tech), Paris (Sept 2025 - Present)
- Previously: Growth Manager at Geetanjali Salon (premium beauty retail, India, 2022–2024)
- Previously: Brand Marketing Intern at Team Variance (brand & digital campaigns, 2023)
- 2+ years of hands-on marketing experience across beauty tech, premium retail, and digital
- Skills: Product Marketing, Digital Marketing, Marketing Analytics, Campaign Execution, Brand Coordination, E-commerce, Consumer Insights, Data Mining, Dashboarding (Power BI, Tableau), SQL, Python, Project Management
- Deep industry knowledge of the global luxury and beauty landscape — including major groups like L'Oréal, LVMH, Kering, Estée Lauder, Coty, Puig, Shiseido, and emerging beauty-tech players
- Strong understanding of prestige brand positioning, luxury consumer behaviour, and how beauty brands go to market across EMEA, US, and Asia
- Passionate about beauty, luxury, and the future of consumer experience
- Seeking: 6-month end-of-studies internship in marketing (beauty / luxury sector)
- Languages: English (native), French (B1), Hindi (native)
- Location: Paris, France
- LinkedIn: linkedin.com/in/stutijain1409

NAVIGATION INSTRUCTIONS — always include a clickable markdown link using this exact format [link text](url):
- If asked for CV or resume → say 'You can request Stuti's CV directly from her [Get in Touch](/contact) page!'
- If asked about work experience → say 'You can explore her full work history on her [Works](/works) page.'
- If asked about blog or articles → say 'Check out her writing on her [Blogs](/gallery) page.'
- If asked about projects → say 'You can see her projects on her [Projects](/projects) page.'

TONE: warm, confident, professional. Always speak positively about Stuti.
Never mention architecture unless directly asked. Focus on her marketing expertise, beauty industry knowledge, and international exposure.
If unsure about something, highlight her adaptability, curiosity, and eagerness to learn.`;

// Renders text with [label](url) markdown links as clickable anchors
const MessageContent = ({ text, navigate }) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const [, label, url] = match;
          const isInternal = url.startsWith('/');
          return isInternal ? (
            <span
              key={i}
              onClick={() => navigate(url)}
              style={{
                color: '#e040fb', textDecoration: 'underline',
                cursor: 'pointer', fontWeight: 500,
              }}
            >{label}</span>
          ) : (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#e040fb', textDecoration: 'underline', fontWeight: 500 }}
            >{label}</a>
          );
        }
        return part;
      })}
    </>
  );
};

const Chatbot = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Stuti's AI assistant ✨ I'm here to help you learn about her experience, skills, and industry knowledge. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    // Keep last 6 messages for context (excluding initial greeting)
    const apiMessages = updatedMessages
      .slice(1) // skip initial assistant greeting
      .slice(-6)
      .map(m => ({ role: m.role, content: m.content }));

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const reply = data.content?.[0]?.text || "I couldn't get a response. Please try again!";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment! 💜"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 100, right: 24, zIndex: 9999,
          width: 350, height: 480,
          background: 'rgba(10,0,25,0.97)',
          border: '1px solid rgba(180,100,255,0.3)',
          borderRadius: 20,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(123,47,247,0.3), 0 4px 20px rgba(0,0,0,0.6)',
          animation: 'chatSlideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
        }}>

          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '0.5px solid rgba(180,100,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #c026d3, #7b2ff7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}>✨</div>
              <span style={{
                fontFamily: SERIF, fontSize: 14, fontWeight: 700,
                background: 'linear-gradient(135deg, #e040fb, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                letterSpacing: '0.03em',
              }}>Ask about Stuti ✨</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.4)', fontSize: 18, lineHeight: 1,
                padding: 4, transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #7b2ff7, #c026d3)'
                    : 'rgba(255,255,255,0.07)',
                  border: msg.role === 'assistant' ? '1px solid rgba(180,100,255,0.15)' : 'none',
                  fontFamily: SANS, fontSize: 13, fontWeight: 300,
                  color: 'rgba(255,255,255,0.92)', lineHeight: 1.6,
                }}>
                  <MessageContent text={msg.content} navigate={navigate} />
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(180,100,255,0.15)',
                  display: 'flex', gap: 4, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'rgba(180,100,255,0.7)',
                      display: 'inline-block',
                      animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '10px 12px',
            borderTop: '0.5px solid rgba(180,100,255,0.2)',
            display: 'flex', gap: 8, alignItems: 'center',
            flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              style={{
                flex: 1, background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(180,100,255,0.25)',
                borderRadius: 12, padding: '9px 14px',
                fontFamily: SANS, fontSize: 13, fontWeight: 300,
                color: '#ffffff', outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(224,64,251,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(180,100,255,0.25)'}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, #c026d3, #7b2ff7)'
                  : 'rgba(255,255,255,0.08)',
                border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, transition: 'all 0.2s ease',
                boxShadow: input.trim() && !loading ? '0 4px 14px rgba(192,38,211,0.4)' : 'none',
              }}
            >➤</button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 28, right: 24, zIndex: 9999,
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #c026d3, #7b2ff7)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26,
          boxShadow: '0 8px 30px rgba(192,38,211,0.5), 0 4px 12px rgba(0,0,0,0.4)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(192,38,211,0.65), 0 4px 16px rgba(0,0,0,0.5)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(192,38,211,0.5), 0 4px 12px rgba(0,0,0,0.4)';
        }}
        aria-label="Open chat"
      >
        {open ? '✕' : '✨'}
      </button>

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0);    opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1;   }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
