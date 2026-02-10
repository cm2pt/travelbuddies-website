import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import logo from './assets/logo.png'
import heroImage from './assets/hero.jpg'
import tile1 from './assets/tile1.jpg'
import tile2 from './assets/tile2.jpg'

const FALLBACKS = {
  hero:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
  tile1:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  tile2:
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
}

const LANG_STORAGE_KEY = 'travelbuddies_lang'

const copy = {
  pt: {
    navLinks: [
      { href: '#services', label: 'Serviços' },
      { href: '#how', label: 'Como funciona' },
      { href: '#diagnostico', label: 'Diagnóstico' },
    ],
    heroTag: 'TravelBuddies | Organizamos Viagens em Família',
    heroTitle: 'Viagens em família sem stress, com um plano realista e bonito.',
    heroBody:
      'Criamos roteiros pensados para o ritmo dos miúdos, decisões mais fáceis e experiências que todos aproveitam.',
    heroCta: 'Quero um diagnóstico',
    heroSecondary: 'Ver serviços',
    proofItems: [
      { title: 'Planeamento humano', text: 'Ritmo realista, sem exageros.' },
      { title: 'Decisões rápidas', text: 'Comparativos claros e escolhas seguras.' },
      { title: 'Apoio durante', text: 'Continuamos por perto.' },
      { title: 'Famílias reais', text: 'Não é Pinterest, é vida.' },
    ],
    realLifeTitle: 'A vida real não é Pinterest.',
    realLifeBody:
      'Transformamos o caos das viagens em família num roteiro leve, bonito e exequível.',
    tile1Title: 'Momentos simples, sem pressa.',
    tile2Title: 'Espaço para todos descansarem.',
    painCards: [
      {
        title: 'Dias sobrecarregados',
        text: 'Roteiros que parecem maratonas não funcionam com crianças.',
      },
      {
        title: 'Decisões eternas',
        text: 'Pesquisar tudo demora tempo e drena energia.',
      },
      {
        title: 'Falta de flexibilidade',
        text: 'O plano precisa adaptar-se ao ritmo da família.',
      },
    ],
    servicesTitle: 'Serviços TravelBuddies',
    servicesBody: 'Escolhe o nível de apoio. Nós tratamos do resto.',
    baseTitle: 'BASE desde 50€',
    premiumTitle: 'PREMIUM desde 100€',
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
      {
        title: 'Diagnóstico rápido',
        text: 'Entendemos o perfil da família, datas e prioridades.',
      },
      {
        title: 'Proposta clara',
        text: 'Apresentamos o roteiro e opções ajustadas ao vosso ritmo.',
      },
      {
        title: 'Escolhas simples',
        text: 'Ajudamos a decidir voos, alojamento e experiências.',
      },
      {
        title: 'Acompanhamento',
        text: 'Suporte antes e durante a viagem.',
      },
    ],
    formTitle: 'Pede o teu Diagnóstico TravelBuddies',
    formBody: 'Preenche os dados principais e nós criamos uma proposta alinhada com a tua família.',
    formFields: {
      name: 'Nome',
      email: 'Email',
      who: 'Quem viaja?',
      dates: 'Datas ou período',
      budget: 'Orçamento',
      service: 'Serviço preferido',
      notes: 'Notas adicionais',
    },
    formServiceOptions: ['Premium', 'Base', 'Ainda não sei'],
    formSubmit: 'Gerar mensagem',
    formSuccessTitle: 'Mensagem pronta para enviar',
    formSuccessBody: 'Cópia automática para a área de transferência.',
    whatsapp: 'Enviar por WhatsApp',
    email: 'Enviar por Email',
    instagram: 'Falar no Instagram',
    footerTitle: 'TravelBuddies',
    footerBody: 'Viagens em família com intenção, leveza e beleza.',
    footerSmall: '© 2026 TravelBuddies. Todos os direitos reservados.',
    messageTitle: 'Pedido de Diagnóstico TravelBuddies',
  },
  en: {
    navLinks: [
      { href: '#services', label: 'Services' },
      { href: '#how', label: 'How it works' },
      { href: '#diagnosis', label: 'Diagnosis' },
    ],
    heroTag: 'TravelBuddies | Family Trip Design',
    heroTitle: 'Family travel with less stress and a plan that actually works.',
    heroBody: 'We craft itineraries designed for kids, faster decisions, and shared experiences.',
    heroCta: 'Start diagnosis',
    heroSecondary: 'See services',
    proofItems: [
      { title: 'Human pace', text: 'Realistic days with kids.' },
      { title: 'Clear choices', text: 'Clean comparisons, confident picks.' },
      { title: 'Ongoing support', text: 'We stay close.' },
      { title: 'Real families', text: 'Not Pinterest, real life.' },
    ],
    realLifeTitle: 'Real life is not Pinterest.',
    realLifeBody: 'We turn family travel chaos into light, beautiful, doable itineraries.',
    tile1Title: 'Simple moments, no rush.',
    tile2Title: 'Space for everyone to rest.',
    painCards: [
      { title: 'Overpacked days', text: 'Marathon schedules do not work with kids.' },
      { title: 'Endless research', text: 'Planning drains time and energy.' },
      { title: 'No flexibility', text: 'Plans should adapt to the family pace.' },
    ],
    servicesTitle: 'TravelBuddies Services',
    servicesBody: 'Pick the level of support. We handle the rest.',
    baseTitle: 'BASE from €50',
    premiumTitle: 'PREMIUM from €100',
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
      { title: 'Quick diagnosis', text: 'We learn the family profile, dates, priorities.' },
      { title: 'Clear proposal', text: 'We deliver a tailored itinerary and options.' },
      { title: 'Simple choices', text: 'We help decide flights, lodging, experiences.' },
      { title: 'Follow-up', text: 'Support before and during the trip.' },
    ],
    formTitle: 'Request your TravelBuddies Diagnosis',
    formBody: 'Share the essentials and we will craft a proposal aligned to your family.',
    formFields: {
      name: 'Name',
      email: 'Email',
      who: 'Who is traveling?',
      dates: 'Dates or timeframe',
      budget: 'Budget',
      service: 'Preferred service',
      notes: 'Additional notes',
    },
    formServiceOptions: ['Premium', 'Base', 'Not sure'],
    formSubmit: 'Generate message',
    formSuccessTitle: 'Message ready to send',
    formSuccessBody: 'Automatically copied to clipboard.',
    whatsapp: 'Send via WhatsApp',
    email: 'Send via Email',
    instagram: 'Chat on Instagram',
    footerTitle: 'TravelBuddies',
    footerBody: 'Family trips with intention, ease, and beauty.',
    footerSmall: '© 2026 TravelBuddies. All rights reserved.',
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

  return [
    t.messageTitle,
    '',
    `${labels.name}: ${form.name}`,
    `${labels.email}: ${form.email}`,
    `${labels.who}: ${form.who}`,
    `${labels.dates}: ${form.dates}`,
    `${labels.budget}: ${form.budget}`,
    `${labels.service}: ${form.service}`,
    `${labels.notes}: ${form.notes}`,
  ].join('\n')
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
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-navy/10">
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
        <section className="pt-20 pb-16">
          <div className={`${container} grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center`}>
            <Reveal>
              <p className="text-sm uppercase tracking-[0.2em] text-navy/60">{t.heroTag}</p>
              <h1 className="mt-4 text-4xl lg:text-5xl font-display leading-tight text-balance">
                {t.heroTitle}
              </h1>
              <p className="mt-4 text-lg text-navy/70 text-balance">{t.heroBody}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={lang === 'pt' ? '#diagnostico' : '#diagnosis'}
                  className="px-6 py-3 rounded-full bg-navy text-white shadow-soft"
                >
                  {t.heroCta}
                </a>
                <a
                  href="#services"
                  className="px-6 py-3 rounded-full border border-navy/20 text-navy/80"
                >
                  {t.heroSecondary}
                </a>
              </div>
            </Reveal>
            <Reveal className="relative">
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-tealSoft/70 blur-2xl" />
              <div className="rounded-[32px] border border-navy/10 bg-white/90 shadow-soft overflow-hidden">
                <SmartImage
                  src={heroImage}
                  fallback={FALLBACKS.hero}
                  alt="Family traveling"
                  className="h-[320px] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-6">
          <div className={container}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.proofItems.map((item) => (
                <Reveal
                  key={item.title}
                  className="rounded-2xl border border-navy/10 bg-white/80 p-4 shadow-card"
                >
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-navy/60 mt-2">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className={`${container} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start`}>
            <Reveal>
              <p className="text-sm uppercase tracking-[0.2em] text-navy/60">{t.realLifeTitle}</p>
              <h2 className="mt-4 text-3xl font-display">{t.realLifeBody}</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl overflow-hidden border border-navy/10 shadow-card">
                  <SmartImage
                    src={tile1}
                    fallback={FALLBACKS.tile1}
                    alt={t.tile1Title}
                    className="h-48 w-full object-cover"
                  />
                  <p className="p-4 text-sm text-navy/70">{t.tile1Title}</p>
                </div>
                <div className="rounded-3xl overflow-hidden border border-navy/10 shadow-card">
                  <SmartImage
                    src={tile2}
                    fallback={FALLBACKS.tile2}
                    alt={t.tile2Title}
                    className="h-48 w-full object-cover"
                  />
                  <p className="p-4 text-sm text-navy/70">{t.tile2Title}</p>
                </div>
              </div>
            </Reveal>
            <div className="grid gap-4">
              {t.painCards.map((card) => (
                <Reveal key={card.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
                  <p className="font-semibold">{card.title}</p>
                  <p className="mt-2 text-sm text-navy/60">{card.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-white/70">
          <div className={container}>
            <Reveal>
              <h2 className="text-3xl font-display">{t.servicesTitle}</h2>
              <p className="mt-2 text-navy/70">{t.servicesBody}</p>
            </Reveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <Reveal className="rounded-3xl border border-navy/10 p-6 shadow-card bg-white">
                <p className="text-xs uppercase tracking-[0.2em] text-navy/60">{t.baseTitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-navy/70">
                  {t.baseIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="rounded-3xl border border-navy/10 p-6 shadow-card bg-cream/40">
                <p className="text-xs uppercase tracking-[0.2em] text-navy/60">{t.premiumTitle}</p>
                <ul className="mt-4 space-y-2 text-sm text-navy/70">
                  {t.baseIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blush" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {t.premiumIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blush" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <p className="mt-4 text-sm text-navy/60">{t.pricingNote}</p>
          </div>
        </section>

        <section id="how" className="py-16">
          <div className={container}>
            <Reveal>
              <h2 className="text-3xl font-display">{t.howTitle}</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {t.howSteps.map((step, index) => (
                <Reveal key={step.title} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
                  <p className="text-xs text-navy/50">0{index + 1}</p>
                  <p className="mt-2 font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm text-navy/60">{step.text}</p>
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
                      <label className="text-xs text-navy/60" htmlFor="who">{t.formFields.who}</label>
                      <input
                        id="who"
                        name="who"
                        value={form.who}
                        onChange={handleChange}
                        className="rounded-xl border border-navy/10 px-3 py-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-navy/60" htmlFor="dates">{t.formFields.dates}</label>
                      <input
                        id="dates"
                        name="dates"
                        value={form.dates}
                        onChange={handleChange}
                        className="rounded-xl border border-navy/10 px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-navy/60" htmlFor="budget">{t.formFields.budget}</label>
                      <input
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
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
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-navy/60" htmlFor="notes">{t.formFields.notes}</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows="4"
                      value={form.notes}
                      onChange={handleChange}
                      className="rounded-xl border border-navy/10 px-3 py-2"
                    />
                  </div>
                  <button type="submit" className="rounded-full bg-navy text-white py-3 shadow-soft">
                    {t.formSubmit}
                  </button>
                </form>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-3xl border border-navy/10 bg-white/90 p-6 shadow-card">
                <p className="text-sm font-semibold">{t.formSuccessTitle}</p>
                <p className="text-xs text-navy/60 mt-2">{t.formSuccessBody}</p>
                {copyStatus && <p className="mt-2 text-xs text-teal">{copyStatus}</p>}
                <div className="mt-4 rounded-2xl border border-dashed border-navy/20 bg-cream/40 p-4 min-h-[180px] whitespace-pre-wrap text-sm text-navy/70">
                  {message || (lang === 'pt' ? 'Preenche o formulário para gerar a mensagem.' : 'Fill the form to generate the message.')}
                </div>
                {links && (
                  <div className="mt-6 grid gap-3">
                    <a href={links.whatsapp} className="rounded-full bg-teal text-navy px-4 py-3 text-center">
                      {t.whatsapp}
                    </a>
                    <a href={links.email} className="rounded-full border border-navy/20 px-4 py-3 text-center">
                      {t.email}
                    </a>
                    <a
                      href={links.instagram}
                      className="rounded-full border border-navy/20 px-4 py-3 text-center"
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
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-navy/10 bg-white/80">
        <div className={`${container} flex flex-col gap-4 md:flex-row md:items-center md:justify-between`}>
          <div>
            <p className="font-display text-lg">{t.footerTitle}</p>
            <p className="text-sm text-navy/60">{t.footerBody}</p>
          </div>
          <p className="text-xs text-navy/50">{t.footerSmall}</p>
        </div>
      </footer>
    </div>
  )
}
