import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import logo from './assets/logo.png'
import heroImage from './assets/hero.jpg'

const REMOTE_IMAGES = {
  hero:
    'https://images.unsplash.com/photo-1767411972844-b5e8bdda9e5d?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1800',
}

const LANG_STORAGE_KEY = 'travelbuddies_lang'

const copy = {
  pt: {
    navLinks: [
      { href: '#how', label: 'Como funciona' },
      { href: '#services', label: 'Base vs Premium' },
      { href: '#diagnostico', label: 'Diagnóstico' },
    ],
    heroTag: 'TravelBuddies | Viagens em Família',
    heroTitle: 'Viagens em família com crianças/bebés para a vida real (não perfeita).',
    heroBody: 'Planeamento leve para pais cansados.',
    heroCtaNote: 'Resposta humana, sem automações.',
    primaryCta: 'Começar diagnóstico',
    qualifyTitle: 'Isto é para ti se…',
    qualifyItems: [
      { title: 'Queres um ritmo possível', text: 'Com pausas e sestas.' },
      { title: 'Precisas de logística simples', text: 'Sem mil escolhas.' },
      { title: 'Estás sem tempo', text: 'E não queres pesquisar tudo.' },
      { title: 'Queres clareza', text: 'E apoio humano na decisão.' },
      { title: 'Isto não é para ti', text: 'Se queres viagens maratona.' },
    ],
    servicesTitle: 'Serviços TravelBuddies',
    servicesBody: 'Escolha simples, com calma.',
    baseTitle: 'BASE a partir de 50€',
    premiumTitle: 'PREMIUM a partir de 100€',
    premiumBadge: 'Menos decisões',
    baseOutcome: 'Para ganhar clareza e seguir em frente.',
    premiumOutcome: 'Para reduzir ao máximo o peso mental.',
    baseBenefits: ['Roteiro leve', 'Comparações claras', 'Decisão com apoio'],
    premiumBenefits: ['Planeamento por dias', 'Experiências alinhadas', 'Apoio antes e durante'],
    pricingNote: 'Valores variam consoante duração e complexidade.',
    baseIncludes: [
      'Diagnóstico TravelBuddies da família',
      'Roteiro adaptado aos perfis (destino, ritmo, tipo)',
      'Sugestão de voos e alojamento (com possibilidade de marcação)',
      'Checklist burocracias (documentos, saúde, etc.)',
      'Suporte durante decisão',
      'Mini guia destino',
    ],
    premiumIncludes: [
      'Planeamento por dias (ritmo realista com crianças)',
      'Sugestão e marcação de experiências',
      'Suporte durante a viagem',
    ],
    howTitle: 'Como funciona',
    howSteps: [
      { title: 'Diagnóstico curto', text: 'Ouvimos a vossa família.' },
      { title: 'Desenhamos e alinhamos', text: 'Ajustamos juntos, com calma.' },
      { title: 'Viajas com confiança', text: 'Estamos por perto.' },
    ],
    trustTitle: 'Confiança e calma',
    trustCards: [
      { title: 'Não somos agência tradicional', text: 'Planeamos como pais, com cuidado.' },
      { title: 'Vida real primeiro', text: 'Sem promessas irreais.' },
      { title: 'Presença humana', text: 'Acompanhamento próximo.' },
    ],
    formTitle: 'Diagnóstico TravelBuddies',
    formBody: 'Partilha o essencial. Nós simplificamos.',
    formHint: 'Demora 2–3 minutos. Resposta humana, sem automações.',
    formFields: {
      name: 'Nome',
      email: 'Email',
      dates: 'Para quando é a viagem?',
      service: 'Serviço preferido',
      who: 'Quem viaja? (opcional)',
      budget: 'Orçamento (opcional)',
      notes: 'Notas adicionais (opcional)',
    },
    formPlaceholders: {
      dates: 'Julho 2026',
      who: '2 adultos + 1 criança',
      budget: '€1500',
      notes: 'Preferências, alergias, etc.',
    },
    formToggle: 'Adicionar detalhes (opcional)',
    formServiceOptions: ['Premium', 'Base', 'Ainda não sei'],
    formSubmit: 'Começar diagnóstico',
    formSuccessTitle: 'Mensagem pronta',
    formSuccessBody: 'Copiada automaticamente.',
    formThankTitle: 'Obrigado! Já recebemos o teu pedido.',
    formThankBody: 'Vamos analisar com calma e responder com uma proposta clara.',
    formThankNote: 'Resposta humana, normalmente em 24–48h úteis.',
    whatsapp: 'Enviar por WhatsApp',
    email: 'Enviar por Email',
    instagram: 'Falar no Instagram',
    footerTitle: 'TravelBuddies',
    footerBody: 'Estamos aqui para ajudar a tua família.',
    footerSmall: 'Com carinho, TravelBuddies.',
    messageTitle: 'Pedido de Diagnóstico TravelBuddies',
  },
  en: {
    navLinks: [
      { href: '#how', label: 'How it works' },
      { href: '#services', label: 'Base vs Premium' },
      { href: '#diagnosis', label: 'Diagnosis' },
    ],
    heroTag: 'TravelBuddies | Family Trip Design',
    heroTitle: 'Family travel with kids/babies for real life (not perfect).',
    heroBody: 'Light planning for tired parents.',
    heroCtaNote: 'Human response, no automation.',
    primaryCta: 'Começar diagnóstico',
    qualifyTitle: 'This is for you if…',
    qualifyItems: [
      { title: 'You want a doable pace', text: 'With breaks and naps.' },
      { title: 'You need simple logistics', text: 'Not a thousand choices.' },
      { title: 'You are short on time', text: 'And can’t research everything.' },
      { title: 'You want clarity', text: 'With human support.' },
      { title: 'This is not for you', text: 'If you want marathon trips.' },
    ],
    servicesTitle: 'TravelBuddies Services',
    servicesBody: 'A simple, calm choice.',
    baseTitle: 'BASE from €50',
    premiumTitle: 'PREMIUM from €100',
    premiumBadge: 'Less decisions',
    baseOutcome: 'For clarity and to move forward.',
    premiumOutcome: 'To reduce mental load as much as possible.',
    baseBenefits: ['Light itinerary', 'Clear comparisons', 'Decision support'],
    premiumBenefits: ['Day-by-day plan', 'Aligned experiences', 'Support before and during'],
    pricingNote: 'Prices vary by duration and complexity.',
    baseIncludes: [
      'TravelBuddies family diagnosis',
      'Itinerary adapted to profiles (destination, pace, style)',
      'Flight and lodging suggestions (with booking option)',
      'Bureaucracy checklist (docs, health, etc.)',
      'Decision support',
      'Mini destination guide',
    ],
    premiumIncludes: [
      'Day-by-day planning (realistic pace with kids)',
      'Experiences suggestion and booking',
      'Support during the trip',
    ],
    howTitle: 'How it works',
    howSteps: [
      { title: 'Short diagnosis', text: 'We listen to your family.' },
      { title: 'Design and align', text: 'We adjust together, calmly.' },
      { title: 'Travel with confidence', text: 'We stay close.' },
    ],
    trustTitle: 'Trust and calm',
    trustCards: [
      { title: 'Not a traditional agency', text: 'We plan like parents.' },
      { title: 'Real life first', text: 'No unrealistic promises.' },
      { title: 'Human presence', text: 'Close support.' },
    ],
    formTitle: 'TravelBuddies Diagnosis',
    formBody: 'Share the essentials. We simplify.',
    formHint: 'Takes 2–3 minutes. Human response, no automation.',
    formFields: {
      name: 'Name',
      email: 'Email',
      dates: 'When is the trip?',
      service: 'Preferred service',
      who: 'Who is traveling? (optional)',
      budget: 'Budget (optional)',
      notes: 'Additional notes (optional)',
    },
    formPlaceholders: {
      dates: 'July 2026',
      who: '2 adults + 1 child',
      budget: '€1500',
      notes: 'Preferences, allergies, etc.',
    },
    formToggle: 'Add details (optional)',
    formServiceOptions: ['Premium', 'Base', 'Not sure'],
    formSubmit: 'Começar diagnóstico',
    formSuccessTitle: 'Message ready',
    formSuccessBody: 'Automatically copied.',
    formThankTitle: 'Thank you! We received your request.',
    formThankBody: 'We will review it calmly and reply with a clear proposal.',
    formThankNote: 'Human response, usually within 24–48 business hours.',
    whatsapp: 'Send via WhatsApp',
    email: 'Send via Email',
    instagram: 'Chat on Instagram',
    footerTitle: 'TravelBuddies',
    footerBody: 'We are here to help your family.',
    footerSmall: 'With care, TravelBuddies.',
    messageTitle: 'TravelBuddies Diagnosis Request',
  },
}

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const Reveal = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={revealVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

const SmartImage = ({ src, fallback, alt, className }) => {
  const [current, setCurrent] = useState(src)

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={() => setCurrent(fallback)}
      loading="lazy"
    />
  )
}

