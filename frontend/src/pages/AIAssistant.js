import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SANS = "'Josefin Sans', sans-serif";
const SERIF = "'Raleway', 'Josefin Sans', sans-serif";


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

PROJECTS:

1. L'Oréal Brandstorm (Dec 2024 – Mar 2025) — Innovation / Brand Strategy
   An AI-powered men's care and wellness ecosystem designed to simplify daily skincare by delivering a more personalised and seamless routine. Competed in L'Oréal's global Brandstorm competition, developing a full brand concept and go-to-market strategy for the men's wellness space.

2. Data Visualization Project (Oct 2024 – Present) — Data Analysis / Visualization, Emlyon Business School
   Created interactive Power BI dashboards to analyze large datasets, monitor KPIs, uncover actionable insights, and drive strategic decision-making. Demonstrates Stuti's ability to translate raw data into clear visual narratives for business audiences.

3. Interior Retail Design — Luxury Wellness & Hospitality Interior Concepts, India
   Premium interior concepts for salon, spa, and restaurant spaces, blending materiality, ambience, and spatial storytelling to elevate the customer experience.
   - Salon + Spa Mood Board: Designed around a light neutral palette, warm wood, brushed brass, and soft green accents with ambient lighting and curved architectural details. Focused on elevating consumer touchpoints, brand environment coherence, and premium positioning across beauty retail, waiting, and treatment zones.
   - Terracotta & Brass Dining Mood Board: A restaurant concept grounded in earthy natural tones — terracotta, clay plaster, travertine, woven details, and brushed brass — delivering strong guest experience, brand experience, and experiential appeal within a warm, design-led hospitality setting.

4. Paris Fashion & Luxury Market Study (Dec 2025 – Feb 2026) — Beauty & Fashion, Emlyon Business School
   A strategic market clustering project focused on Paris's luxury and fashion landscape, uncovering brand patterns, consumer segments, and key growth opportunities across the city's prestige retail ecosystem.

SPECIFIC ANSWERS — use these exact responses when the question matches:

Q: "What's Stuti's current role?" (or any question about her current role or what she does now)
A: Stuti is currently a Growth Specialist Intern at PulpoAR Inc, a Paris-based beauty tech company working at the intersection of AI and beauty. She supports prestige brand rollouts, strategic partnerships, and multi-market expansion across EMEA, the US, and Asia.

In her day-to-day, she works closely on AI-powered solution rollouts — including virtual try-on and skin analysis — for prestige brands like Elf Cosmetics, KIKO Milano, and Sephora. She is involved in brand coordination, rollout materials, performance tracking, and client-facing presentations, giving her hands-on exposure to both the strategic and operational sides of beauty tech. She also monitors a €1M partnership through daily coordination with key markets and stakeholders, which has sharpened her understanding of how global beauty brands operate across channels and regions.

Q: "What is she looking for?" (or any question about what she wants, her ideal role, internship search, or next step)
A: Stuti is seeking a 6-month end-of-studies internship in marketing, ideally within the beauty, luxury, or consumer goods sector. She is particularly drawn to roles in brand marketing, product marketing, trade marketing, or growth — where she can apply her combination of strategic thinking, consumer insight, and hands-on execution.

She is passionate about working on brands that have a strong identity and a meaningful relationship with their consumer — whether that means supporting a campaign, shaping a product launch, activating a retail strategy, or building brand equity across markets. Her experience across beauty tech and premium retail, combined with her analytical toolkit and international exposure, makes her well-suited for fast-paced, cross-functional marketing environments.

Q: "What are her key marketing skills?" (or any question about her marketing skills)
A: Stuti brings a marketing profile that blends market strategy, brand strategy, operational marketing, and product marketing with hands-on experience in beauty tech and premium retail. Her work has involved translating consumer and market understanding into rollout plans, launch support, brand execution, and growth-focused initiatives across markets.

She combines analytical thinking with execution, using Power BI, Tableau, Excel, SQL, and Python to turn performance data into actionable decisions. Alongside this, she has also worked closely with campaign execution, promo strategy, retail activation, in-store visibility, and digital touchpoints, giving her a practical understanding of how brands are built and scaled across channels.

What sets her apart is her ability to connect consumer understanding, strategic positioning, digital execution, and operational follow-through across markets.

Q: "What are her interests?" (or any question about her hobbies, personal interests, or what she does outside work)
A: Stuti's interests reflect both creativity and curiosity. Outside of work, she enjoys working out, travelling, meeting new people, and socialising — she genuinely thrives in diverse, energetic environments.

She also has a creative side — she loves exploring content creation, particularly AI-generated visuals and videos, and enjoys experimenting with new tools and workflows. She keeps a close eye on emerging AI tools and automation technologies, always looking for ways they can be applied creatively or strategically. And of course, she stays closely connected to what is happening in the beauty industry — from new brand launches and trend shifts to innovations in beauty tech and retail experience.

