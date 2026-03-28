import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { personalData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';

// ── EmailJS config ──────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Create a service (Gmail/Outlook) and note the Service ID
// 3. Create an email template and note the Template ID
// 4. Copy your Public Key from Account → API Keys
// Then replace the three placeholders below:
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
// ───────────────────────────────────────────────────────────────

const SERIF = "'Raleway', 'Josefin Sans', sans-serif";
const SANS  = "'Josefin Sans', sans-serif";

const fg = (dark, a) => dark ? `rgba(255,255,255,${a})` : `rgba(18,18,18,${a})`;

/* ── Reusable field wrapper ── */
const Field = ({ label, required, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <label style={{
      fontFamily: SANS, fontSize: 11, fontWeight: 400,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.85)',
    }}>
      {label}{required && <span style={{ color: '#e040fb', marginLeft: 4 }}>*</span>}
    </label>
    {children}
  </div>
);

/* ── Input / Textarea shared styles ── */
const inputStyle = {
  fontFamily: SANS, fontSize: 14, fontWeight: 300,
  padding: '13px 16px',
  width: '100%',
  boxSizing: 'border-box',
  letterSpacing: '0.02em',
};

const InputField = ({ type = 'text', placeholder, value, onChange, onFocus, onBlur }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    style={inputStyle}
  />
);

/* ── Submit button — matches PremiumButton on splash ── */
const SubmitButton = ({ children, disabled }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  let background = 'transparent';
  let boxShadow  = 'none';
  let transform  = 'translateY(0px)';
  let transition = 'all 0.3s ease';
  let border     = '1px solid #e040fb';

  if (disabled) {
    border = '1px solid rgba(255,255,255,0.2)';
  } else if (pressed) {
    background = 'linear-gradient(135deg, rgba(240,111,255,0.7), rgba(155,79,255,0.7))';
    boxShadow  = '0 4px 15px rgba(224,64,251,0.6)';
    transform  = 'translateY(-1px)';
    transition = 'all 0.15s ease';
  } else if (hovered) {
    background = 'linear-gradient(135deg, rgba(224,64,251,0.7), rgba(123,47,247,0.7))';
    boxShadow  = '0 8px 25px rgba(224,64,251,0.4)';
    transform  = 'translateY(-3px)';
  }

  return (
    <button
      type="submit"
      disabled={disabled}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        fontFamily: SANS, fontSize: 11, fontWeight: 400,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: disabled ? 'rgba(255,255,255,0.3)' : '#ffffff',
        background, border, padding: '13px 40px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform, boxShadow, transition,
        alignSelf: 'flex-start',
      }}
    >
      {children}
    </button>
  );
};

/* ── Request CV CTA button (left panel) ── */
const RequestCVButton = () => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  let background = 'transparent';
  let boxShadow  = 'none';
  let transform  = 'translateY(0px)';
  let transition = 'all 0.3s ease';
  let border     = '1px solid #e040fb';

  if (pressed) {
    background = 'linear-gradient(135deg, rgba(240,111,255,0.7), rgba(155,79,255,0.7))';
    boxShadow  = '0 4px 15px rgba(224,64,251,0.6)';
    transform  = 'translateY(-1px)';
    transition = 'all 0.15s ease';
  } else if (hovered) {
    background = 'linear-gradient(135deg, rgba(224,64,251,0.7), rgba(123,47,247,0.7))';
    boxShadow  = '0 8px 25px rgba(224,64,251,0.4)';
    transform  = 'translateY(-3px)';
  }

  const scrollToForm = () => {
    document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <button
      onClick={scrollToForm}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        fontFamily: SANS, fontSize: 11, fontWeight: 400,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: '#ffffff', background, border,
        padding: '12px 28px', cursor: 'pointer',
        transform, boxShadow, transition,
        alignSelf: 'flex-start', marginBottom: 32,
      }}
    >
      Request a CV
    </button>
  );
};

