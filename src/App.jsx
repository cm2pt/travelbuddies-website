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
const WIZARD_STORAGE_KEY = 'travelbuddies_wizard'

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
    formHint: 'Demora 2–3 minutos. Resposta humana. Sem compromisso.',
    wizardIntroTitle: 'Diagnóstico em família, na vida real',
    wizardIntroBody:
      'Ajuda-nos a perceber o que funciona para a vossa família. Primeiro respondem ao questionário e depois recebem uma proposta.',
    wizardPricingLines: [
      'Orçamento e marcação de viagem (gratuito)',
      'Organização Base — 60€',
      'Premium — 130€',
    ],
    wizardPricingNote: 'Valores variam consoante a complexidade e duração.',
    wizardStepTitles: [
      'Email',
      'Sobre a viagem',
      'Estilo de alojamento',
      'Tipo de serviço',
      'Perfil de viajantes',
      'Experiências anteriores',
    ],
    wizardStepHelpers: [
      'Só para conseguirmos responder-te.',
      'Ajuda-nos a perceber o ritmo ideal.',
      'Para dormir bem e com pouco stress.',
      'Para alinharmos o nível de apoio.',
      'Cada família é única, contamos contigo.',
      'O que já viveram ajuda-nos muito.',
    ],
    wizardQuestions: {
      email: 'Email',
      destination: 'Qual é o destino da viagem? Tens algum destino em mente? Se sim, qual?',
      attraction: 'Quando vão de férias, o que vos atrai mais?',
      motivation: 'Qual é a principal motivação desta viagem?',
      dates: 'Tens data definida para a Viagem? É flexível?',
      people: 'Quantas pessoas vão viajar? Indica a idade das crianças, no caso de irem.',
      meal: 'Que tipo de regime alimentar preferem?',
      lodging: 'Que tipo de alojamento preferes?',
      lodgingValues: 'O que valorizam mais quando escolhem um alojamento?',
      budget:
        'Qual é o vosso orçamento aproximado? Esta pergunta vai nos permitir ver opções mais ajustadas à realidade',
      service: 'Que tipo de ajuda procuram?',
      motherProfile: 'Vamos conhecer o perfil da Mãe',
      fatherProfile: 'Vamos conhecer o perfil do Pai',
      child1: 'E os filhos? Começando pelo mais velho',
      child2: 'E o filho do meio?',
      child3: 'Finalmente o mais novo (Caso tenham mais filhos, escreve nos comentários finais)',
      familyTraveled: 'Já viajaram em família antes?',
      previousTrips: 'Para onde foram e o que correu bem em viagens anteriores?',
      hardest: 'O que foi mais difícil ou stressante?',
      success: 'O que faria esta viagem ser um sucesso para vocês? E o que gostariam de evitar?',
      moreInfo: 'Há mais alguma informação importante que devamos saber?',
    },
    wizardNext: 'Seguinte',
    wizardBack: 'Voltar',
    wizardSubmit: 'Gerar resumo',
    wizardProgress: 'Passo',
    wizardProgressNote: 'Falta pouco.',
    wizardOptional: 'Adicionar detalhes (opcional)',
    wizardSummaryTitle: 'Resumo',
    wizardSummaryBody: 'Revê e envia pelo canal que preferires.',
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
    wizardOptions: {
      attraction: [
        'Cidade',
        'Praia',
        'Natureza',
        'Mistura de tudo',
        'Ainda não sei mas vais me ajudar a descobrir',
        'Other',
      ],
      motivation: [
        'Descanso',
        'Aventura',
        'Tempo de qualidade em família',
        'Celebração (aniversário, lua de mel, etc.)',
        'Conhecer outra cultura',
        'Other',
      ],
      meal: ['Tudo incluído', 'Meia - Pensão', 'Pequeno-almoço', 'Sem refeições incluídas', 'Ainda não sei'],
      lodging: ['Hotel', 'Apartamento', 'Resort', 'Casa de Locais', 'Não tenho preferência'],
      lodgingValues: [
        'Localização',
        'Preço',
        'Conforto',
        'Atividades para Crianças',
        'Possibilidade de ter dois quartos ou sala com cama para as crianças',
        'Serviços (Cozinha, Maquina de Lavar, etc)',
        'Hotel na Praia',
        'Piscina',
        'Other',
      ],
      service: [
        'Organização de Viagem em família (Plano Base)',
        'Organização de Viagem em família (Premium)',
        'Orçamento e marcação de viagem',
        'Ainda não sei',
      ],
      parentProfileMother: [
        'Gosta de planear e ter tudo controlado',
        'Precisa de conforto e pausas',
        'Gosta de explorar e improvisar',
        'Para ela o importante é estarem juntos e todos bem',
        'Viaja sobretudo para descansar',
        'O mais importante para ela são as novas Experiências',
      ],
      parentProfileFather: [
        'Gosta de planear e ter tudo controlado',
        'Precisa de conforto e pausas',
        'Gosta de explorar e improvisar',
        'Para ele o importante é estarem juntos e bem',
        'Viaja sobretudo para descansar',
        'O mais importante para ele são as novas Experiências',
      ],
      childProfile: [
        'Sensível a mudanças de rotina',
        'Adaptável e tranquilo',
        'Ativo e curioso',
        'Precisa de sestas e tranquilidade para as fazer',
        'Dá-se bem com novos ambientes',
        'Gosta de saber tudo sobre os sítios para onde vão',
        'O mais importante para ele é ir à frente',
        'Vibra com as novas experiências',
        'Para ele está tudo bem desde que estejam juntos',
      ],
      familyTraveled: ['Sim', 'Não'],
    },
    formToggle: 'Adicionar detalhes (opcional)',
    formServiceOptions: ['Premium', 'Base', 'Ainda não sei'],
    formSubmit: 'Começar diagnóstico',
    formSuccessTitle: 'Mensagem pronta',
    formSuccessBody: 'Copiada automaticamente.',
    formThankTitle: 'Obrigado! Já recebemos o teu pedido.',
    formThankBody: 'Vamos analisar com calma e responder com uma proposta clara.',
    formThankNote: 'Resposta humana, normalmente em 24–48h úteis.',
    messageLabels: {
      email: 'Email',
      destination: 'Destino',
      attraction: 'Atrai mais',
      motivation: 'Motivação',
      dates: 'Datas',
      people: 'Pessoas',
      meal: 'Regime alimentar',
      lodging: 'Alojamento',
      lodgingValues: 'Valorizam',
      budget: 'Orçamento',
      service: 'Tipo de ajuda',
      motherProfile: 'Perfil da Mãe',
      fatherProfile: 'Perfil do Pai',
      child1: 'Filho mais velho',
      child2: 'Filho do meio',
      child3: 'Filho mais novo',
      familyTraveled: 'Já viajaram em família',
      previousTrips: 'Viagens anteriores',
      hardest: 'Mais difícil',
      success: 'Sucesso para vocês',
      moreInfo: 'Mais info',
    },
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
    formHint: 'Takes 2–3 minutes. Human response. No commitment.',
    wizardIntroTitle: 'Family diagnosis for real life',
    wizardIntroBody:
      'Help us understand what works for your family. First you answer the questionnaire, then you receive a proposal.',
    wizardPricingLines: [
      'Trip budgeting and booking (free)',
      'Base Organization — 60€',
      'Premium — 130€',
    ],
    wizardPricingNote: 'Values vary by complexity and duration.',
    wizardStepTitles: [
      'Email',
      'About the trip',
      'Lodging style',
      'Service type',
      'Traveler profiles',
      'Past experiences',
    ],
    wizardStepHelpers: [
      'So we can reply to you.',
      'Helps us understand the right pace.',
      'For better rest and less stress.',
      'So we align the level of support.',
      'Every family is different.',
      'Your past helps us a lot.',
    ],
    wizardQuestions: {
      email: 'Email',
      destination: 'What is the trip destination? Do you have one in mind? If yes, which?',
      attraction: 'When you go on holiday, what attracts you most?',
      motivation: 'What is the main motivation for this trip?',
      dates: 'Do you have dates defined for the trip? Is it flexible?',
      people: 'How many people will travel? Include children’s ages if any.',
      meal: 'Which meal plan do you prefer?',
      lodging: 'What type of lodging do you prefer?',
      lodgingValues: 'What do you value most when choosing lodging?',
      budget:
        'What is your approximate budget? This helps us see options closer to reality.',
      service: 'What kind of help are you looking for?',
      motherProfile: 'Let’s get to know the mother’s profile',
      fatherProfile: 'Let’s get to know the father’s profile',
      child1: 'And the kids? Starting with the oldest',
      child2: 'And the middle child?',
      child3: 'Finally the youngest (if more, write in final comments)',
      familyTraveled: 'Have you traveled as a family before?',
      previousTrips: 'Where did you go and what went well?',
      hardest: 'What was the hardest or most stressful?',
      success: 'What would make this trip a success for you? What would you like to avoid?',
      moreInfo: 'Any other important information we should know?',
    },
    wizardNext: 'Next',
    wizardBack: 'Back',
    wizardSubmit: 'Generate summary',
    wizardProgress: 'Step',
    wizardProgressNote: 'Almost there.',
    wizardOptional: 'Add details (optional)',
    wizardSummaryTitle: 'Summary',
    wizardSummaryBody: 'Review and send via your preferred channel.',
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
    wizardOptions: {
      attraction: [
        'City',
        'Beach',
        'Nature',
        'A mix of everything',
        'Not sure yet, but you will help me find out',
        'Other',
      ],
      motivation: [
        'Rest',
        'Adventure',
        'Quality family time',
        'Celebration (birthday, honeymoon, etc.)',
        'Discover another culture',
        'Other',
      ],
      meal: ['All inclusive', 'Half-board', 'Breakfast', 'No meals included', 'Not sure yet'],
      lodging: ['Hotel', 'Apartment', 'Resort', 'Local home', 'No preference'],
      lodgingValues: [
        'Location',
        'Price',
        'Comfort',
        'Kids activities',
        'Two bedrooms or living room bed for kids',
        'Services (kitchen, washing machine, etc.)',
        'Beachfront hotel',
        'Pool',
        'Other',
      ],
      service: [
        'Family trip organization (Base Plan)',
        'Family trip organization (Premium)',
        'Trip budgeting and booking',
        'Not sure',
      ],
      parentProfileMother: [
        'Likes to plan and have everything controlled',
        'Needs comfort and breaks',
        'Likes to explore and improvise',
        'For her, the most important is being together and well',
        'Travels mainly to rest',
        'For her, new experiences matter most',
      ],
      parentProfileFather: [
        'Likes to plan and have everything controlled',
        'Needs comfort and breaks',
        'Likes to explore and improvise',
        'For him, the most important is being together and well',
        'Travels mainly to rest',
        'For him, new experiences matter most',
      ],
      childProfile: [
        'Sensitive to routine changes',
        'Adaptable and calm',
        'Active and curious',
        'Needs naps and calm to take them',
        'Does well in new environments',
        'Likes to know everything about where they go',
        'The most important for them is to be in front',
        'Thrives on new experiences',
        'For them it is fine as long as we are together',
      ],
      familyTraveled: ['Yes', 'No'],
    },
    formToggle: 'Add details (optional)',
    formServiceOptions: ['Premium', 'Base', 'Not sure'],
    formSubmit: 'Começar diagnóstico',
    formSuccessTitle: 'Message ready',
    formSuccessBody: 'Automatically copied.',
    formThankTitle: 'Thank you! We received your request.',
    formThankBody: 'We will review it calmly and reply with a clear proposal.',
    formThankNote: 'Human response, usually within 24–48 business hours.',
    messageLabels: {
      email: 'Email',
      destination: 'Destination',
      attraction: 'Attracted to',
      motivation: 'Motivation',
      dates: 'Dates',
      people: 'People',
      meal: 'Meal plan',
      lodging: 'Lodging',
      lodgingValues: 'Priorities',
      budget: 'Budget',
      service: 'Type of help',
      motherProfile: 'Mother profile',
      fatherProfile: 'Father profile',
      child1: 'Oldest child',
      child2: 'Middle child',
      child3: 'Youngest child',
      familyTraveled: 'Traveled as a family',
      previousTrips: 'Previous trips',
      hardest: 'Hardest part',
      success: 'Success for you',
      moreInfo: 'More info',
    },
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
  const labels = t.messageLabels
  const lines = [
    `${labels.email}: ${form.email}`,
    form.destination ? `${labels.destination}: ${form.destination}` : null,
    form.attraction ? `${labels.attraction}: ${form.attraction}` : null,
    form.motivation ? `${labels.motivation}: ${form.motivation}` : null,
    form.dates ? `${labels.dates}: ${form.dates}` : null,
    form.people ? `${labels.people}: ${form.people}` : null,
    form.meal ? `${labels.meal}: ${form.meal}` : null,
    form.lodging ? `${labels.lodging}: ${form.lodging}` : null,
    form.lodgingValues && form.lodgingValues.length
      ? `${labels.lodgingValues}: ${form.lodgingValues.join(', ')}`
      : null,
    form.budget ? `${labels.budget}: ${form.budget}` : null,
    form.service ? `${labels.service}: ${form.service}` : null,
    form.motherProfile ? `${labels.motherProfile}: ${form.motherProfile}` : null,
    form.fatherProfile ? `${labels.fatherProfile}: ${form.fatherProfile}` : null,
    form.child1 ? `${labels.child1}: ${form.child1}` : null,
    form.child2 ? `${labels.child2}: ${form.child2}` : null,
    form.child3 ? `${labels.child3}: ${form.child3}` : null,
    form.familyTraveled ? `${labels.familyTraveled}: ${form.familyTraveled}` : null,
    form.previousTrips ? `${labels.previousTrips}: ${form.previousTrips}` : null,
    form.hardest ? `${labels.hardest}: ${form.hardest}` : null,
    form.success ? `${labels.success}: ${form.success}` : null,
    form.moreInfo ? `${labels.moreInfo}: ${form.moreInfo}` : null,
  ].filter(Boolean)

  return [t.messageTitle, '', ...lines].join('\n')
}