TONE: warm, confident, professional. Always speak positively about Stuti.
Never mention architecture unless directly asked. Focus on her marketing expertise, beauty industry knowledge, and international exposure.
If unsure about something, highlight her adaptability, curiosity, and eagerness to learn.`;

const SUGGESTED = [
  "What's Stuti's current role?",
  "What are her key marketing skills?",
  "What is she looking for?",
  "Tell me about her experience",
  "What are her interests?",
];

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
              style={{ color: '#e040fb', textDecoration: 'underline', cursor: 'pointer', fontWeight: 500 }}
            >{label}</span>
          ) : (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
              style={{ color: '#e040fb', textDecoration: 'underline', fontWeight: 500 }}
            >{label}</a>
          );
        }
        return part;
      })}
    </>
  );
};

const AIAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Stuti's AI assistant ✨ I'm here to help you learn about her experience, skills, and industry knowledge. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasMessages = messages.length > 1;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    const userMessage = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const apiMessages = updatedMessages
      .slice(1)
      .slice(-6)
      .map(m => ({ role: m.role, content: m.content }));

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, system: SYSTEM_PROMPT }),
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'clamp(20px, 5vw, 48px) clamp(16px, 4vw, 48px) 32px', position: 'relative' }}>

      {/* Background image — right side, desktop only */}
      <div style={{
        position: 'fixed',
        right: 0, top: 0,
        width: '45%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
        display: 'var(--ai-bg-display, block)',
      }} className="ai-bg-image">
        <img
          src="/ask ai.jpg"
          alt=""
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            opacity: 1,
            mixBlendMode: 'screen',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 70% 45%, black 40%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse 80% 90% at 70% 45%, black 40%, transparent 80%)',
          }}
        />
      </div>

      {/* Header */}
      <div style={{ marginBottom: 'clamp(20px, 4vw, 40px)', position: 'relative', zIndex: 1 }}>
        <span style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 400,
          letterSpacing: '0.28em', color: 'rgba(224,64,251,0.9)',
          textTransform: 'uppercase', display: 'block', marginBottom: 14,
        }}>AI Assistant</span>
        <h1 style={{
          fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
          fontWeight: 700, color: '#ffffff', margin: 0,
          letterSpacing: '-0.02em', lineHeight: 1.15,
        }}>
          Ask about{' '}
          <span style={{
            background: 'linear-gradient(135deg, #e040fb, #a78bfa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Stuti</span>
        </h1>
        <p style={{
          fontFamily: SANS, fontSize: 13, fontWeight: 300,
          color: 'rgba(255,255,255,0.45)', marginTop: 10,
          letterSpacing: '0.04em',
        }}>Powered by Claude AI · Ask anything about her experience, skills, or background</p>
      </div>

      {/* Chat area */}
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(180,100,255,0.15)',
        borderRadius: 24,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        maxWidth: 820,
        width: '100%',
        minHeight: 480,
        boxShadow: '0 20px 60px rgba(123,47,247,0.12)',
      }}>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: 'clamp(14px, 3vw, 28px) clamp(12px, 3vw, 28px) 16px',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              {msg.role === 'assistant' && (
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #c026d3, #7b2ff7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, marginRight: 10, marginTop: 2,
                }}>✨</div>
              )}
              <div style={{
                maxWidth: '72%',
                padding: '12px 18px',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #7b2ff7, #c026d3)'
                  : 'rgba(255,255,255,0.06)',
                border: msg.role === 'assistant' ? '1px solid rgba(180,100,255,0.18)' : 'none',
                fontFamily: SANS, fontSize: 14, fontWeight: 300,
                color: 'rgba(255,255,255,0.92)', lineHeight: 1.75,
              }}>
                <MessageContent text={msg.content} navigate={navigate} />
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #c026d3, #7b2ff7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, marginRight: 10,
              }}>✨</div>
              <div style={{
                padding: '12px 18px', borderRadius: '18px 18px 18px 4px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(180,100,255,0.18)',
                display: 'flex', gap: 5, alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: 7, height: 7, borderRadius: '50%',
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

        {/* Suggested questions — show only before first user message */}
        {!hasMessages && (
          <div style={{ padding: '0 28px 18px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  fontFamily: SANS, fontSize: 12, fontWeight: 300,
                  color: 'rgba(210,170,255,0.85)',
                  background: 'rgba(123,47,247,0.1)',
                  border: '1px solid rgba(180,100,255,0.3)',
                  borderRadius: 999, padding: '6px 16px',
                  cursor: 'pointer', letterSpacing: '0.03em',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(123,47,247,0.22)';
                  e.currentTarget.style.borderColor = 'rgba(224,64,251,0.5)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(123,47,247,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(180,100,255,0.3)';
                  e.currentTarget.style.color = 'rgba(210,170,255,0.85)';
                }}
              >{q}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: 'clamp(10px, 2vw, 14px) clamp(12px, 2vw, 20px)',
          borderTop: '1px solid rgba(180,100,255,0.12)',
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about Stuti..."
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(180,100,255,0.25)',
              borderRadius: 14, padding: '11px 18px',
              fontFamily: SANS, fontSize: 13, fontWeight: 300,
              color: '#ffffff', outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(224,64,251,0.6)'}
            onBlur={e => e.target.style.borderColor = 'rgba(180,100,255,0.25)'}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
              background: input.trim() && !loading
                ? 'linear-gradient(135deg, #c026d3, #7b2ff7)'
                : 'rgba(255,255,255,0.07)',
              border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 17, transition: 'all 0.2s ease',
              boxShadow: input.trim() && !loading ? '0 4px 16px rgba(192,38,211,0.4)' : 'none',
            }}
          >➤</button>
        </div>
      </div>

      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0);    opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;