const buildMessage = (lang, form) => {
  const t = copy[lang]
  const labels = t.formFields
  const lines = [
    `${labels.name}: ${form.name}`,
    `${labels.email}: ${form.email}`,
    form.dates ? `${labels.dates}: ${form.dates}` : null,
    `${labels.service}: ${form.service}`,
    form.who ? `${labels.who}: ${form.who}` : null,
    form.budget ? `${labels.budget}: ${form.budget}` : null,
    form.notes ? `${labels.notes}: ${form.notes}` : null,
  ].filter(Boolean)

  return [t.messageTitle, '', ...lines].join('\n')
}

export default function App() {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'pt'
    return localStorage.getItem(LANG_STORAGE_KEY) || 'pt'
  })

  const [form, setForm] = useState({
    name: '',
    email: '',
    who: '',
    dates: '',
    budget: '',
    service: copy.pt.formServiceOptions[2],
    notes: '',
  })

  const [message, setMessage] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const t = copy[lang]

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const options = copy[lang].formServiceOptions
    setForm((prev) => ({
      ...prev,
      service: options.includes(prev.service) ? prev.service : options[2],
    }))
  }, [lang])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus(lang === 'pt' ? 'Copiado!' : 'Copied!')
      setTimeout(() => setCopyStatus(''), 2000)
    } catch (error) {
      setCopyStatus(lang === 'pt' ? 'Copia manual necessária' : 'Copy manually')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const built = buildMessage(lang, form)
    setMessage(built)
    await copyToClipboard(built)
  }

  const links = useMemo(() => {
    if (!message) return null
    const subject = encodeURIComponent(t.messageTitle)
    const body = encodeURIComponent(message)
    return {
      whatsapp: `https://wa.me/351919676329?text=${body}`,
      email: `mailto:joana_krisna@hotmail.com?subject=${subject}&body=${body}`,
      instagram: 'https://www.instagram.com/family_in_trouble/',
    }
  }, [message, t.messageTitle])

  const container = 'mx-auto w-full max-w-6xl px-6'

  return (
    <div className="text-navy">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 border-b border-navy/10">
        <div className={`${container} flex items-center justify-between py-4`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-tealSoft/80 border border-teal/40 flex items-center justify-center">
              <img src={logo} alt="TravelBuddies" className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-lg">TravelBuddies</p>
              <p className="text-xs text-navy/60">Organizamos Viagens em Família</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {t.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-navy/70 hover:text-navy">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={lang === 'pt' ? '#diagnostico' : '#diagnosis'}
              className="hidden sm:inline-flex items-center rounded-full border border-navy/20 px-4 py-2 text-xs text-navy/80 hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {t.primaryCta}
            </a>
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-xs border ${
                lang === 'pt' ? 'bg-navy text-white border-navy' : 'border-navy/20 text-navy/70'
              }`}
              onClick={() => setLang('pt')}
            >
              PT
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-xs border ${
                lang === 'en' ? 'bg-navy text-white border-navy' : 'border-navy/20 text-navy/70'
              }`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-12 pb-10 sm:pt-14 sm:pb-12 lg:pt-20 lg:pb-16">
          <div className={`${container} grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center`}>
            <Reveal>
              <p className="text-sm uppercase tracking-[0.2em] text-navy/50">{t.heroTag}</p>
              <h1 className="mt-4 text-4xl lg:text-6xl font-display leading-tight text-balance">
                {t.heroTitle}
              </h1>
              <p className="mt-3 text-lg text-navy/70 text-balance max-w-xl">{t.heroBody}</p>
              <div className="mt-5">
                <a
                  href={lang === 'pt' ? '#diagnostico' : '#diagnosis'}
                  className="inline-flex px-7 py-3 rounded-full bg-navy text-white shadow-soft hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {t.primaryCta}
                </a>
                <p className="mt-2 text-xs text-navy/60">{t.heroCtaNote}</p>
              </div>
            </Reveal>
            <Reveal className="relative">
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-tealSoft/70 blur-2xl" />
              <div className="rounded-[32px] border border-navy/10 bg-white/90 shadow-soft overflow-hidden">
                <SmartImage
                  src={REMOTE_IMAGES.hero}
                  fallback={heroImage}
                  alt="Family traveling"
                  className="h-[220px] sm:h-[280px] lg:h-[340px] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="qualify" className="py-10">
          <div className={container}>
            <Reveal>
              <h2 className="text-2xl font-display">{t.qualifyTitle}</h2>
            </Reveal>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {t.qualifyItems.map((item) => (
                <Reveal
                  key={item.title}
                  className="rounded-2xl border border-navy/10 bg-white/85 p-4 shadow-card"
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-navy/60">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="py-12">
          <div className={container}>
            <Reveal>
              <h2 className="text-2xl font-display">{t.howTitle}</h2>
            </Reveal>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {t.howSteps.map((step, index) => (
                <Reveal key={step.title} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 bg-tealSoft/60 text-sm">
                      {index + 1}
                    </span>
                    <p className="text-sm font-semibold">{step.title}</p>
                  </div>
                  <p className="mt-2 text-xs text-navy/60">{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-12 bg-white/70">
          <div className={container}>
            <Reveal>
              <h2 className="text-2xl font-display">{t.servicesTitle}</h2>
              <p className="mt-2 text-navy/70">{t.servicesBody}</p>
            </Reveal>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Reveal className="rounded-3xl border border-navy/10 p-6 shadow-card bg-white">
                <p className="text-xs uppercase tracking-[0.2em] text-navy/60">{t.baseTitle}</p>
                <p className="mt-3 text-sm text-navy/70">{t.baseOutcome}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.baseBenefits.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-navy/10 bg-tealSoft/60 px-3 py-1 text-xs text-navy/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal className="relative rounded-3xl border border-navy/10 p-6 shadow-card bg-cream/40">
                <span className="absolute right-5 top-5 rounded-full bg-navy text-white px-3 py-1 text-xs">
                  {t.premiumBadge}
                </span>
                <p className="text-xs uppercase tracking-[0.2em] text-navy/60">{t.premiumTitle}</p>
                <p className="mt-3 text-sm text-navy/70">{t.premiumOutcome}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.premiumBenefits.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-navy/10 bg-white/70 px-3 py-1 text-xs text-navy/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
            <p className="mt-4 text-sm text-navy/60">{t.pricingNote}</p>
          </div>
        </section>

        <section id="trust" className="py-12">
          <div className={container}>
            <Reveal>
              <h2 className="text-2xl font-display">{t.trustTitle}</h2>
            </Reveal>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {t.trustCards.map((card) => (
                <Reveal
                  key={card.title}
                  className="rounded-2xl border border-navy/10 bg-white/85 p-5 shadow-card"
                >
                  <p className="text-sm font-semibold">{card.title}</p>
                  <p className="mt-2 text-xs text-navy/60">{card.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id={lang === 'pt' ? 'diagnostico' : 'diagnosis'} className="py-16">
          <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1fr]`}>
            <Reveal>
              <h2 className="text-3xl font-display">{t.formTitle}</h2>
              <p className="mt-3 text-navy/70">{t.formBody}</p>
              <p className="mt-2 text-xs text-navy/50">{t.formHint}</p>
              <div className="mt-6 rounded-3xl border border-navy/10 p-6 bg-white/80 shadow-card">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-navy/60" htmlFor="name">{t.formFields.name}</label>
                      <input
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="rounded-xl border border-navy/10 px-3 py-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-navy/60" htmlFor="email">{t.formFields.email}</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="rounded-xl border border-navy/10 px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-navy/60" htmlFor="dates">{t.formFields.dates}</label>
                      <input
                        id="dates"
                        name="dates"
                        value={form.dates}
                        onChange={handleChange}
                        placeholder={t.formPlaceholders.dates}
                        className="rounded-xl border border-navy/10 px-3 py-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-navy/60" htmlFor="service">{t.formFields.service}</label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="rounded-xl border border-navy/10 px-3 py-2"
                      >
                        {copy[lang].formServiceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDetails((prev) => !prev)}
                    className="text-left text-sm text-navy/70 hover:text-navy focus-visible:outline-none focus-visible:underline"
                  >
                    {t.formToggle}
                  </button>
                  {showDetails && (
                    <div className="grid gap-4 rounded-2xl border border-dashed border-navy/10 p-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-navy/60" htmlFor="who">{t.formFields.who}</label>
                          <input
                            id="who"
                            name="who"
                            value={form.who}
                            onChange={handleChange}
                            placeholder={t.formPlaceholders.who}
                            className="rounded-xl border border-navy/10 px-3 py-2"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-navy/60" htmlFor="budget">{t.formFields.budget}</label>
                          <input
                            id="budget"
                            name="budget"
                            value={form.budget}
                            onChange={handleChange}
                            placeholder={t.formPlaceholders.budget}
                            className="rounded-xl border border-navy/10 px-3 py-2"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-navy/60" htmlFor="notes">{t.formFields.notes}</label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows="4"
                          value={form.notes}
                          onChange={handleChange}
                          placeholder={t.formPlaceholders.notes}
                          className="rounded-xl border border-navy/10 px-3 py-2"
                        />
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="rounded-full bg-navy text-white py-3 shadow-soft hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    {t.formSubmit}
                  </button>
                </form>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-3xl border border-navy/10 bg-white/90 p-6 shadow-card">
                {message ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold">{t.formThankTitle}</p>
                      <p className="mt-2 text-xs text-navy/60">{t.formThankBody}</p>
                      <p className="mt-2 text-xs text-navy/60">{t.formThankNote}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.formSuccessTitle}</p>
                      <p className="text-xs text-navy/60 mt-2">{t.formSuccessBody}</p>
                      {copyStatus && <p className="mt-2 text-xs text-teal">{copyStatus}</p>}
                      <div className="mt-4 rounded-2xl border border-dashed border-navy/20 bg-cream/40 p-4 min-h-[140px] whitespace-pre-wrap text-sm text-navy/70">
                        {message}
                      </div>
                    </div>
                    {links && (
                      <div className="grid gap-3">
                        <a href={links.whatsapp} className="rounded-full bg-teal text-navy px-4 py-3 text-center">
                          {t.whatsapp}
                        </a>
                        <a
                          href={links.email}
                          className="rounded-full border border-navy/20 px-4 py-3 text-center hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        >
                          {t.email}
                        </a>
                        <a
                          href={links.instagram}
                          className="rounded-full border border-navy/20 px-4 py-3 text-center hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                          onClick={async (event) => {
                            if (!message) return
                            event.preventDefault()
                            await copyToClipboard(message)
                            window.open(links.instagram, '_blank')
                          }}
                        >
                          {t.instagram}
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold">{t.formSuccessTitle}</p>
                    <p className="text-xs text-navy/60 mt-2">{t.formSuccessBody}</p>
                    <div className="mt-4 rounded-2xl border border-dashed border-navy/20 bg-cream/40 p-4 min-h-[160px] whitespace-pre-wrap text-sm text-navy/70">
                      {lang === 'pt' ? 'Preenche o formulário para gerar a mensagem.' : 'Fill the form to generate the message.'}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-navy/10 bg-white/85">
        <div className={`${container} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
          <div className="space-y-2">
            <p className="font-display text-lg">{t.footerTitle}</p>
            <p className="text-sm text-navy/60">{t.footerBody}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-navy/70">
            <a
              href="https://wa.me/351919676329"
              className="rounded-full border border-navy/10 px-4 py-2 hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              WhatsApp
            </a>
            <a
              href="mailto:joana_krisna@hotmail.com"
              className="rounded-full border border-navy/10 px-4 py-2 hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Email
            </a>
            <a
              href="https://www.instagram.com/family_in_trouble/"
              className="rounded-full border border-navy/10 px-4 py-2 hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Instagram
            </a>
          </div>
          <p className="text-xs text-navy/50">{t.footerSmall}</p>
        </div>
      </footer>
      <Analytics />
    </div>
  )
}