const DiagnosisWizard = ({ t, onSubmit }) => {
  const initialState = {
    email: '',
    destination: '',
    attraction: '',
    motivation: '',
    dates: '',
    people: '',
    meal: '',
    lodging: '',
    lodgingValues: [],
    budget: '',
    service: '',
    motherProfile: '',
    fatherProfile: '',
    child1: '',
    child2: '',
    child3: '',
    familyTraveled: '',
    previousTrips: '',
    hardest: '',
    success: '',
    moreInfo: '',
  }

  const [step, setStep] = useState(0)
  const [data, setData] = useState(() => {
    if (typeof window === 'undefined') return initialState
    const saved = localStorage.getItem(WIZARD_STORAGE_KEY)
    if (!saved) return initialState
    try {
      const parsed = JSON.parse(saved)
      return { ...initialState, ...parsed }
    } catch {
      return initialState
    }
  })

  const [optionalOpen, setOptionalOpen] = useState({
    trip: false,
    lodging: false,
    profiles: false,
    experiences: false,
  })

  useEffect(() => {
    localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const handleChange = (event) => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleMulti = (value) => {
    setData((prev) => {
      const set = new Set(prev.lodgingValues || [])
      if (set.has(value)) {
        set.delete(value)
      } else {
        set.add(value)
      }
      return { ...prev, lodgingValues: Array.from(set) }
    })
  }

  const next = () => setStep((prev) => Math.min(prev + 1, 5))
  const back = () => setStep((prev) => Math.max(prev - 1, 0))

  const canAdvance = [
    data.email.trim(),
    data.motivation && data.dates.trim() && data.people.trim(),
    data.meal && data.lodging,
    data.service,
    data.motherProfile,
    data.familyTraveled,
  ][step]

  const progress = ((step + 1) / 6) * 100

  const steps = [
    {
      id: 'email',
      title: t.wizardStepTitles[0],
      content: (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-navy/60" htmlFor="email">
            {t.wizardQuestions.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={data.email}
            onChange={handleChange}
            className="rounded-xl border border-navy/10 px-3 py-3"
          />
        </div>
      ),
    },
    {
      id: 'trip',
      title: t.wizardStepTitles[1],
      content: (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-navy/60" htmlFor="motivation">
              {t.wizardQuestions.motivation}
            </label>
            <select
              id="motivation"
              name="motivation"
              required
              value={data.motivation}
              onChange={handleChange}
              className="rounded-xl border border-navy/10 px-3 py-3"
            >
              <option value="" disabled>
                —
              </option>
              {t.wizardOptions.motivation.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-navy/60" htmlFor="dates">
              {t.wizardQuestions.dates}
            </label>
            <input
              id="dates"
              name="dates"
              required
              value={data.dates}
              onChange={handleChange}
              className="rounded-xl border border-navy/10 px-3 py-3"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-navy/60" htmlFor="people">
              {t.wizardQuestions.people}
            </label>
            <input
              id="people"
              name="people"
              required
              value={data.people}
              onChange={handleChange}
              className="rounded-xl border border-navy/10 px-3 py-3"
            />
          </div>
          <button
            type="button"
            onClick={() => setOptionalOpen((prev) => ({ ...prev, trip: !prev.trip }))}
            className="text-left text-sm text-navy/70 hover:text-navy focus-visible:outline-none focus-visible:underline"
          >
            {t.wizardOptional}
          </button>
          {optionalOpen.trip && (
            <div className="grid gap-3 rounded-2xl border border-dashed border-navy/10 p-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-navy/60" htmlFor="destination">
                  {t.wizardQuestions.destination}
                </label>
                <input
                  id="destination"
                  name="destination"
                  value={data.destination}
                  onChange={handleChange}
                  className="rounded-xl border border-navy/10 px-3 py-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-navy/60" htmlFor="attraction">
                  {t.wizardQuestions.attraction}
                </label>
                <select
                  id="attraction"
                  name="attraction"
                  value={data.attraction}
                  onChange={handleChange}
                  className="rounded-xl border border-navy/10 px-3 py-3"
                >
                  <option value="">—</option>
                  {t.wizardOptions.attraction.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'lodging',
      title: t.wizardStepTitles[2],
      content: (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-navy/60" htmlFor="meal">
              {t.wizardQuestions.meal}
            </label>
            <select
              id="meal"
              name="meal"
              required
              value={data.meal}
              onChange={handleChange}
              className="rounded-xl border border-navy/10 px-3 py-3"
            >
              <option value="" disabled>
                —
              </option>
              {t.wizardOptions.meal.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-navy/60" htmlFor="lodging">
              {t.wizardQuestions.lodging}
            </label>
            <select
              id="lodging"
              name="lodging"
              required
              value={data.lodging}
              onChange={handleChange}
              className="rounded-xl border border-navy/10 px-3 py-3"
            >
              <option value="" disabled>
                —
              </option>
              {t.wizardOptions.lodging.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setOptionalOpen((prev) => ({ ...prev, lodging: !prev.lodging }))}
            className="text-left text-sm text-navy/70 hover:text-navy focus-visible:outline-none focus-visible:underline"
          >
            {t.wizardOptional}
          </button>
          {optionalOpen.lodging && (
            <div className="grid gap-4 rounded-2xl border border-dashed border-navy/10 p-4">
              <div className="space-y-2">
                <p className="text-xs text-navy/60">{t.wizardQuestions.lodgingValues}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {t.wizardOptions.lodgingValues.map((option) => (
                    <label key={option} className="flex items-center gap-2 text-sm text-navy/70">
                      <input
                        type="checkbox"
                        checked={data.lodgingValues.includes(option)}
                        onChange={() => toggleMulti(option)}
                        className="h-4 w-4 rounded border-navy/30 text-teal focus:ring-teal/60"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-navy/60" htmlFor="budget">
                  {t.wizardQuestions.budget}
                </label>
                <input
                  id="budget"
                  name="budget"
                  value={data.budget}
                  onChange={handleChange}
                  className="rounded-xl border border-navy/10 px-3 py-3"
                />
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'service',
      title: t.wizardStepTitles[3],
      content: (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-navy/60" htmlFor="service">
            {t.wizardQuestions.service}
          </label>
          <select
            id="service"
            name="service"
            required
            value={data.service}
            onChange={handleChange}
            className="rounded-xl border border-navy/10 px-3 py-3"
          >
            <option value="" disabled>
              —
            </option>
            {t.wizardOptions.service.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ),
    },
    {
      id: 'profiles',
      title: t.wizardStepTitles[4],
      content: (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-navy/60" htmlFor="motherProfile">
              {t.wizardQuestions.motherProfile}
            </label>
            <select
              id="motherProfile"
              name="motherProfile"
              required
              value={data.motherProfile}
              onChange={handleChange}
              className="rounded-xl border border-navy/10 px-3 py-3"
            >
              <option value="" disabled>
                —
              </option>
              {t.wizardOptions.parentProfileMother.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setOptionalOpen((prev) => ({ ...prev, profiles: !prev.profiles }))}
            className="text-left text-sm text-navy/70 hover:text-navy focus-visible:outline-none focus-visible:underline"
          >
            {t.wizardOptional}
          </button>
          {optionalOpen.profiles && (
            <div className="grid gap-4 rounded-2xl border border-dashed border-navy/10 p-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-navy/60" htmlFor="fatherProfile">
                  {t.wizardQuestions.fatherProfile}
                </label>
                <select
                  id="fatherProfile"
                  name="fatherProfile"
                  value={data.fatherProfile}
                  onChange={handleChange}
                  className="rounded-xl border border-navy/10 px-3 py-3"
                >
                  <option value="">—</option>
                  {t.wizardOptions.parentProfileFather.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-navy/60" htmlFor="child1">
                    {t.wizardQuestions.child1}
                  </label>
                  <select
                    id="child1"
                    name="child1"
                    value={data.child1}
                    onChange={handleChange}
                    className="rounded-xl border border-navy/10 px-3 py-3"
                  >
                    <option value="">—</option>
                    {t.wizardOptions.childProfile.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-navy/60" htmlFor="child2">
                    {t.wizardQuestions.child2}
                  </label>
                  <select
                    id="child2"
                    name="child2"
                    value={data.child2}
                    onChange={handleChange}
                    className="rounded-xl border border-navy/10 px-3 py-3"
                  >
                    <option value="">—</option>
                    {t.wizardOptions.childProfile.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-navy/60" htmlFor="child3">
                  {t.wizardQuestions.child3}
                </label>
                <select
                  id="child3"
                  name="child3"
                  value={data.child3}
                  onChange={handleChange}
                  className="rounded-xl border border-navy/10 px-3 py-3"
                >
                  <option value="">—</option>
                  {t.wizardOptions.childProfile.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'experiences',
      title: t.wizardStepTitles[5],
      content: (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-navy/60" htmlFor="familyTraveled">
              {t.wizardQuestions.familyTraveled}
            </label>
            <select
              id="familyTraveled"
              name="familyTraveled"
              required
              value={data.familyTraveled}
              onChange={handleChange}
              className="rounded-xl border border-navy/10 px-3 py-3"
            >
              <option value="" disabled>
                —
              </option>
              {t.wizardOptions.familyTraveled.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setOptionalOpen((prev) => ({ ...prev, experiences: !prev.experiences }))}
            className="text-left text-sm text-navy/70 hover:text-navy focus-visible:outline-none focus-visible:underline"
          >
            {t.wizardOptional}
          </button>
          {optionalOpen.experiences && (
            <div className="grid gap-4 rounded-2xl border border-dashed border-navy/10 p-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-navy/60" htmlFor="previousTrips">
                  {t.wizardQuestions.previousTrips}
                </label>
                <textarea
                  id="previousTrips"
                  name="previousTrips"
                  rows="3"
                  value={data.previousTrips}
                  onChange={handleChange}
                  className="rounded-xl border border-navy/10 px-3 py-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-navy/60" htmlFor="hardest">
                  {t.wizardQuestions.hardest}
                </label>
                <textarea
                  id="hardest"
                  name="hardest"
                  rows="3"
                  value={data.hardest}
                  onChange={handleChange}
                  className="rounded-xl border border-navy/10 px-3 py-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-navy/60" htmlFor="success">
                  {t.wizardQuestions.success}
                </label>
                <textarea
                  id="success"
                  name="success"
                  rows="3"
                  value={data.success}
                  onChange={handleChange}
                  className="rounded-xl border border-navy/10 px-3 py-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-navy/60" htmlFor="moreInfo">
                  {t.wizardQuestions.moreInfo}
                </label>
                <textarea
                  id="moreInfo"
                  name="moreInfo"
                  rows="3"
                  value={data.moreInfo}
                  onChange={handleChange}
                  className="rounded-xl border border-navy/10 px-3 py-3"
                />
              </div>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="rounded-3xl border border-navy/10 p-6 bg-white/80 shadow-card">
      <div className="flex items-center justify-between text-xs text-navy/60">
        <span>
          {t.wizardProgress} {step + 1}/{steps.length}
        </span>
        <span>{steps[step].title}</span>
      </div>
      <p className="mt-2 text-xs text-navy/60">{t.wizardStepHelpers[step]}</p>
      {step === steps.length - 1 && (
        <p className="mt-1 text-xs text-teal">{t.wizardProgressNote}</p>
      )}
      <div className="mt-3 h-2 w-full rounded-full bg-cream/60">
        <div className="h-2 rounded-full bg-teal" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-6">{steps[step].content}</div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="rounded-full border border-navy/20 px-4 py-2 text-sm text-navy/70 disabled:opacity-40"
        >
          {t.wizardBack}
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance}
            className="rounded-full bg-navy text-white px-6 py-2 text-sm shadow-soft disabled:opacity-50"
          >
            {t.wizardNext}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onSubmit(data)}
            disabled={!canAdvance}
            className="rounded-full bg-navy text-white px-6 py-2 text-sm shadow-soft disabled:opacity-50"
          >
            {t.wizardSubmit}
          </button>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'pt'
    return localStorage.getItem(LANG_STORAGE_KEY) || 'pt'
  })

  const [message, setMessage] = useState('')
  const [copyStatus, setCopyStatus] = useState('')

  const t = copy[lang]

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus(lang === 'pt' ? 'Copiado!' : 'Copied!')
      setTimeout(() => setCopyStatus(''), 2000)
    } catch (error) {
      setCopyStatus(lang === 'pt' ? 'Copia manual necessária' : 'Copy manually')
    }
  }

  const handleWizardSubmit = async (data) => {
    const built = buildMessage(lang, data)
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
              <div className="mt-4 rounded-2xl border border-navy/10 bg-white/70 p-4">
                <p className="text-sm font-semibold">{t.wizardIntroTitle}</p>
                <p className="mt-2 text-xs text-navy/60">{t.wizardIntroBody}</p>
                <ul className="mt-3 space-y-1 text-xs text-navy/70">
                  {t.wizardPricingLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-navy/50">{t.wizardPricingNote}</p>
              </div>
              <div className="mt-6">
                <DiagnosisWizard t={t} onSubmit={handleWizardSubmit} />
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
                      <p className="text-sm font-semibold">{t.wizardSummaryTitle}</p>
                      <p className="text-xs text-navy/60 mt-2">{t.wizardSummaryBody}</p>
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