/* ══════════════════════════════════════════════════════════════ */
const Contact = () => {
  const { dark } = useTheme();

  const [form, setForm] = useState({
    name: '', email: '', company: '', role: '', phone: '', message: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted]       = useState(false);
  const [submitting, setSubmitting]     = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const focusStyle = () => inputStyle;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;
    setSubmitting(true);

    const templateParams = {
      from_name:    form.name,
      from_email:   form.email,
      company:      form.company,
      role:         form.role     || '—',
      phone:        form.phone    || '—',
      message:      form.message  || '—',
      to_email:     'stuti.jain@edu.em-lyon.com',
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setSubmitting(false);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setSubmitting(false);
        alert('Something went wrong. Please try again or email me directly at stuti.jain@edu.em-lyon.com');
      });
  };

  const isValid = true;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '80px 60px 80px 44px',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
    }}>

      {/* ── Success state ── */}
      {submitted ? (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', maxWidth: 520,
        }}>
          <p style={{
            fontFamily: SANS, fontSize: 11, fontWeight: 400,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#e040fb', margin: '0 0 24px 0',
          }}>Message Sent</p>
          <h1 style={{
            fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 58px)',
            fontWeight: 700, color: fg(dark, 0.97),
            margin: '0 0 20px 0', lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            Thank you,<br />I'll be in touch.
          </h1>
          <p style={{
            fontFamily: SANS, fontSize: 15, fontWeight: 300,
            color: fg(dark, 0.65), lineHeight: 1.8, margin: 0,
          }}>
            Your request has been received. I'll get back to you at{' '}
            <span style={{ color: '#e040fb' }}>{form.email}</span> as soon as possible.
          </p>
        </div>
      ) : (

        <div style={{ display: 'flex', gap: '8%', alignItems: 'flex-start' }}>

          {/* ── LEFT: title + intro ── */}
          <div style={{ width: '36%', flexShrink: 0, paddingTop: 8 }}>

            <p style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#e040fb', margin: '0 0 20px 0',
            }}>Get in Touch</p>

            <h1 style={{
              fontFamily: SERIF, fontSize: 'clamp(30px, 3.8vw, 56px)',
              fontWeight: 700, color: fg(dark, 0.97),
              margin: '0 0 28px 0', lineHeight: 1.15, letterSpacing: '-0.02em',
            }}>
              Let's<br />Connect
            </h1>

            <div style={{
              width: 36, height: '0.5px',
              background: 'rgba(224,64,251,0.6)',
              margin: '0 0 28px 0',
            }} />

            <p style={{
              fontFamily: SANS, fontSize: 17, fontWeight: 300,
              color: fg(dark, 1.0), lineHeight: 1.85,
              letterSpacing: '0.02em', margin: '0 0 40px 0',
            }}>
              If you would like to know more about my background, projects,
              or experience, feel free to get in touch or fill out the form
              to request my CV.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Email', value: personalData.email },
                { label: 'Mobile', value: '+33 7 45 31 06 44' },
                { label: 'Location', value: personalData.location },
                { label: 'LinkedIn', value: 'linkedin.com/in/stutijain1409', href: 'https://www.linkedin.com/in/stutijain1409/' },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p style={{
                    fontFamily: SANS, fontSize: 10, fontWeight: 400,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: fg(dark, 0.68), margin: '0 0 4px 0',
                  }}>{label}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" style={{
                      fontFamily: SANS, fontSize: 15, fontWeight: 300,
                      color: '#e040fb', margin: 0, letterSpacing: '0.03em',
                      textDecoration: 'none', transition: 'opacity 0.2s ease',
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >{value}</a>
                  ) : (
                    <p style={{
                      fontFamily: SANS, fontSize: 15, fontWeight: 300,
                      color: fg(dark, 1.0), margin: 0, letterSpacing: '0.03em',
                    }}>{value}</p>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT: form ── */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', gap: 24,
              paddingTop: 8,
            }}
          >

            {/* Row 1: Name + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Field label="Full Name" required>
                <input
                  type="text"
                  placeholder="Stuti Jain"
                  value={form.name}
                  onChange={set('name')}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  style={focusStyle()}
                />
              </Field>
              <Field label="Email Address" required>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  value={form.email}
                  onChange={set('email')}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={focusStyle()}
                />
              </Field>
            </div>

            {/* Row 2: Company + Role */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Field label="Company or Organization" required>
                <input
                  type="text"
                  placeholder="Brand / Agency / Studio"
                  value={form.company}
                  onChange={set('company')}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  style={focusStyle()}
                />
              </Field>
              <Field label="Role / Position">
                <input
                  type="text"
                  placeholder="e.g. Marketing Manager"
                  value={form.role}
                  onChange={set('role')}
                  onFocus={() => setFocusedField('role')}
                  onBlur={() => setFocusedField(null)}
                  style={focusStyle()}
                />
              </Field>
            </div>

            {/* Row 3: Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Field label="Phone Number">
                <input
                  type="tel"
                  placeholder="+1 000 000 0000"
                  value={form.phone}
                  onChange={set('phone')}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  style={focusStyle()}
                />
              </Field>
            </div>

            {/* Message */}
            <Field label="Message">
              <textarea
                rows={5}
                placeholder="Anything you'd like to share..."
                value={form.message}
                onChange={set('message')}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...focusStyle(),
                  resize: 'vertical',
                  minHeight: 120,
                }}
              />
            </Field>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 4 }}>
              <SubmitButton disabled={!isValid || submitting}>
                {submitting ? 'Sending…' : 'Request CV'}
              </SubmitButton>
            </div>

          </form>

        </div>
      )}
    </div>
  );
};

export default Contact;
