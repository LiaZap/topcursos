'use client';

import { useRef, useState } from 'react';
import type { Course } from '@/lib/courses';
import { WEBHOOK_URL, waLink } from '@/lib/config';
import {
  CredIcon,
  FacebookIcon,
  InstagramIcon,
  LearnIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from './icons';

const STRIPES = 'repeating-linear-gradient(-45deg,#FFB800 0 16px,#16181D 16px 32px)';

type Errors = Partial<Record<'nome' | 'whats' | 'email' | 'cidade', string>>;

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
  if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
  return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
}

export default function CoursePage({ course }: { course: Course }) {
  const formRef = useRef<HTMLElement>(null);

  const [nome, setNome] = useState('');
  const [whats, setWhats] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);

  const waInfo = waLink(
    'Olá! Tenho interesse no ' + course.courseName + ' e gostaria de mais informações.',
  );

  function scrollToForm() {
    const el = formRef.current;
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 12,
        behavior: 'smooth',
      });
    }
  }

  function validate(): Errors {
    const e: Errors = {};
    if (nome.trim().length < 3) e.nome = 'Informe seu nome completo.';
    if (whats.replace(/\D/g, '').length < 10) e.whats = 'Informe um WhatsApp válido com DDD.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Informe um e-mail válido.';
    if (cidade.trim().length < 2) e.cidade = 'Informe sua cidade.';
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);

    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome,
            whatsapp: whats,
            email,
            cidade,
            curso: course.courseName,
            origem: typeof location !== 'undefined' ? location.href : '',
            data: new Date().toISOString(),
          }),
          keepalive: true,
        });
      } catch {
        /* falha do webhook não bloqueia o lead */
      }
    }

    const msg =
      'Olá! Meu nome é ' +
      nome +
      ', sou de ' +
      cidade +
      ' e tenho interesse no ' +
      course.courseName +
      '. Meu e-mail é ' +
      email +
      '.';
    window.open(waLink(msg), '_blank');
    setSending(false);
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    border: '1.5px solid #D4DAE2',
    borderRadius: 10,
    padding: '13px 14px',
    font: "400 16px 'Barlow',sans-serif",
    outline: 'none',
  };
  const errStyle: React.CSSProperties = {
    color: '#D3382E',
    fontSize: 13,
    fontWeight: 600,
    minHeight: 18,
  };
  const labelStyle: React.CSSProperties = { fontWeight: 600, fontSize: 14 };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* FAIXA DE SEGURANÇA */}
      <div style={{ height: 8, background: STRIPES }} />

      {/* HEADER */}
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #E6E9EE',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-instituto-top.png"
            alt="Instituto Top, Treinamentos e Qualificação"
            style={{ height: 64, width: 'auto' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={scrollToForm}
              className="btn-yellow"
              style={{
                background: '#FFB800',
                color: '#16181D',
                border: 'none',
                borderRadius: 8,
                padding: '12px 20px',
                font: "700 15px 'Barlow',sans-serif",
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              Quero me inscrever
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          background: 'linear-gradient(135deg,#12141A 0%,#1C2230 60%,#1B4B9B 140%)',
          color: '#ffffff',
          padding: '56px 20px 64px',
        }}
      >
        <div
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span
              style={{
                alignSelf: 'flex-start',
                background: 'rgba(255,184,0,.15)',
                border: '1px solid #FFB800',
                color: '#FFB800',
                font: "700 13px 'Barlow',sans-serif",
                letterSpacing: 1,
                textTransform: 'uppercase',
                padding: '6px 12px',
                borderRadius: 6,
              }}
            >
              {course.hero.badge}
            </span>
            <h1
              style={{
                margin: 0,
                font: "800 clamp(36px,5.2vw,58px)/1.05 'Barlow Condensed',sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '.5px',
              }}
            >
              {course.hero.titlePre}
              <span style={{ color: '#FFB800' }}>{course.hero.titleHighlight}</span>
              {course.hero.titlePost}
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 18,
                lineHeight: 1.55,
                color: '#C9D2E0',
                maxWidth: 520,
              }}
            >
              {course.hero.paragraph}
            </p>

            {course.hero.chips && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {course.hero.chips.map((chip) => (
                  <span
                    key={chip}
                    style={{
                      background: 'rgba(255,255,255,.08)',
                      border: '1px solid rgba(255,255,255,.2)',
                      borderRadius: 999,
                      padding: '6px 14px',
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 6 }}>
              <button
                onClick={scrollToForm}
                className="btn-yellow"
                style={{
                  background: '#FFB800',
                  color: '#16181D',
                  border: 'none',
                  borderRadius: 10,
                  padding: '16px 28px',
                  font: "700 17px 'Barlow',sans-serif",
                  cursor: 'pointer',
                  minHeight: 48,
                }}
              >
                Quero me inscrever
              </button>
              <a
                href={waInfo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#25D366',
                  color: '#ffffff',
                  borderRadius: 10,
                  padding: '16px 24px',
                  font: "700 17px 'Barlow',sans-serif",
                  textDecoration: 'none',
                  minHeight: 48,
                  boxSizing: 'border-box',
                }}
              >
                <WhatsAppIcon size={20} />
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div style={{ justifySelf: 'center', width: '100%', maxWidth: 520 }}>
            {course.hero.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={course.hero.image.src}
                alt={course.hero.image.alt}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 380,
                  objectFit: 'cover',
                  borderRadius: 16,
                  boxShadow: '0 20px 50px rgba(0,0,0,.4)',
                }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                  height: 380,
                  border: '2px dashed rgba(255,255,255,.25)',
                  borderRadius: 16,
                  color: 'rgba(255,255,255,.55)',
                  font: "600 15px 'Barlow',sans-serif",
                  padding: 20,
                }}
              >
                {course.hero.imagePlaceholder}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BARRA DE CREDIBILIDADE */}
      <section style={{ background: '#FFB800', padding: '22px 20px' }}>
        <div
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            gap: 18,
          }}
        >
          {course.credibility.map((item) => (
            <div
              key={item.text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                font: "700 16px 'Barlow',sans-serif",
                color: '#16181D',
              }}
            >
              <CredIcon name={item.icon} />
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* O QUE VOCÊ VAI APRENDER */}
      <section style={{ padding: '72px 20px', background: '#ffffff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <h2
            style={{
              margin: '0 0 8px',
              font: "800 clamp(30px,3.8vw,42px)/1.1 'Barlow Condensed',sans-serif",
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                display: 'block',
                font: "700 13px 'Barlow',sans-serif",
                letterSpacing: '2.5px',
                color: '#1B4B9B',
                marginBottom: 10,
              }}
            >
              Conteúdo do curso
            </span>
            O que você vai aprender
          </h2>
          <p style={{ margin: '0 0 36px', color: '#5B6472', fontSize: 17, maxWidth: 640 }}>
            {course.learn.intro}
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
              gap: 20,
            }}
          >
            {course.learn.cards.map((card) => (
              <div
                key={card.title}
                style={{
                  background: '#F3F5F8',
                  borderRadius: 14,
                  padding: 26,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 10,
                    background: '#1B4B9B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LearnIcon name={card.icon} />
                </span>
                <h3 style={{ margin: 0, font: "700 20px 'Barlow',sans-serif" }}>{card.title}</h3>
                <p style={{ margin: 0, color: '#5B6472', lineHeight: 1.55 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MERCADO DE TRABALHO */}
      <section style={{ padding: '72px 20px', background: '#16181D', color: '#ffffff' }}>
        <div
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: 44,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2
              style={{
                margin: 0,
                font: "800 clamp(30px,3.8vw,42px)/1.1 'Barlow Condensed',sans-serif",
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  display: 'block',
                  font: "700 13px 'Barlow',sans-serif",
                  letterSpacing: '2.5px',
                  color: '#FFB800',
                  marginBottom: 10,
                }}
              >
                {course.market.kicker}
              </span>
              {course.market.titlePre}
              <span style={{ color: '#FFB800' }}>{course.market.titleHighlight}</span>
              {course.market.titlePost}
            </h2>
            <p style={{ margin: 0, color: '#C9D2E0', fontSize: 17, lineHeight: 1.6 }}>
              {course.market.paragraph}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 6 }}>
              {course.market.sectors.map((s) => (
                <span
                  key={s}
                  style={{
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.18)',
                    borderRadius: 999,
                    padding: '8px 16px',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {course.market.stats.map((stat) => (
              <div
                key={stat.value}
                style={{
                  background: '#1C2230',
                  borderRadius: 14,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  gridColumn: stat.wide ? '1 / -1' : undefined,
                }}
              >
                <span
                  style={{
                    font: `800 ${stat.size ?? 30}px 'Barlow Condensed',sans-serif`,
                    color: '#FFB800',
                  }}
                >
                  {stat.value}
                </span>
                <span style={{ color: '#C9D2E0', fontSize: 14, lineHeight: 1.4 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ padding: '72px 20px', background: '#F3F5F8' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <h2
            style={{
              margin: '0 0 36px',
              font: "800 clamp(30px,3.8vw,42px)/1.1 'Barlow Condensed',sans-serif",
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                display: 'block',
                font: "700 13px 'Barlow',sans-serif",
                letterSpacing: '2.5px',
                color: '#1B4B9B',
                marginBottom: 10,
              }}
            >
              Na prática
            </span>
            Como funciona o curso
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))',
              gap: 20,
            }}
          >
            {course.steps.map((step) => (
              <div
                key={step.label}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  padding: 26,
                  borderTop: '4px solid #FFB800',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    font: "700 13px 'Barlow',sans-serif",
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: '#1B4B9B',
                  }}
                >
                  {step.label}
                </span>
                <span style={{ font: "800 30px 'Barlow Condensed',sans-serif" }}>{step.value}</span>
                <p style={{ margin: 0, color: '#5B6472', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTIMENTO */}
      <section style={{ padding: '72px 20px', background: '#ffffff' }}>
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            textAlign: 'center',
            background: '#16181D',
            color: '#ffffff',
            borderRadius: 20,
            padding: '44px 28px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: STRIPES }} />
          <h2
            style={{
              margin: '0 0 6px',
              font: "800 clamp(28px,3.4vw,38px)/1.1 'Barlow Condensed',sans-serif",
              textTransform: 'uppercase',
            }}
          >
            Investimento
          </h2>
          <p style={{ margin: '0 0 18px', color: '#C9D2E0' }}>{course.investimento.intro}</p>
          <div
            style={{
              font: "800 clamp(40px,6vw,56px)/1 'Barlow Condensed',sans-serif",
              color: '#FFB800',
              marginBottom: 8,
            }}
          >
            {course.investimento.preco}
          </div>
          <p style={{ margin: '0 0 24px', color: '#C9D2E0', fontSize: 15 }}>
            {course.investimento.precoDetalhe}
          </p>
          <button
            onClick={scrollToForm}
            className="btn-yellow"
            style={{
              background: '#FFB800',
              color: '#16181D',
              border: 'none',
              borderRadius: 10,
              padding: '16px 32px',
              font: "700 17px 'Barlow',sans-serif",
              cursor: 'pointer',
              minHeight: 48,
            }}
          >
            Garantir minha vaga
          </button>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{ padding: '72px 20px', background: '#F3F5F8' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <h2
            style={{
              margin: '0 0 36px',
              font: "800 clamp(30px,3.8vw,42px)/1.1 'Barlow Condensed',sans-serif",
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                display: 'block',
                font: "700 13px 'Barlow',sans-serif",
                letterSpacing: '2.5px',
                color: '#1B4B9B',
                marginBottom: 10,
              }}
            >
              Alunos formados
            </span>
            Quem fez, recomenda
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
              gap: 20,
            }}
          >
            {course.testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  padding: 26,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{ font: "800 54px/0.4 'Barlow Condensed',sans-serif", color: '#FFB800' }}
                >
                  &ldquo;
                </div>
                <p style={{ margin: 0, color: '#39414D', fontSize: 16, lineHeight: 1.6 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: 52,
                      height: 52,
                      flex: 'none',
                      borderRadius: '50%',
                      background: '#E6E9EE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9AA3AF',
                      font: "700 18px 'Barlow',sans-serif",
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: 15 }}>{t.name}</strong>
                    <span style={{ color: '#5B6472', fontSize: 13 }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '72px 20px', background: '#ffffff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2
            style={{
              margin: '0 0 36px',
              font: "800 clamp(30px,3.8vw,42px)/1.1 'Barlow Condensed',sans-serif",
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Perguntas frequentes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {course.faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} style={{ border: '1px solid #E6E9EE', borderRadius: 12, overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="faq-q"
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: 'none',
                      padding: '18px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                      textAlign: 'left',
                      font: "700 16px 'Barlow',sans-serif",
                      color: '#16181D',
                      minHeight: 44,
                    }}
                  >
                    {faq.q}
                    <span style={{ color: '#1B4B9B', font: "800 20px 'Barlow',sans-serif", flex: 'none' }}>
                      {open ? '−' : '+'}
                    </span>
                  </button>
                  {open && (
                    <p style={{ margin: 0, padding: '0 20px 18px', color: '#5B6472', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section
        ref={formRef}
        style={{ padding: '72px 20px', background: 'linear-gradient(135deg,#1B4B9B,#12315F)' }}
      >
        <div
          style={{
            maxWidth: 560,
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: 20,
            padding: '36px 28px',
            boxShadow: '0 20px 60px rgba(0,0,0,.3)',
          }}
        >
          <h2
            style={{
              margin: '0 0 6px',
              font: "800 clamp(28px,3.4vw,36px)/1.1 'Barlow Condensed',sans-serif",
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Garanta sua vaga
          </h2>
          <p style={{ margin: '0 0 24px', color: '#5B6472', textAlign: 'center' }}>
            Preencha e continue a inscrição pelo WhatsApp. Vagas limitadas por turma.
          </p>
          <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label htmlFor="f-nome" style={labelStyle}>
                Nome completo
              </label>
              <input
                id="f-nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="input-field"
                style={inputStyle}
              />
              <span style={errStyle}>{errors.nome || ''}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label htmlFor="f-whats" style={labelStyle}>
                WhatsApp
              </label>
              <input
                id="f-whats"
                type="tel"
                value={whats}
                onChange={(e) => setWhats(maskPhone(e.target.value))}
                placeholder="(51) 99999-9999"
                className="input-field"
                style={inputStyle}
              />
              <span style={errStyle}>{errors.whats || ''}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label htmlFor="f-email" style={labelStyle}>
                E-mail
              </label>
              <input
                id="f-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="input-field"
                style={inputStyle}
              />
              <span style={errStyle}>{errors.email || ''}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label htmlFor="f-cidade" style={labelStyle}>
                Cidade
              </label>
              <input
                id="f-cidade"
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Sua cidade"
                className="input-field"
                style={inputStyle}
              />
              <span style={errStyle}>{errors.cidade || ''}</span>
            </div>
            <button
              type="submit"
              className="btn-yellow"
              style={{
                background: '#FFB800',
                color: '#16181D',
                border: 'none',
                borderRadius: 10,
                padding: 17,
                font: "700 18px 'Barlow',sans-serif",
                cursor: 'pointer',
                marginTop: 6,
                minHeight: 48,
              }}
            >
              {sending ? 'Enviando…' : 'Garantir minha vaga'}
            </button>
            {sent && (
              <p
                style={{
                  margin: 0,
                  textAlign: 'center',
                  color: '#1E8A4C',
                  fontWeight: 600,
                  background: '#E8F6EE',
                  borderRadius: 10,
                  padding: 12,
                }}
              >
                Deu certo! Recebemos seus dados e a conversa continua no WhatsApp.
              </p>
            )}
            <p style={{ margin: 0, textAlign: 'center', color: '#9AA3AF', fontSize: 12.5 }}>
              Seus dados estão seguros e serão usados apenas para contato sobre o curso.
            </p>
          </form>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer style={{ background: '#16181D', color: '#C9D2E0', padding: '56px 20px 90px' }}>
        <div
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
            gap: 36,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-instituto-top.png"
              alt="Instituto Top"
              style={{
                height: 80,
                width: 80,
                objectFit: 'contain',
                background: '#ffffff',
                borderRadius: '50%',
                padding: 6,
                alignSelf: 'flex-start',
              }}
            />
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: 15 }}>
              Instituto Top, Treinamentos e Qualificação.
              <br />
              Formando operadores certificados em Santa Cruz do Sul e região.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h3
              style={{
                margin: '0 0 4px',
                font: "700 16px 'Barlow',sans-serif",
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Contato
            </h3>
            <a
              href="tel:+5551995622999"
              className="phone-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: '#C9D2E0',
                textDecoration: 'none',
                fontSize: 15,
              }}
            >
              <PhoneIcon />
              (51) 99562-2999
            </a>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
              <PinIcon />
              Rua Ernesto Alves, Santa Cruz do Sul, RS
            </span>
            <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
              <a
                href="#"
                aria-label="Instagram"
                className="social-link"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                }}
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="social-link"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                }}
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3
              style={{
                margin: '0 0 4px',
                font: "700 16px 'Barlow',sans-serif",
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Fale agora
            </h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
              Tire suas dúvidas direto com nossa equipe.
            </p>
            <a
              href={waInfo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#25D366',
                color: '#ffffff',
                borderRadius: 10,
                padding: '14px 22px',
                font: "700 16px 'Barlow',sans-serif",
                textDecoration: 'none',
                alignSelf: 'flex-start',
              }}
            >
              <WhatsAppIcon size={18} />
              Falar no WhatsApp
            </a>
          </div>
        </div>
        <p
          style={{
            maxWidth: 1140,
            margin: '40px auto 0',
            borderTop: '1px solid rgba(255,255,255,.1)',
            paddingTop: 20,
            fontSize: 13,
            color: '#7A8494',
          }}
        >
          © 2026 Instituto Top. Todos os direitos reservados.
        </p>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a
        href={waInfo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="wa-float"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 100,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(0,0,0,.35)',
          textDecoration: 'none',
        }}
      >
        <WhatsAppIcon size={32} color="#ffffff" />
      </a>
    </div>
  );
}
