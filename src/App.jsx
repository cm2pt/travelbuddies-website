import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import ProductsPage from './components/ProductsPage'
import Button from './components/ui/Button'
import Card from './components/ui/Card'
import Input from './components/ui/Input'
import Badge from './components/ui/Badge'
import logoBrand from './assets/logo-brand.png'
import heroImage from './assets/hero.jpg'
import travel1 from './assets/travel-family-1.jpeg'
import travel2 from './assets/travel-family-2.jpeg'
import travel3 from './assets/travel-family-3.jpeg'
import btnWhatsapp from './assets/btn-whatsapp.svg'
import btnEmail from './assets/btn-email.svg'
import btnInstagram from './assets/btn-instagram.svg'
import productBuddies from './assets/products/Travel Buddies.png'
import productCaps from './assets/products/product-caps.jpg'

const REMOTE_IMAGES = {
  hero:
    'https://images.unsplash.com/photo-1767411972844-b5e8bdda9e5d?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1800',
}

const LANG_STORAGE_KEY = 'travelbuddies_lang'
const WIZARD_STORAGE_KEY = 'travelbuddies_wizard'
const getCurrentRoute = () => (window.location.pathname.startsWith('/produtos') ? 'produtos' : 'home')

const copy = {
  pt: {
    navLinks: [
      { href: '#como-funciona', label: 'Como funciona' },
      { href: '#services', label: 'Serviços' },
      { href: '#questionario', label: 'Questionário' },
    ],
    homeNav: 'Início',
    productsNav: 'Produtos',
    heroTag: 'TravelBuddies | Viagens em Família',
    heroTitle: 'Nós tratamos da logística.\nTu aproveitas os momentos.',
    heroBody: 'Planeamento de viagens em família com crianças — feito por pais, para pais.',
    heroUrgency: 'Férias de Verão — os melhores voos para famílias esgotam cedo.',
    heroCtaNote: '2–3 minutos · sem compromisso',
    primaryCta: 'Começar questionário',
    heroCtaPrompt: 'Se estás cansada(o) de decidir, começa aqui.',
    qualifyTitle: 'Isto é para ti se…',
    qualifyItems: [
      { title: 'Queres um ritmo possível', text: 'Com pausas e sestas.' },
      { title: 'Precisas de logística simples', text: 'Sem mil escolhas.' },
      { title: 'Estás sem tempo', text: 'E não queres pesquisar tudo.' },
      { title: 'Queres clareza', text: 'E apoio humano na decisão.' },
      { title: 'Isto não é para ti', text: 'Se queres viagens maratona.' },
    ],
    servicesTitle: 'Serviços TravelBuddies',
    servicesBody: 'Uma viagem mal planeada com crianças tem um custo alto em stress, e memórias que ficam por criar.',
    servicesFreeLine: 'Orçamento e marcação de viagem (gratuito)',
    servicesTravelPlanner: 'Com qualquer serviço, recebes um Travel Planner em PDF para acompanhar o roteiro da tua família.',
    servicesContextualNote: 'Quando marcares a tua viagem, recebe o Travel Planner para acompanhar o roteiro.',
    baseDiscount: 'Metade do preço (30€) se usares o nosso serviço de marcação gratuito.',
    premiumBundleTitle: 'Oferta especial Premium:',
    premiumBundleA: 'Travel Buddy ou Boné por apenas +12,50€',
    premiumBundleB: '15% de desconto em t-shirts de família',
    baseTitle: 'Viagem Leve',
    premiumTitle: 'Zero Stress',
    premiumBadge: 'Menos decisões',
    baseOutcome:
      'Orientação clara e roteiro alinhado com o perfil da família — com opção de marcação ou orientação para fazerem de forma autónoma.',
    premiumOutcome:
      'Menos decisões, mais acompanhamento. Tudo alinhado desde o início.',
    baseWhen: 'Ideal quando tens destino mas não sabes por onde começar a organizar.',
    premiumWhen:
      'Ideal para viagens longas, destinos complexos ou quando queres zero stress.',
    baseDetailedList: [
      'Perfil da família (na TravelBuddies identificamos 4 tipos de perfis)',
      'Roteiro adaptado aos perfis da família (destino, ritmo, tipo de viagem)',
      'Sugestão de voos e alojamento adequados a crianças (com opção de marcação)',
      'Ajuda na preparação das malas',
      'Saber exatamente o que tratar antes de viajar',
      'Suporte durante o processo de decisão',
      'Mini guia sobre o destino',
    ],
    premiumDetailedList: [
      'Roteiro detalhado com planeamento por dias (ritmo realista para a família)',
      'Sugestão e opção de marcação de experiências',
      'Suporte durante a viagem',
    ],
    premiumIncludesBase: 'Inclui tudo do Base +',
    baseBenefits: ['Roteiro leve', 'Comparações claras', 'Decisão com apoio'],
    premiumBenefits: ['Planeamento por dias', 'Experiências alinhadas', 'Apoio antes e durante'],
    pricingNote: 'Valores variam consoante duração e complexidade.',
    baseIncludes: [
      'Perfil TravelBuddies da família',
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
      { title: 'Questionário curto', text: 'Ouvimos a vossa família.' },
      { title: 'Desenhamos e alinhamos', text: 'Ajustamos juntos, com calma.' },
      { title: 'Viajas com confiança', text: 'Estamos por perto.' },
    ],
    freeTitle: 'Só a Marcação',
    freeSubtitle: 'Gratuito',
    freeBenefit: 'Nós marcamos. Tu viajas.',
    freeOutcome: 'Para famílias que já sabem o que querem e só precisam de ajuda na marcação — sem custo de serviço.',
    freeWhen: 'Ideal para quem já tem destino e datas definidas.',
    freeDetailedList: [
      'Pesquisa de voos e alojamento',
      'Comparação de opções',
      'Marcação sem custo de serviço',
    ],
    freeTag: 'Gratuito',
    baseBadge: 'Mais pedido',
    baseSubtitle: 'A partir de 60€',
    baseBenefit: 'Orientação clara. Decisão leve.',
    serviceCta: 'Escolher este plano',
    serviceCtaFree: 'Pedir orçamento',
    basePrice: 'A partir de 60€ (ou 30€ com marcação)',
    premiumPrice: 'A partir de 130€',
    premiumSubtitle: 'A partir de 130€',
    premiumBenefit: 'Tudo tratado. Zero stress.',
    founderTitle: 'Quem somos',
    founderBody: 'Somos a Joana e o Luís — pais de 3 crianças e com mais de 40 viagens em família. Criámos a TravelBuddies porque sabemos o que é viajar com filhos pequenos e querer que corra bem.',
    founderHighlights: ['3 crianças', '+40 viagens', 'Pais reais'],
    whatsappFloat: 'Fala connosco',
    leadMagnetTitle: 'Travel Planner Gratuito',
    leadMagnetBody: 'Um guia prático em PDF para organizar a tua próxima viagem em família — com checklists, timeline e dicas úteis.',
    leadMagnetCta: 'Receber o Travel Planner',
    leadMagnetNote: 'Enviamos para o teu email. Sem spam.',
    simulatorTitle: 'Estimativa rápida',
    simulatorBody: 'Quanto pode custar o serviço TravelBuddies para a tua viagem?',
    simulatorDays: 'Duração da viagem (dias)',
    simulatorPersons: 'Número de viajantes',
    simulatorResult: 'Sugestão de serviço:',
    simulatorBase: 'Viagem Leve',
    simulatorPremium: 'Zero Stress',
    simulatorFree: 'Só a Marcação',
    simulatorBasePrice: '~{price}€',
    simulatorNote: 'Valores indicativos. Preço final depende do destino e complexidade.',
    faqTitle: 'Dúvidas frequentes',
    faqItems: [
      { q: 'Quanto tempo até ter a proposta?', a: 'Normalmente 2–3 dias úteis após preencheres o questionário. Em época alta pode demorar um pouco mais.' },
      { q: 'E se mudarmos de ideias sobre o destino?', a: 'Sem problema — ajustamos o plano juntos até estar perfeito. A viagem é vossa.' },
      { q: 'Funciona para destinos fora da Europa?', a: 'Sim. Qualquer destino no mundo. Já organizámos viagens dos Açores à Tailândia.' },
      { q: 'Posso só pedir a marcação, sem planeamento?', a: 'Claro! O serviço "Só a Marcação" é gratuito — pesquisamos, comparamos e marcamos por ti.' },
      { q: 'E se o meu bebé tiver menos de 1 ano?', a: 'Temos experiência com bebés desde os 3 meses. Adaptamos tudo ao ritmo e necessidades dos mais pequenos.' },
      { q: 'O que acontece durante a viagem?', a: 'No plano Zero Stress, tens suporte durante toda a viagem. No Viagem Leve, apoio na preparação e decisão.' },
    ],
    dividerQualify: '~ para famílias reais ~',
    dividerHow: '~ simples e humano ~',
    dividerServices: '~ escolhe o teu plano ~',
    footerNav: [
      { href: '#services', label: 'Serviços' },
      { href: '#questionario', label: 'Questionário' },
    ],
    footerTagline: 'Viagens com crianças que funcionam na vida real.',
    footerCopyright: '© 2025 TravelBuddies. Todos os direitos reservados.',
    trustCaptions: ['Praia com os miúdos', 'Explorar juntos', 'Momentos reais'],
    trustTitle: 'Confiança e calma',
    trustCards: [
      { title: 'Não somos agência tradicional', text: 'Planeamos como pais, com cuidado.' },
      { title: 'Vida real primeiro', text: 'Sem promessas irreais.' },
      { title: 'Presença humana', text: 'Acompanhamento próximo.' },
    ],
    trustLine: 'Somos uma família que viaja com crianças e conhece os desafios.',
    formTitle: 'Questionário TravelBuddies',
    formBody: 'Partilha o essencial. Nós simplificamos.',
    formHint: '2–3 minutos · sem compromisso',
    wizardWelcomeTitle: 'Olá! 👋',
    wizardWelcomeBody: 'Vamos desenhar a viagem perfeita para a tua família.',
    wizardWelcomeNote: 'São só 5 passos rápidos.',
    wizardWelcomeSocialProof: 'Feito por pais que viajam com crianças.',
    wizardWelcomeStart: 'Começar',
    wizardWelcomeQuickStart: '⚡ Resposta rápida',
    wizardWelcomeQuickNote: 'Preenche os essenciais e salta o resto.',
    wizardStepTitles: [
      '✈️ Sobre a viagem',
      '🏨 Alojamento e estilo',
      '🎯 Tipo de serviço',
      '👨‍👩‍👧‍👦 Perfil de viajantes',
      '🗺️ Quase lá!',
    ],
    wizardStepHelpers: [
      'Ajuda-nos a perceber o ritmo ideal.',
      'Para dormir bem e com pouco stress.',
      'Para alinharmos o nível de apoio.',
      'Cada família é única, contamos contigo.',
      'O que já viveram ajuda-nos muito.',
    ],
    wizardReassureEmail: 'Só usamos para te responder. Sem spam.',
    wizardReassurePrivacy: 'Não partilhamos com terceiros.',
    wizardAutosaveNote: 'Podes parar a qualquer momento — guardamos automaticamente.',
    wizardNextStepNote: 'Depois enviamos uma proposta clara e humana.',
    wizardTimeNote: 'Menos de 1 minuto.',
    wizardRequiredNote: 'Preenche aqui para continuar',
    wizardReceiveTitle: 'O que vais receber',
    wizardReceiveItems: ['Roteiro leve', 'Opções claras', 'Checklist útil'],
    wizardOptionalTag: '(opcional)',
    wizardSaveEmailPrompt: 'Queres guardar o progresso? Deixa o email e continuas quando quiseres.',
    wizardSaveEmailBtn: 'Guardar progresso',
    wizardOtherPlaceholder: 'Conta-nos mais...',
    wizardRestart: 'Recomeçar',
    wizardSuccessTitle: 'Tudo pronto! 🎉',
    wizardSuccessBody: 'Recebemos as tuas respostas. Vamos analisar e enviamos uma proposta personalizada em breve.',
    wizardSuccessNext: 'Próximos passos:',
    wizardSuccessSteps: ['Analisamos o perfil da tua família', 'Desenhamos opções à medida', 'Enviamos a proposta por email'],
    wizardSuccessCta: 'Ou envia-nos diretamente:',
    wizardPopularTag: 'Mais popular',
    wizardRestartConfirm: 'Tens a certeza? Todas as respostas serão apagadas.',
    wizardWhyAsk: {
      budget: 'Ajuda-nos a sugerir opções realistas — sem compromisso.',
      lodgingValues: 'Para encontrar o alojamento perfeito para a família.',
      adultProfile: 'Ajuda-nos a adaptar o ritmo e estilo da viagem.',
    },
    wizardContextHelpers: {
      motivation: {
        'Descanso': 'Boa escolha! Vamos encontrar o ritmo ideal para relaxar. 🏖️',
        'Aventura': 'Fantástico! Vamos encontrar aventuras seguras para toda a família. 🧗',
        'Tempo de qualidade em família': 'Perfeito! Momentos juntos são o melhor. 💛',
        'Celebração (aniversário, lua de mel, etc.)': 'Vamos tornar esta celebração especial! 🎉',
        'Conhecer outra cultura': 'Adoramos! Explorar o mundo com crianças é mágico. 🌍',
      },
      lodging: {
        'Hotel': 'Hotel com tudo pensado para os mais pequenos. 👌',
        'Apartamento': 'Mais espaço e flexibilidade para a família. 🏠',
        'Resort': 'Tudo incluído, zero stress. ✨',
      },
    },
    wizardSeasons: ['Primavera', 'Verão', 'Outono', 'Inverno', 'Qualquer altura'],
    wizardMotivationIcons: {
      'Descanso': '🏖️',
      'Aventura': '🧗',
      'Tempo de qualidade em família': '👨‍👩‍👧',
      'Celebração (aniversário, lua de mel, etc.)': '🎂',
      'Conhecer outra cultura': '🌍',
      'Other': '✏️',
    },
    wizardDynamicLodging: 'Escolheste {attraction} — que tipo de alojamento preferes?',
    wizardDynamicMeal: 'Para a vossa viagem de {motivation} — que regime alimentar preferem?',
    wizardExperiencePrompt: 'Conta-nos o que quiseres sobre viagens em família — o que correu bem, o que foi difícil, o que gostariam nesta viagem...',
    wizardPersonalizedIntro: 'Viagem de {motivation} para {travelers} — quase pronto!',
    wizardStepWatermarks: ['✈️', '🏨', '🎯', '👨‍👩‍👧‍👦', '🗺️'],
    wizardQuestions: {
      email: 'Email',
      destination: 'Qual é o destino da viagem? Tens algum destino em mente? Se sim, qual?',
      attraction: 'Quando vão de férias, o que vos atrai mais?',
      motivation: 'Qual é a principal motivação desta viagem?',
      whosTravelling: 'Quem vai viajar?',
      adults: 'Adultos',
      kids: 'Crianças (< 18 anos)',
      childAge: 'Idade da criança {n}',
      whenTravel: 'Quando querem viajar?',
      haveDates: 'Tenho datas',
      flexible: 'Sou flexível',
      dateFrom: 'De',
      dateTo: 'Até',
      datePlaceholder: 'ex: 15 Jul – 30 Jul 2025',
      flexibleNote: 'Alguma preferência? (ex: Julho, Verão...)',
      meal: 'Que tipo de regime alimentar preferem?',
      lodging: 'Que tipo de alojamento preferes?',
      lodgingValues: 'O que valorizam mais quando escolhem um alojamento?',
      budget:
        'Qual é o vosso orçamento aproximado? Esta pergunta vai nos permitir ver opções mais ajustadas à realidade',
      service: 'Que tipo de ajuda procuram?',
      adultProfile: 'Adulto {n}',
      childProfile: 'Criança {n} — {age}',
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
    wizardProgressRemaining: 'Só faltam {count} passos.',
    wizardProgressRemainingSingle: 'Só falta 1 passo.',
    wizardOptionalLabel: 'Se já souberes...',
    serviceCards: [
      { id: 'Organização de Viagem em família (Plano Base)', title: 'Viagem Leve — 60€', desc: 'Orientação clara. Decisão leve.', tag: 'Mais pedido' },
      { id: 'Organização de Viagem em família (Premium)', title: 'Zero Stress — 130€', desc: 'Tudo tratado. Zero stress.', tag: 'Tudo planeado' },
      { id: 'Orçamento e marcação de viagem', title: 'Só a Marcação', desc: 'Nós marcamos. Tu viajas.', tag: 'Gratuito' },
      { id: 'Ainda não sei', title: 'Ainda não sei', desc: 'Sem problema — nós ajudamos a escolher.', tag: '' },
    ],
    wizardSummaryTitle: 'Resumo',
    wizardSummaryBody: 'Revê e envia pelo canal que preferires.',
    wizardSummarySections: {
      trip: 'Viagem',
      lodging: 'Alojamento',
      profiles: 'Perfis',
      experiences: 'Experiências',
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
      lodging: ['Hotel', 'Apartamento', 'Resort', 'Não tenho preferência'],
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
      adultProfile: [
        'Gosta de planear e ter tudo controlado',
        'Precisa de conforto e pausas',
        'Gosta de explorar e improvisar',
        'O importante é estarem juntos e bem',
        'Viaja sobretudo para descansar',
        'O mais importante são as novas Experiências',
      ],
      childProfile: [
        'Sensível a mudanças de rotina',
        'Adaptável e tranquilo',
        'Ativo e curioso',
        'Dá-se bem com novos ambientes',
        'Gosta de saber tudo sobre os sítios',
        'O mais importante é ir à frente',
        'Vibra com as novas experiências',
        'Está tudo bem desde que estejam juntos',
      ],
      childProfileNap: 'Precisa de sestas e tranquilidade',
      familyTraveled: ['Sim', 'Não'],
    },
    formSuccessBody: 'Copiada automaticamente.',
    formThankTitle: 'Obrigado! Já recebemos o teu pedido.',
    formThankBody: 'Vamos analisar e responder com proposta.',
    messageLabels: {
      email: 'Email',
      destination: 'Destino',
      attraction: 'Atrai mais',
      motivation: 'Motivação',
      travelers: 'Viajantes',
      dates: 'Datas',
      meal: 'Regime alimentar',
      lodging: 'Alojamento',
      lodgingValues: 'Valorizam',
      budget: 'Orçamento',
      service: 'Tipo de ajuda',
      profiles: 'Perfis',
      familyTraveled: 'Já viajaram em família',
      previousTrips: 'Viagens anteriores',
      hardest: 'Mais difícil',
      success: 'Sucesso para vocês',
      moreInfo: 'Mais info',
    },
    whatsapp: 'Enviar por WhatsApp',
    email: 'Enviar por Email',
    instagram: 'Falar no Instagram',
    productsLink: 'Conhece também os nossos produtos →',
    footerTitle: 'TravelBuddies',
    footerBody: 'Estamos aqui para ajudar a tua família.',
    footerSmall: 'Com carinho, TravelBuddies.',
    messageTitle: 'Pedido de Questionário TravelBuddies',
  },
  en: {
    navLinks: [
      { href: '#como-funciona', label: 'How it works' },
      { href: '#services', label: 'Services' },
      { href: '#questionnaire', label: 'Questionnaire' },
    ],
    homeNav: 'Home',
    productsNav: 'Produtos',
    heroTag: 'TravelBuddies | Family Trip Design',
    heroTitle: 'We handle the logistics.\nYou enjoy the moments.',
    heroBody: 'Family travel planning with kids — made by parents, for parents.',
    heroUrgency: 'Summer holidays — the best family flights sell out early.',
    heroCtaNote: '2–3 minutes · no commitment',
    primaryCta: 'Start questionnaire',
    heroCtaPrompt: 'If you are tired of deciding, start here.',
    qualifyTitle: 'This is for you if…',
    qualifyItems: [
      { title: 'You want a doable pace', text: 'With breaks and naps.' },
      { title: 'You need simple logistics', text: 'Not a thousand choices.' },
      { title: 'You are short on time', text: 'And can’t research everything.' },
      { title: 'You want clarity', text: 'With human support.' },
      { title: 'This is not for you', text: 'If you want marathon trips.' },
    ],
    servicesTitle: 'TravelBuddies Services',
    servicesBody: 'A poorly planned trip with kids has a high cost in stress, and memories that never get made.',
    servicesFreeLine: 'Orçamento e marcação de viagem (gratuito)',
    servicesTravelPlanner: 'With any service, you receive a Travel Planner PDF to accompany your family\'s itinerary.',
    servicesContextualNote: 'When you book your trip, receive the Travel Planner to follow the itinerary.',
    baseDiscount: 'Half price (30€) when using our free booking service.',
    premiumBundleTitle: 'Premium special offer:',
    premiumBundleA: 'Travel Buddy or Cap for only +€12.50',
    premiumBundleB: '15% discount on family t-shirts',
    baseTitle: 'Light Trip',
    premiumTitle: 'Zero Stress',
    premiumBadge: 'Less decisions',
    baseOutcome:
      'Clear guidance and an itinerary aligned with your family — with booking support or guidance to do it yourself.',
    premiumOutcome: 'Fewer decisions, more support. Everything aligned from the start.',
    baseWhen: 'Ideal when you have a destination but don\'t know where to start planning.',
    premiumWhen: 'Ideal for longer trips, complex destinations, or when you want zero stress.',
    baseDetailedList: [
      'Family profile assessment (TravelBuddies maps 4 profile types)',
      'Itinerary adapted to family profiles (destination, pace, trip style)',
      'Flight and child-friendly lodging suggestions (with booking option)',
      'Packing support',
      'Clear pre-travel preparation checklist',
      'Support during decision-making',
      'Mini destination guide',
    ],
    premiumDetailedList: [
      'Detailed day-by-day plan (realistic family pace)',
      'Experience suggestions with optional booking',
      'Support during the trip',
    ],
    premiumIncludesBase: 'Includes everything from Base +',
    baseBenefits: ['Light itinerary', 'Clear comparisons', 'Decision support'],
    premiumBenefits: ['Day-by-day plan', 'Aligned experiences', 'Support before and during'],
    pricingNote: 'Prices vary by duration and complexity.',
    baseIncludes: [
      'TravelBuddies family profile',
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
      { title: 'Quick questionnaire', text: 'We listen to your family.' },
      { title: 'Design and align', text: 'We adjust together, calmly.' },
      { title: 'Travel with confidence', text: 'We stay close.' },
    ],
    freeTitle: 'Just Booking',
    freeSubtitle: 'Free',
    freeBenefit: 'We book. You travel.',
    freeOutcome: 'For families who already know what they want and just need help booking — no service fee.',
    freeWhen: 'Ideal when you already have a destination and dates set.',
    freeDetailedList: [
      'Flight and accommodation search',
      'Option comparison',
      'Booking with no service fee',
    ],
    freeTag: 'Free',
    baseBadge: 'Most popular',
    baseSubtitle: 'From 60€',
    baseBenefit: 'Clear guidance. Light decisions.',
    serviceCta: 'Choose this plan',
    serviceCtaFree: 'Get a quote',
    basePrice: 'From 60€ (or 30€ with booking)',
    premiumPrice: 'From 130€',
    premiumSubtitle: 'From 130€',
    premiumBenefit: 'All sorted. Zero stress.',
    founderTitle: 'Who we are',
    founderBody: 'We are Joana and Luís — parents of 3 kids with 40+ family trips under our belt. We created TravelBuddies because we know what it takes to travel with young children and want it to go well.',
    founderHighlights: ['3 kids', '40+ trips', 'Real parents'],
    whatsappFloat: 'Talk to us',
    leadMagnetTitle: 'Free Travel Planner',
    leadMagnetBody: 'A practical PDF guide to organize your next family trip — with checklists, timeline, and useful tips.',
    leadMagnetCta: 'Get the Travel Planner',
    leadMagnetNote: 'Sent to your email. No spam.',
    simulatorTitle: 'Quick estimate',
    simulatorBody: 'How much could TravelBuddies cost for your trip?',
    simulatorDays: 'Trip duration (days)',
    simulatorPersons: 'Number of travelers',
    simulatorResult: 'Suggested service:',
    simulatorBase: 'Light Trip',
    simulatorPremium: 'Zero Stress',
    simulatorFree: 'Just Booking',
    simulatorBasePrice: '~{price}€',
    simulatorNote: 'Indicative values. Final price depends on destination and complexity.',
    faqTitle: 'Frequently asked questions',
    faqItems: [
      { q: 'How long until I get a proposal?', a: 'Usually 2–3 business days after you fill in the questionnaire. During peak season it may take a bit longer.' },
      { q: 'What if we change our mind about the destination?', a: 'No problem — we adjust the plan together until it feels right. The trip is yours.' },
      { q: 'Does it work for destinations outside Europe?', a: 'Yes. Any destination in the world. We have organized trips from the Azores to Thailand.' },
      { q: 'Can I just get booking help, no planning?', a: 'Of course! The "Just Booking" service is free — we search, compare, and book for you.' },
      { q: 'What if my baby is under 1 year old?', a: 'We have experience with babies from 3 months. We adapt everything to the pace and needs of the little ones.' },
      { q: 'What happens during the trip?', a: 'With Zero Stress, you get support throughout your trip. With Light Trip, we help with preparation and decisions.' },
    ],
    dividerQualify: '~ for real families ~',
    dividerHow: '~ simple and human ~',
    dividerServices: '~ choose your plan ~',
    footerNav: [
      { href: '#services', label: 'Services' },
      { href: '#questionnaire', label: 'Questionnaire' },
    ],
    footerTagline: 'Family travel with kids that works in real life.',
    footerCopyright: '© 2025 TravelBuddies. All rights reserved.',
    trustCaptions: ['Beach with the kids', 'Exploring together', 'Real moments'],
    trustTitle: 'Trust and calm',
    trustCards: [
      { title: 'Not a traditional agency', text: 'We plan like parents.' },
      { title: 'Real life first', text: 'No unrealistic promises.' },
      { title: 'Human presence', text: 'Close support.' },
    ],
    trustLine: 'We are a family that travels with kids and knows the challenges.',
    formTitle: 'TravelBuddies Questionnaire',
    formBody: 'Share the essentials. We simplify.',
    formHint: '2–3 minutes · no commitment',
    wizardWelcomeTitle: 'Hello! 👋',
    wizardWelcomeBody: "Let's design the perfect trip for your family.",
    wizardWelcomeNote: 'Just 5 quick steps.',
    wizardWelcomeSocialProof: 'Made by parents who travel with kids.',
    wizardWelcomeStart: 'Start',
    wizardWelcomeQuickStart: '⚡ Quick fill',
    wizardWelcomeQuickNote: 'Fill the essentials, skip the rest.',
    wizardStepTitles: [
      '✈️ About the trip',
      '🏨 Accommodation & style',
      '🎯 Service type',
      '👨‍👩‍👧‍👦 Traveler profiles',
      '🗺️ Almost there!',
    ],
    wizardStepHelpers: [
      'Helps us understand the right pace.',
      'For better rest and less stress.',
      'So we align the level of support.',
      'Every family is different.',
      'Your past helps us a lot.',
    ],
    wizardReassureEmail: 'Only for your reply. No spam.',
    wizardReassurePrivacy: 'We do not share with third parties.',
    wizardAutosaveNote: 'You can pause anytime — we save automatically.',
    wizardNextStepNote: 'Then we send a clear, human proposal.',
    wizardTimeNote: 'Less than 1 minute.',
    wizardRequiredNote: 'Fill this in to continue',
    wizardReceiveTitle: 'What you will receive',
    wizardReceiveItems: ['Light itinerary', 'Clear options', 'Helpful checklist'],
    wizardOptionalTag: '(optional)',
    wizardSaveEmailPrompt: 'Want to save your progress? Leave your email and continue anytime.',
    wizardSaveEmailBtn: 'Save progress',
    wizardOtherPlaceholder: 'Tell us more...',
    wizardRestart: 'Restart',
    wizardSuccessTitle: 'All done! 🎉',
    wizardSuccessBody: "We received your answers. We'll analyze your family profile and send a personalized proposal soon.",
    wizardSuccessNext: 'What happens next:',
    wizardSuccessSteps: ['We analyze your family profile', 'Design tailored options', 'Send a proposal via email'],
    wizardSuccessCta: 'Or reach out directly:',
    wizardPopularTag: 'Most popular',
    wizardRestartConfirm: 'Are you sure? All answers will be cleared.',
    wizardWhyAsk: {
      budget: 'Helps us suggest realistic options — no commitment.',
      lodgingValues: 'To find the perfect accommodation for your family.',
      adultProfile: 'Helps us adapt the pace and style of the trip.',
    },
    wizardContextHelpers: {
      motivation: {
        'Rest': 'Great choice! We will find the perfect pace to relax. 🏖️',
        'Adventure': 'Fantastic! Safe adventures for the whole family. 🧗',
        'Quality family time': 'Perfect! Time together is what matters most. 💛',
        'Celebration (birthday, honeymoon, etc.)': "Let's make this celebration special! 🎉",
        'Discover another culture': 'We love it! Exploring the world with kids is magical. 🌍',
      },
      lodging: {
        'Hotel': 'Hotel with everything planned for the little ones. 👌',
        'Apartment': 'More space and flexibility for the family. 🏠',
        'Resort': 'All inclusive, zero stress. ✨',
      },
    },
    wizardSeasons: ['Spring', 'Summer', 'Autumn', 'Winter', 'Anytime'],
    wizardMotivationIcons: {
      'Rest': '🏖️',
      'Adventure': '🧗',
      'Quality family time': '👨‍👩‍👧',
      'Celebration (birthday, honeymoon, etc.)': '🎂',
      'Discover another culture': '🌍',
      'Other': '✏️',
    },
    wizardDynamicLodging: 'You chose {attraction} — what type of lodging do you prefer?',
    wizardDynamicMeal: 'For your {motivation} trip — which meal plan works best?',
    wizardExperiencePrompt: 'Tell us anything about family travel — what went well, what was hard, what you hope for this trip...',
    wizardPersonalizedIntro: '{motivation} trip for {travelers} — almost done!',
    wizardStepWatermarks: ['✈️', '🏨', '🎯', '👨‍👩‍👧‍👦', '🗺️'],
    wizardQuestions: {
      email: 'Email',
      destination: 'What is the trip destination? Do you have one in mind? If yes, which?',
      attraction: 'When you go on holiday, what attracts you most?',
      motivation: 'What is the main motivation for this trip?',
      whosTravelling: "Who's travelling?",
      adults: 'Adults',
      kids: 'Kids (under 18)',
      childAge: 'Age of child {n}',
      whenTravel: 'When do you want to travel?',
      haveDates: 'I have dates',
      flexible: "I'm flexible",
      dateFrom: 'From',
      dateTo: 'To',
      datePlaceholder: 'e.g. Jul 15 – Jul 30, 2025',
      flexibleNote: 'Any preference? (e.g. July, Summer...)',
      meal: 'Which meal plan do you prefer?',
      lodging: 'What type of lodging do you prefer?',
      lodgingValues: 'What do you value most when choosing lodging?',
      budget:
        'What is your approximate budget? This helps us see options closer to reality.',
      service: 'What kind of help are you looking for?',
      adultProfile: 'Adult {n}',
      childProfile: 'Child {n} — {age}',
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
    wizardProgressRemaining: 'Only {count} steps left.',
    wizardProgressRemainingSingle: 'Only 1 step left.',
    wizardOptionalLabel: 'If you already know...',
    serviceCards: [
      { id: 'Organização de Viagem em família (Plano Base)', title: 'Light Trip — 60€', desc: 'Clear guidance. Light decisions.', tag: 'Most popular' },
      { id: 'Organização de Viagem em família (Premium)', title: 'Zero Stress — 130€', desc: 'All sorted. Zero stress.', tag: 'Fully planned' },
      { id: 'Orçamento e marcação de viagem', title: 'Just Booking', desc: 'We book. You travel.', tag: 'Free' },
      { id: 'Ainda não sei', title: "Not sure yet", desc: "No problem — we'll help you choose.", tag: '' },
    ],
    wizardSummaryTitle: 'Summary',
    wizardSummaryBody: 'Review and send via your preferred channel.',
    wizardSummarySections: {
      trip: 'Trip',
      lodging: 'Lodging',
      profiles: 'Profiles',
      experiences: 'Experiences',
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
      lodging: ['Hotel', 'Apartment', 'Resort', 'No preference'],
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
      adultProfile: [
        'Likes to plan and have everything controlled',
        'Needs comfort and breaks',
        'Likes to explore and improvise',
        'The most important is being together and well',
        'Travels mainly to rest',
        'New experiences matter most',
      ],
      childProfile: [
        'Sensitive to routine changes',
        'Adaptable and calm',
        'Active and curious',
        'Does well in new environments',
        'Likes to know everything about the destination',
        'Wants to lead the way',
        'Thrives on new experiences',
        'Fine as long as we are together',
      ],
      childProfileNap: 'Needs naps and calm to take them',
      familyTraveled: ['Yes', 'No'],
    },
    formSuccessBody: 'Automatically copied.',
    formThankTitle: 'Thank you! We received your request.',
    formThankBody: 'We will review and reply with a proposal.',
    messageLabels: {
      email: 'Email',
      destination: 'Destination',
      attraction: 'Attracted to',
      motivation: 'Motivation',
      travelers: 'Travelers',
      dates: 'Dates',
      meal: 'Meal plan',
      lodging: 'Lodging',
      lodgingValues: 'Priorities',
      budget: 'Budget',
      service: 'Type of help',
      profiles: 'Profiles',
      familyTraveled: 'Traveled as a family',
      previousTrips: 'Previous trips',
      hardest: 'Hardest part',
      success: 'Success for you',
      moreInfo: 'More info',
    },
    whatsapp: 'Send via WhatsApp',
    email: 'Send via Email',
    instagram: 'Chat on Instagram',
    productsLink: 'Check out our products →',
    footerTitle: 'TravelBuddies',
    footerBody: 'We are here to help your family.',
    footerSmall: 'With care, TravelBuddies.',
    messageTitle: 'TravelBuddies Questionnaire Request',
  },
}

/* Reduced-motion support */
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

const revealVariant = {
  hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const Reveal = ({ children, className = '', immediate = false }) => (
  <motion.div
    className={className}
    variants={revealVariant}
    initial={immediate || prefersReducedMotion ? 'visible' : 'hidden'}
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
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

const formatTravelers = (lang, form) => {
  const isPT = lang === 'pt'
  const parts = []
  parts.push(`${form.adults} ${isPT ? (form.adults === 1 ? 'adulto' : 'adultos') : (form.adults === 1 ? 'adult' : 'adults')}`)
  if (form.kids?.length > 0) {
    const ages = form.kids.filter(Boolean).map((a) => `${a} ${isPT ? 'anos' : 'yrs'}`).join(', ')
    parts.push(`${form.kids.length} ${isPT ? (form.kids.length === 1 ? 'criança' : 'crianças') : (form.kids.length === 1 ? 'child' : 'children')}${ages ? ` (${ages})` : ''}`)
  }
  return parts.join(', ')
}

const formatDates = (lang, form) => {
  if (form.dateMode === 'flexible') {
    const parts = []
    if (form.dateSeason) parts.push(form.dateSeason)
    if (form.dateFlexNote?.trim()) parts.push(form.dateFlexNote.trim())
    const detail = parts.length > 0 ? ` — ${parts.join(', ')}` : ''
    return `${lang === 'pt' ? 'Flexível' : 'Flexible'}${detail}`
  }
  if (form.dateMode === 'range' && form.dateFrom?.trim()) {
    return form.dateFrom.trim()
  }
  return '-'
}

const buildMessage = (lang, form) => {
  const t = copy[lang]
  const labels = t.messageLabels
  const sections = t.wizardSummarySections
  const lines = [
    `${labels.email}: ${form.email}`,
    '',
    `[${sections.trip}]`,
    `${labels.destination}: ${form.destination || '-'}`,
    `${labels.attraction}: ${form.attraction || '-'}`,
    `${labels.motivation}: ${form.motivation || '-'}`,
    `${labels.travelers}: ${formatTravelers(lang, form)}`,
    `${labels.dates}: ${formatDates(lang, form)}`,
    '',
    `[${sections.lodging}]`,
    `${labels.meal}: ${form.meal || '-'}`,
    `${labels.lodging}: ${form.lodging || '-'}`,
    `${labels.lodgingValues}: ${(form.lodgingValues && form.lodgingValues.length && form.lodgingValues.join(', ')) || '-'}`,
    `${labels.budget}: ${form.budget || '-'}`,
    '',
    `${labels.service}: ${form.service || '-'}`,
    '',
    `[${sections.profiles}]`,
    ...(form.travelerProfiles || []).map((p) => {
      const isPT = lang === 'pt'
      let label
      if (p.role === 'adult') {
        label = t.wizardQuestions.adultProfile.replace('{n}', String(p.index + 1))
      } else {
        const a = form.kids?.[p.index]
        const ageLabel = a ? `${a} ${isPT ? 'anos' : 'yrs'}` : '?'
        label = t.wizardQuestions.childProfile.replace('{n}', String(p.index + 1)).replace('{age}', ageLabel)
      }
      return `${label}: ${p.profile || '-'}`
    }),
    '',
    `[${sections.experiences}]`,
    `${labels.familyTraveled}: ${form.familyTraveled || '-'}`,
    ...(form.experienceNotes ? [`${lang === 'pt' ? 'Notas' : 'Notes'}: ${form.experienceNotes}`] : []),
    ...(form.previousTrips ? [`${labels.previousTrips}: ${form.previousTrips}`] : []),
    ...(form.hardest ? [`${labels.hardest}: ${form.hardest}`] : []),
    ...(form.success ? [`${labels.success}: ${form.success}`] : []),
    ...(form.moreInfo ? [`${labels.moreInfo}: ${form.moreInfo}`] : []),
  ].filter(Boolean)

  return [t.messageTitle, '', ...lines].join('\n')
}

const haptic = () => { try { navigator?.vibrate?.(10) } catch {} }

const PillSelect = ({ options, value, onChange, multi = false, columns = 2, icons, onAutoAdvance, otherPlaceholder }) => {
  const [otherText, setOtherText] = useState('')
  const otherRef = useRef(null)
  const isSelected = (opt) => multi ? (value || []).includes(opt) : value === opt
  const isOther = (opt) => opt === 'Other' || opt === 'Outro'
  const handleClick = (opt) => {
    haptic()
    if (multi) {
      const set = new Set(value || [])
      if (set.has(opt)) { set.delete(opt) } else { set.add(opt) }
      onChange(Array.from(set))
    } else {
      const newVal = value === opt ? '' : opt
      onChange(newVal)
      if (isOther(opt) && newVal) {
        setTimeout(() => otherRef.current?.focus(), 120)
      } else if (newVal && !multi && onAutoAdvance) {
        setTimeout(() => onAutoAdvance(), 350)
      }
    }
  }
  const gridClass = columns === 1 ? 'grid gap-2 grid-cols-1' : columns === 3 ? 'grid gap-2 grid-cols-3' : 'grid gap-2 grid-cols-1 sm:grid-cols-2'
  /* #7 affordance icon: radio ○/● or checkbox ☐/☑ */
  const indicator = (opt) => {
    if (multi) return isSelected(opt) ? '☑' : '☐'
    return isSelected(opt) ? '●' : '○'
  }
  return (
    <div className="space-y-2">
      <div className={gridClass}>
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => handleClick(opt)}
            className={`rounded-xl border px-3 py-3.5 text-left text-sm transition-all duration-150 flex items-center gap-2 min-h-[44px] ${
              isSelected(opt)
                ? 'border-teal bg-teal/10 text-primary font-medium shadow-sm ring-1 ring-teal/30'
                : 'border-primary/10 bg-white/80 text-primary/70 hover:border-primary/25 hover:bg-cream/40'
            }`}
          >
            <span className={`text-[11px] shrink-0 ${isSelected(opt) ? 'text-teal' : 'text-primary/25'}`}>{indicator(opt)}</span>
            {icons?.[opt] ? <span className="shrink-0">{icons[opt]}</span> : null}
            <span>{opt}</span>
          </button>
        ))}
      </div>
      {/* #17 "Other" auto-expand text input */}
      {(isSelected('Other') || isSelected('Outro')) && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.15 }}>
          <input ref={otherRef} type="text" value={otherText} onChange={(e) => setOtherText(e.target.value)}
            placeholder={otherPlaceholder || 'Tell us more...'}
            className="w-full rounded-xl border border-teal/30 bg-teal/5 px-3 py-2.5 text-sm text-primary placeholder:text-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60" />
        </motion.div>
      )}
    </div>
  )
}

/* #12 WhyTooltip — tap-to-expand below label, mobile-friendly */
const WhyTooltip = ({ text }) => {
  const [open, setOpen] = useState(false)
  return (
    <span className="inline-flex flex-col">
      <button type="button" onClick={() => setOpen(!open)}
        className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-primary/8 px-2.5 py-1 text-[11px] text-primary/50 hover:bg-primary/15 transition min-h-[32px]">
        {open ? '✕' : '?'} <span className="hidden sm:inline">{open ? '' : 'porquê'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.15 }}
            className="mt-1 block rounded-xl border border-teal/20 bg-teal/5 p-2.5 text-xs text-primary/70">
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

/* #11 ServiceCard with popular badge + dimmed "Ainda não sei" */
const ServiceCard = ({ card, selected, onSelect, popularLabel, isSecondary }) => (
  <button type="button" onClick={() => onSelect(card.id)}
    className={`rounded-2xl border p-4 text-left transition-all duration-150 relative ${
      selected
        ? 'border-teal bg-teal/10 shadow-sm ring-1 ring-teal/30'
        : isSecondary
          ? 'border-primary/8 bg-white/60 hover:border-primary/15 hover:bg-cream/30 opacity-70'
          : 'border-primary/10 bg-white/80 hover:border-primary/25 hover:bg-cream/40'
    }`}
  >
    {popularLabel && (
      <span className="absolute -top-2.5 right-3 rounded-full bg-teal text-white px-2.5 py-0.5 text-[11px] font-medium shadow-sm">{popularLabel}</span>
    )}
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className={`text-xs shrink-0 ${selected ? 'text-teal' : 'text-primary/25'}`}>{selected ? '●' : '○'}</span>
        <p className="font-display text-base leading-tight text-primary">{card.title}</p>
      </div>
      {card.tag && <span className="shrink-0 rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] text-primary/70">{card.tag}</span>}
    </div>
    <p className="mt-1.5 ml-5 text-xs text-primary/60">{card.desc}</p>
  </button>
)

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-primary/10">
      <button type="button" onClick={() => { haptic(); setOpen(!open) }}
        className="w-full flex items-center justify-between py-4 text-left text-sm font-medium text-primary hover:text-primary/80 transition">
        <span>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-primary/40 text-lg shrink-0 ml-3">+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="pb-4 text-sm text-primary/70">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SectionDivider = ({ text }) => (
  <div className="flex items-center gap-4 py-2">
    <div className="flex-1 h-px bg-primary/8" />
    <span className="text-xs text-primary/30 font-subtitle font-light tracking-wider">{text}</span>
    <div className="flex-1 h-px bg-primary/8" />
  </div>
)

const ExpandableList = ({ items, t }) => {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? items : items.slice(0, 3)
  return (
    <div className="mt-3 grid gap-1.5">
      {visible.map((item) => (
        <div key={item} className="rounded-xl border border-primary/10 bg-white/80 px-3 py-2 text-xs text-primary/80">
          {item}
        </div>
      ))}
      {items.length > 3 && (
        <button type="button" onClick={() => setExpanded(!expanded)} className="text-xs text-teal hover:underline mt-1 text-left">
          {expanded ? (t?.lang === 'en' ? 'Show less' : 'Ver menos') : `Ver todos (${items.length})`}
        </button>
      )}
    </div>
  )
}

/* Trip cost simulator — suggests a service tier based on trip length and travelers */
const TripSimulator = ({ t }) => {
  const [days, setDays] = useState(7)
  const [persons, setPersons] = useState(4)

  const suggestion = useMemo(() => {
    // Simple heuristic: short trips (≤4 days) + few travelers → Base, longer/complex → Premium
    const complexity = days * persons
    if (complexity <= 12) {
      // Short simple trip — base is enough
      return { tier: t.simulatorBase, price: 60 + Math.max(0, (days - 5)) * 5 + Math.max(0, (persons - 3)) * 10, variant: 'teal' }
    }
    if (complexity <= 28) {
      // Medium — base with extras
      return { tier: t.simulatorBase, price: 60 + (days - 5) * 8 + Math.max(0, (persons - 3)) * 10, variant: 'teal' }
    }
    // Complex trip — premium recommended
    return { tier: t.simulatorPremium, price: 130 + Math.max(0, (days - 7)) * 10 + Math.max(0, (persons - 4)) * 15, variant: 'primary' }
  }, [days, persons, t.simulatorBase, t.simulatorPremium])

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-primary/60">{t.simulatorDays}</label>
        <div className="mt-1 flex items-center gap-3">
          <input type="range" min={2} max={21} value={days} onChange={(e) => setDays(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none bg-primary/10 accent-teal" />
          <span className="text-sm font-medium text-primary w-8 text-right">{days}</span>
        </div>
      </div>
      <div>
        <label className="text-xs text-primary/60">{t.simulatorPersons}</label>
        <div className="mt-1 flex items-center gap-3">
          <input type="range" min={2} max={8} value={persons} onChange={(e) => setPersons(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none bg-primary/10 accent-teal" />
          <span className="text-sm font-medium text-primary w-8 text-right">{persons}</span>
        </div>
      </div>
      <div className="rounded-xl border border-teal/20 bg-teal/5 p-3 text-center">
        <p className="text-xs text-primary/50">{t.simulatorResult}</p>
        <p className="mt-1 text-lg font-display text-primary">{suggestion.tier}</p>
        <p className="text-sm text-teal font-medium">{t.simulatorBasePrice.replace('{price}', String(suggestion.price))}</p>
      </div>
      <p className="text-[11px] text-primary/35 text-center">{t.simulatorNote}</p>
    </div>
  )
}

const NumberStepper = ({ value, onChange, min = 0, max = 6, label }) => {
  const handleChange = (newVal) => { haptic(); onChange(newVal) }
  return (
    <div className="flex items-center justify-between rounded-xl border border-primary/10 bg-white/80 px-4 py-2.5">
      <span className="text-sm text-primary/80">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => handleChange(Math.max(min, value - 1))} disabled={value <= min}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary/60 text-lg transition hover:bg-cream/40 disabled:opacity-30 disabled:cursor-not-allowed">
          −
        </button>
        <motion.span key={value} initial={{ scale: 1.3, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="w-6 text-center text-base font-medium text-primary">{value}</motion.span>
        <button type="button" onClick={() => handleChange(Math.min(max, value + 1))} disabled={value >= max}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary/60 text-lg transition hover:bg-cream/40 disabled:opacity-30 disabled:cursor-not-allowed">
          +
        </button>
      </div>
    </div>
  )
}

const ContextHelper = ({ text }) => (
  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-teal/80 mt-1">{text}</motion.p>
)

/* #2 Progressive disclosure — reveal questions one at a time */
const QuestionReveal = ({ show, children, id }) => (
  <AnimatePresence>
    {show && (
      <motion.div id={id} initial={{ opacity: 0, y: 12, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -8, height: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}>
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)

/* #8 Inline green check for completed questions */
const QuestionCheck = ({ done }) => (
  done ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }} className="inline-flex ml-1.5 text-teal text-xs">✓</motion.span> : null
)

const StepCelebration = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }} className="inline-block ml-2 text-sm">✨</motion.span>
    )}
  </AnimatePresence>
)

const DiagnosisWizard = ({ t, onSubmit, onAutosave, onStepChange, onDataChange, preselectedService }) => {
  const initialState = {
    email: '',
    destination: '',
    attraction: '',
    motivation: '',
    adults: 2,
    kids: [],
    dateMode: '',
    dateFrom: '',
    dateTo: '',
    dateFlexNote: '',
    dateSeason: '',
    meal: '',
    lodging: '',
    lodgingValues: [],
    budget: '',
    service: '',
    travelerProfiles: [],
    familyTraveled: '',
    experienceNotes: '',
    previousTrips: '',
    hardest: '',
    success: '',
    moreInfo: '',
  }

  const [showWelcome, setShowWelcome] = useState(true)
  const [step, setStep] = useState(0)
  const [tried, setTried] = useState({})
  const [celebrateStep, setCelebrateStep] = useState(-1)
  const [showSavePrompt, setShowSavePrompt] = useState(false)
  const [saveEmail, setSaveEmail] = useState('')
  const scrollRef = useRef(null)
  const [data, setData] = useState(() => {
    if (typeof window === 'undefined') return initialState
    const saved = localStorage.getItem(WIZARD_STORAGE_KEY)
    if (!saved) return initialState
    try {
      const parsed = JSON.parse(saved)
      // If they had data, skip welcome
      const hasData = parsed.motivation || parsed.email || parsed.meal
      if (hasData) setShowWelcome(false)
      return { ...initialState, ...parsed }
    } catch {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(data))
    onAutosave?.()
    onDataChange?.(data)
  }, [data, onAutosave, onDataChange])

  useEffect(() => {
    if (preselectedService && preselectedService !== data.service) {
      setData((prev) => ({ ...prev, service: preselectedService }))
    }
  }, [preselectedService])

  const handleChange = (event) => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const setPill = (name, value) => setData((prev) => ({ ...prev, [name]: value }))

  const setAdults = (n) => setData((prev) => {
    const newProfiles = prev.travelerProfiles.slice()
    while (newProfiles.filter((p) => p.role === 'adult').length > n) {
      const idx = newProfiles.findLastIndex((p) => p.role === 'adult')
      if (idx >= 0) newProfiles.splice(idx, 1)
    }
    return { ...prev, adults: n, travelerProfiles: newProfiles }
  })

  const setKidsCount = (n) => setData((prev) => {
    const newKids = prev.kids.slice(0, n)
    while (newKids.length < n) newKids.push('')
    const newProfiles = prev.travelerProfiles.filter((p) => {
      if (p.role === 'child' && p.index >= n) return false
      return true
    })
    return { ...prev, kids: newKids, travelerProfiles: newProfiles }
  })

  const setKidAge = (idx, age) => setData((prev) => {
    const newKids = [...prev.kids]
    newKids[idx] = age
    return { ...prev, kids: newKids }
  })

  const setTravelerProfile = (role, index, profile) => setData((prev) => {
    const newProfiles = [...prev.travelerProfiles]
    const existing = newProfiles.findIndex((p) => p.role === role && p.index === index)
    if (existing >= 0) {
      newProfiles[existing] = { ...newProfiles[existing], profile }
    } else {
      newProfiles.push({ role, index, profile })
    }
    return { ...prev, travelerProfiles: newProfiles }
  })

  /* #14 scroll + focus management */
  const scrollToNext = useCallback((id) => {
    setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      /* Focus first interactive element inside */
      setTimeout(() => {
        const focusable = el.querySelector('button, input, select, textarea')
        focusable?.focus({ preventScroll: true })
      }, 400)
    }, 100)
  }, [])

  const next = () => {
    if (!canAdvance) {
      setTried((prev) => ({ ...prev, [step]: true }))
      return
    }
    setCelebrateStep(step)
    setTimeout(() => setCelebrateStep(-1), 1200)
    const nextStep = Math.min(step + 1, 4)
    setStep(nextStep)
    /* #13 Show save prompt on entering step 2 if no email yet */
    if (nextStep === 2 && !data.email) setShowSavePrompt(true)
  }
  const back = () => setStep((prev) => Math.max(prev - 1, 0))

  /* #5 Quick-start handler */
  const handleQuickStart = () => {
    setData((prev) => ({
      ...prev,
      motivation: isPT ? 'Descanso' : 'Rest',
      adults: 2,
      kids: [],
      dateMode: 'flexible',
      meal: isPT ? 'Tudo incluído' : 'All inclusive',
      lodging: 'Hotel',
      attraction: isPT ? 'Praia' : 'Beach',
    }))
    setShowWelcome(false)
    setStep(2) // Skip to Service step
  }

  const handleRestart = () => {
    if (window.confirm(t.wizardRestartConfirm)) {
      localStorage.removeItem(WIZARD_STORAGE_KEY)
      setData(initialState)
      setStep(0)
      setTried({})
      setShowWelcome(true)
      setShowSavePrompt(false)
    }
  }

  useEffect(() => {
    onStepChange?.(step, t.wizardStepTitles.length)
  }, [step, onStepChange, t.wizardStepTitles.length])

  const isPT = t.wizardBack === 'Voltar'

  /* Helpers for travelers */
  const totalTravelers = data.adults + data.kids.length
  const allKidsHaveAge = data.kids.length === 0 || data.kids.every((k) => k)
  const datesValid = data.dateMode === 'flexible' || (data.dateMode === 'range' && data.dateFrom.trim())
  const allProfilesFilled = data.travelerProfiles.length === totalTravelers && data.travelerProfiles.every((p) => p.profile)

  /* Step order: 0=trip, 1=lodging+attraction, 2=service, 3=profiles, 4=experiences+email */
  const canAdvance = [
    data.motivation && data.dateMode && datesValid && data.adults >= 1 && allKidsHaveAge,
    data.attraction && data.meal && data.lodging,
    data.service,
    allProfilesFilled,
    data.familyTraveled && data.email.trim(),
  ][step]

  const showError = (stepIdx, condition) => tried[stepIdx] && !condition

  const stepsCount = t.wizardStepTitles.length
  const progress = ((step + 1) / stepsCount) * 100
  const remaining = stepsCount - (step + 1)
  const remainingText =
    remaining > 0 && remaining <= 2
      ? remaining === 1
        ? t.wizardProgressRemainingSingle
        : t.wizardProgressRemaining.replace('{count}', String(remaining))
      : ''

  /* Personalized intro for last step (#18) */
  const personalizedIntro = useMemo(() => {
    if (!data.motivation) return ''
    const travelersStr = formatTravelers(isPT ? 'pt' : 'en', data)
    return t.wizardPersonalizedIntro.replace('{motivation}', data.motivation.toLowerCase()).replace('{travelers}', travelersStr)
  }, [data.motivation, data.adults, data.kids, t.wizardPersonalizedIntro, isPT])

  const steps = [
    /* Step 0: Trip — progressive disclosure (#2), destination, motivation, travelers, dates */
    {
      id: 'trip',
      title: t.wizardStepTitles[0],
      content: (
        <div className="space-y-5">
          {/* Destination — optional, first question */}
          <div id="q-destination" className="flex flex-col gap-2">
            <label className="text-xs font-medium text-primary/70" htmlFor="destination">
              {t.wizardQuestions.destination} <span className="text-primary/40 font-normal">{t.wizardOptionalTag}</span>
              <QuestionCheck done={!!data.destination} />
            </label>
            <Input id="destination" name="destination" placeholder={isPT ? 'ex: Algarve, Grécia, ainda não sei...' : 'e.g. Algarve, Greece, not sure yet...'} value={data.destination} onChange={handleChange} className="font-body text-sm" />
          </div>

          {/* Motivation — with icons, always visible */}
          <div id="q-motivation" className="flex flex-col gap-2">
            <label className="text-xs font-medium text-primary/70">
              {t.wizardQuestions.motivation}
              <QuestionCheck done={!!data.motivation} />
            </label>
            <PillSelect options={t.wizardOptions.motivation} value={data.motivation} onChange={(v) => setPill('motivation', v)} icons={t.wizardMotivationIcons} onAutoAdvance={() => scrollToNext('q-travelers')} otherPlaceholder={t.wizardOtherPlaceholder} />
            {data.motivation && t.wizardContextHelpers?.motivation?.[data.motivation] && (
              <ContextHelper text={t.wizardContextHelpers.motivation[data.motivation]} />
            )}
            {showError(0, data.motivation) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}
          </div>

          {/* #2 Progressive: Travelers only visible after motivation */}
          <QuestionReveal show={!!data.motivation} id="q-travelers">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-medium text-primary/70">
                {t.wizardQuestions.whosTravelling}
                <QuestionCheck done={data.adults >= 1} />
              </label>
              <div className="space-y-2">
                <NumberStepper label={t.wizardQuestions.adults} value={data.adults} onChange={setAdults} min={1} max={6} />
                <NumberStepper label={t.wizardQuestions.kids} value={data.kids.length} onChange={setKidsCount} min={0} max={6} />
              </div>
              {/* #10 Compact child age row */}
              {data.kids.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.kids.map((age, i) => (
                    <div key={i} className="flex items-center gap-1.5 rounded-xl border border-primary/10 bg-white/80 px-2.5 py-1.5">
                      <span className="text-[11px] text-primary/50 shrink-0">C{i + 1}</span>
                      <select value={age} onChange={(e) => setKidAge(i, e.target.value)}
                        className="font-body w-16 rounded-lg border-0 bg-transparent py-0 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60">
                        <option value="">—</option>
                        {Array.from({ length: 18 }, (_, n) => (
                          <option key={n} value={String(n)}>{n} {isPT ? 'a' : 'y'}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
              {showError(0, allKidsHaveAge) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}
            </div>
          </QuestionReveal>

          {/* #2 Progressive: Dates only visible after travelers */}
          <QuestionReveal show={!!data.motivation && data.adults >= 1} id="q-dates">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-medium text-primary/70">
                {t.wizardQuestions.whenTravel}
                <QuestionCheck done={!!data.dateMode && datesValid} />
              </label>
              <PillSelect options={[t.wizardQuestions.haveDates, t.wizardQuestions.flexible]} value={data.dateMode === 'range' ? t.wizardQuestions.haveDates : data.dateMode === 'flexible' ? t.wizardQuestions.flexible : ''} onChange={(v) => setPill('dateMode', v === t.wizardQuestions.haveDates ? 'range' : 'flexible')} columns={2} />
              {/* #9 Smarter date input — month pickers */}
              {data.dateMode === 'range' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-primary/50">{t.wizardQuestions.dateFrom}</span>
                    <input type="month" name="dateFrom" value={data.dateFrom} onChange={handleChange}
                      className="font-body w-full rounded-xl border border-primary/15 bg-white px-3 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-primary/50">{t.wizardQuestions.dateTo}</span>
                    <input type="month" name="dateTo" value={data.dateTo || ''} onChange={handleChange}
                      className="font-body w-full rounded-xl border border-primary/15 bg-white px-3 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2" />
                  </div>
                </div>
              )}
              {data.dateMode === 'flexible' && (
                <div className="space-y-2">
                  <PillSelect options={t.wizardSeasons} value={data.dateSeason} onChange={(v) => setPill('dateSeason', v)} columns={3} />
                  <Input name="dateFlexNote" placeholder={t.wizardQuestions.flexibleNote} value={data.dateFlexNote} onChange={handleChange} className="font-body text-sm" />
                </div>
              )}
              {showError(0, data.dateMode && datesValid) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}
            </div>
          </QuestionReveal>
        </div>
      ),
    },
    /* Step 1: Attraction + Lodging + values + budget — with progressive disclosure (#2), dynamic labels (#15) */
    {
      id: 'lodging',
      title: t.wizardStepTitles[1],
      content: (
        <div className="space-y-5">
          <div id="q-attraction" className="flex flex-col gap-2">
            <label className="text-xs font-medium text-primary/70">
              {t.wizardQuestions.attraction}
              <QuestionCheck done={!!data.attraction} />
            </label>
            <PillSelect options={t.wizardOptions.attraction} value={data.attraction} onChange={(v) => setPill('attraction', v)} onAutoAdvance={() => scrollToNext('q-meal')} otherPlaceholder={t.wizardOtherPlaceholder} />
            {showError(1, data.attraction) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}
          </div>

          {/* #2 Progressive + #15 Dynamic label */}
          <QuestionReveal show={!!data.attraction} id="q-meal">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-primary/70">
                {data.motivation ? t.wizardDynamicMeal?.replace('{motivation}', data.motivation.toLowerCase()) : t.wizardQuestions.meal}
                <QuestionCheck done={!!data.meal} />
              </label>
              <PillSelect options={t.wizardOptions.meal} value={data.meal} onChange={(v) => setPill('meal', v)} onAutoAdvance={() => scrollToNext('q-lodging')} />
              {showError(1, data.meal) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}
            </div>
          </QuestionReveal>

          <QuestionReveal show={!!data.attraction && !!data.meal} id="q-lodging">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-primary/70">
                {/* #15 Dynamic label */}
                {data.attraction ? t.wizardDynamicLodging?.replace('{attraction}', data.attraction) : t.wizardQuestions.lodging}
                <QuestionCheck done={!!data.lodging} />
              </label>
              <PillSelect options={t.wizardOptions.lodging} value={data.lodging} onChange={(v) => setPill('lodging', v)} onAutoAdvance={() => scrollToNext('q-lodgingValues')} />
              {data.lodging && t.wizardContextHelpers?.lodging?.[data.lodging] && (
                <ContextHelper text={t.wizardContextHelpers.lodging[data.lodging]} />
              )}
              {showError(1, data.lodging) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}
            </div>
          </QuestionReveal>

          <QuestionReveal show={!!data.lodging} id="q-lodgingValues">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-primary/70">
                {t.wizardQuestions.lodgingValues} <span className="text-primary/40 font-normal">{t.wizardOptionalTag}</span>
                {t.wizardWhyAsk?.lodgingValues && <WhyTooltip text={t.wizardWhyAsk.lodgingValues} />}
              </label>
              <PillSelect options={t.wizardOptions.lodgingValues} value={data.lodgingValues} onChange={(v) => setPill('lodgingValues', v)} multi otherPlaceholder={t.wizardOtherPlaceholder} />
            </div>
          </QuestionReveal>

          <QuestionReveal show={!!data.lodging} id="q-budget">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-primary/70" htmlFor="budget">
                {t.wizardQuestions.budget} <span className="text-primary/40 font-normal">{t.wizardOptionalTag}</span>
                {t.wizardWhyAsk?.budget && <WhyTooltip text={t.wizardWhyAsk.budget} />}
              </label>
              <Input id="budget" name="budget" placeholder={isPT ? 'ex: 2000€, sem limite, quero ver opções...' : 'e.g. €2000, no limit, show me options...'} value={data.budget} onChange={handleChange} className="font-body text-sm" />
            </div>
          </QuestionReveal>
        </div>
      ),
    },
    /* Step 2: Service — with popular badge (#11) and save prompt (#13) */
    {
      id: 'service',
      title: t.wizardStepTitles[2],
      content: (
        <div className="flex flex-col gap-3">
          <label className="text-xs font-medium text-primary/70">{t.wizardQuestions.service}</label>
          <div className="grid gap-3">
            {t.serviceCards.map((card, idx) => (
              <ServiceCard key={card.id} card={card} selected={data.service === card.id}
                onSelect={(id) => { haptic(); setPill('service', id) }}
                popularLabel={idx === 0 ? t.wizardPopularTag : undefined}
                isSecondary={idx === 3} />
            ))}
          </div>
          {showError(2, data.service) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}

          {/* #13 Save & continue email capture */}
          <AnimatePresence>
            {showSavePrompt && !data.email && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="mt-2 rounded-2xl border border-teal/20 bg-teal/5 p-4">
                <p className="text-xs text-primary/70 mb-2">{t.wizardSaveEmailPrompt}</p>
                <div className="flex gap-2">
                  <input type="email" value={saveEmail} onChange={(e) => setSaveEmail(e.target.value)} placeholder={isPT ? 'o-teu@email.com' : 'your@email.com'}
                    className="font-body flex-1 rounded-xl border border-primary/15 bg-white px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60" />
                  <button type="button" onClick={() => { if (saveEmail.includes('@')) { setPill('email', saveEmail); setShowSavePrompt(false) } }}
                    className="shrink-0 rounded-xl bg-teal text-white px-3 py-2 text-xs font-medium hover:bg-teal/90 transition">{t.wizardSaveEmailBtn}</button>
                </div>
                <button type="button" onClick={() => setShowSavePrompt(false)} className="mt-1.5 text-[11px] text-primary/40 hover:text-primary/60">✕ {isPT ? 'Não, obrigado' : 'No thanks'}</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
    },
    /* Step 3: Profiles — dynamic based on travelers from Step 0 */
    {
      id: 'profiles',
      title: t.wizardStepTitles[3],
      content: (
        <div className="space-y-5">
          {/* Adult profiles */}
          {Array.from({ length: data.adults }, (_, i) => {
            const current = data.travelerProfiles.find((p) => p.role === 'adult' && p.index === i)
            return (
              <div key={`adult-${i}`} id={`q-adult-${i}`} className="flex flex-col gap-2">
                <label className="text-xs font-medium text-primary/70">
                  {t.wizardQuestions.adultProfile.replace('{n}', String(i + 1))}
                  {i === 0 && t.wizardWhyAsk?.adultProfile && <WhyTooltip text={t.wizardWhyAsk.adultProfile} />}
                </label>
                <PillSelect options={t.wizardOptions.adultProfile} value={current?.profile || ''} onChange={(v) => setTravelerProfile('adult', i, v)} columns={1}
                  onAutoAdvance={() => {
                    const nextId = i + 1 < data.adults ? `q-adult-${i + 1}` : data.kids.length > 0 ? 'q-child-0' : null
                    if (nextId) scrollToNext(nextId)
                  }} />
                {showError(3, current?.profile) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}
              </div>
            )
          })}
          {/* Child profiles */}
          {data.kids.map((age, i) => {
            const current = data.travelerProfiles.find((p) => p.role === 'child' && p.index === i)
            const ageNum = parseInt(age, 10)
            const ageLabel = !isNaN(ageNum) ? `${ageNum} ${ageNum === 1 ? (isPT ? 'ano' : 'yr') : (isPT ? 'anos' : 'yrs')}` : '?'
            const label = t.wizardQuestions.childProfile.replace('{n}', String(i + 1)).replace('{age}', ageLabel)
            const showNap = !isNaN(ageNum) && ageNum <= 5
            const childOpts = showNap ? [...t.wizardOptions.childProfile, t.wizardOptions.childProfileNap] : t.wizardOptions.childProfile
            return (
              <div key={`child-${i}`} id={`q-child-${i}`} className="flex flex-col gap-2">
                <label className="text-xs font-medium text-primary/70">{label}</label>
                <PillSelect options={childOpts} value={current?.profile || ''} onChange={(v) => setTravelerProfile('child', i, v)}
                  onAutoAdvance={() => {
                    const nextId = i + 1 < data.kids.length ? `q-child-${i + 1}` : null
                    if (nextId) scrollToNext(nextId)
                  }} />
                {showError(3, current?.profile) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}
              </div>
            )
          })}
          {totalTravelers === 0 && <p className="text-sm text-primary/50">{isPT ? 'Volta ao passo 1 e indica quem vai viajar.' : 'Go back to step 1 and add your travelers.'}</p>}
        </div>
      ),
    },
    /* Step 4: Experiences + Email — "Almost there!" (#3, #5, #10, #18) */
    {
      id: 'final',
      title: t.wizardStepTitles[4],
      content: (
        <div className="space-y-5">
          {/* Personalized intro (#18) */}
          {personalizedIntro && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-teal font-medium">{personalizedIntro}</motion.p>
          )}

          <div id="q-familyTraveled" className="flex flex-col gap-2">
            <label className="text-xs font-medium text-primary/70">{t.wizardQuestions.familyTraveled}</label>
            <PillSelect options={t.wizardOptions.familyTraveled} value={data.familyTraveled} onChange={(v) => setPill('familyTraveled', v)} onAutoAdvance={() => scrollToNext('q-experienceNotes')} />
            {showError(4, data.familyTraveled) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}
          </div>

          {/* Single smart textarea instead of 4 (#10) */}
          <div id="q-experienceNotes" className="flex flex-col gap-2">
            <label className="text-xs font-medium text-primary/70">
              {isPT ? 'Partilha o que quiseres' : 'Share what you like'} <span className="text-primary/40 font-normal">{t.wizardOptionalTag}</span>
            </label>
            <Input as="textarea" id="experienceNotes" name="experienceNotes" rows="4" placeholder={t.wizardExperiencePrompt} value={data.experienceNotes} onChange={handleChange} className="font-body text-sm" />
          </div>

          {/* Email — moved here from Step 4 (#3) */}
          <div id="q-email" className="flex flex-col gap-2 rounded-2xl border border-teal/20 bg-teal/5 p-4">
            <label className="text-xs font-medium text-primary/70" htmlFor="email">{t.wizardQuestions.email}</label>
            <Input id="email" name="email" type="email" required placeholder={isPT ? 'o-teu@email.com' : 'your@email.com'} value={data.email} onChange={handleChange} className="font-body text-sm" />
            {showError(4, data.email.trim()) && <p className="text-xs text-amber-600">{t.wizardRequiredNote}</p>}
            <p className="text-xs text-primary/50">{t.wizardReassureEmail}</p>
            <p className="text-xs text-primary/50">{t.wizardReassurePrivacy}</p>
          </div>
        </div>
      ),
    },
  ]

  /* Welcome screen (#7) with social proof (#19) and quick-start (#5) */
  if (showWelcome) {
    return (
      <div className="relative flex flex-col items-center justify-center py-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="max-w-sm mx-auto">
          <p className="text-3xl mb-3">✈️</p>
          <h3 className="font-display text-2xl text-primary">{t.wizardWelcomeTitle}</h3>
          <p className="mt-2 text-sm text-primary/70">{t.wizardWelcomeBody}</p>
          <p className="mt-1 text-xs text-primary/50">{t.wizardWelcomeNote}</p>
          <p className="mt-2 text-xs text-teal/80 font-medium">{t.wizardWelcomeSocialProof}</p>

          {/* Quick-match mini quiz — 3 taps before entering the full wizard */}
          <div className="mt-5 text-left space-y-3">
            <p className="text-xs font-medium text-primary/60 text-center">{isPT ? 'Começa por aqui:' : 'Start here:'}</p>
            <div>
              <p className="text-xs text-primary/50 mb-1.5">{isPT ? 'O que vos atrai mais?' : 'What attracts you most?'}</p>
              <div className="grid grid-cols-3 gap-2">
                {(isPT ? ['🏖️ Praia', '🏙️ Cidade', '🌿 Natureza'] : ['🏖️ Beach', '🏙️ City', '🌿 Nature']).map((opt) => {
                  const val = opt.replace(/^.+\s/, '')
                  return (
                  <button key={opt} type="button" onClick={() => { haptic(); setPill('attraction', data.attraction === val ? '' : val) }}
                    className={`rounded-xl border px-2 py-3 text-sm min-h-[44px] transition ${data.attraction === val ? 'border-teal bg-teal/10 text-primary font-medium' : 'border-primary/10 bg-white/80 text-primary/60 hover:border-primary/20'}`}>
                    {opt}
                  </button>
                )})}
              </div>
            </div>
            <div>
              <p className="text-xs text-primary/50 mb-1.5">{isPT ? 'Quantas crianças?' : 'How many kids?'}</p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, '4+'].map((n) => {
                  const val = n === '4+' ? 4 : n
                  const isActive = data.kids.length === val
                  return (
                    <button key={n} type="button" onClick={() => {
                      haptic()
                      const newKids = Array(val).fill('')
                      setData((prev) => ({ ...prev, kids: isActive ? [] : newKids }))
                    }}
                      className={`rounded-xl border px-2 py-3 text-sm min-h-[44px] transition ${isActive ? 'border-teal bg-teal/10 text-primary font-medium' : 'border-primary/10 bg-white/80 text-primary/60 hover:border-primary/20'}`}>
                      {n}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 items-center">
            <Button type="button" variant="primary" size="lg" onClick={() => setShowWelcome(false)}>
              {t.wizardWelcomeStart}
            </Button>
            <button type="button" onClick={handleQuickStart}
              className="text-xs text-primary/50 hover:text-teal transition underline underline-offset-2 decoration-primary/20 hover:decoration-teal/50">
              {t.wizardWelcomeQuickStart}
            </button>
            <p className="text-[11px] text-primary/30">{t.wizardWelcomeQuickNote}</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative" ref={scrollRef}>
      {/* Step watermark (#17) */}
      <div className="absolute -top-2 -right-2 text-[72px] leading-none opacity-[0.04] pointer-events-none select-none">
        {t.wizardStepWatermarks?.[step] || ''}
      </div>

      {/* Step header */}
      <div className="flex items-center justify-between text-xs text-primary/60">
        <span className="text-sm font-medium text-primary/80">
          {steps[step].title}
          <StepCelebration show={celebrateStep === step - 1} />
        </span>
        {/* Restart link (#19) */}
        <button type="button" onClick={handleRestart} className="text-[11px] text-primary/30 hover:text-primary/60 transition">{t.wizardRestart}</button>
      </div>
      <p className="mt-1 text-sm text-primary/60">{t.wizardStepHelpers[step]}</p>

      {/* #6 Progress stepper with step labels on desktop */}
      <div className="mt-3 flex items-center gap-1">
        {t.wizardStepTitles.map((title, i) => (
          <div key={i} className="flex-1">
            <div className={`h-1.5 rounded-full transition-all duration-500 ${
              i < step ? 'bg-teal' : i === step ? 'bg-teal' : 'bg-cream/60'
            }`}>
              {i === step && (
                <motion.div layoutId="progress-active" className="h-1.5 rounded-full bg-teal" initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }} style={{ width: '100%' }} />
              )}
            </div>
            {/* Step labels — desktop only (#6) */}
            <p className={`hidden sm:block mt-1 text-[11px] truncate transition-colors ${i === step ? 'text-primary/60 font-medium' : i < step ? 'text-teal/50' : 'text-primary/20'}`}>
              {title.replace(/^\S+\s/, '')}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center justify-between sm:hidden">
        <span className="text-[11px] text-primary/40">{t.wizardProgress} {step + 1}/{stepsCount}</span>
        {remainingText && <span className="text-[11px] text-primary/40">{remainingText}</span>}
      </div>

      {/* Plan confirmation banner — shows when a service was pre-selected from cards */}
      {preselectedService && step === 0 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl border border-teal/20 bg-teal/5 px-3 py-2 flex items-center justify-between gap-2">
          <p className="text-xs text-primary/70">
            {isPT ? 'Plano selecionado:' : 'Selected plan:'}{' '}
            <span className="font-medium text-primary">{
              t.serviceCards.find((c) => c.id === preselectedService)?.title || preselectedService
            }</span>
          </p>
          <button type="button" onClick={() => { setData((prev) => ({ ...prev, service: '' })); /* Clear but don't reset preselected */ }}
            className="text-[11px] text-primary/40 hover:text-primary/70 transition shrink-0 min-h-[32px]">{isPT ? 'alterar' : 'change'}</button>
        </motion.div>
      )}

      {/* Step content with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="mt-5">
          {steps[step].content}
        </motion.div>
      </AnimatePresence>

      {/* Sticky nav buttons with step context (#18) and animated button (#16) */}
      <div className="sticky bottom-0 -mx-5 md:-mx-6 mt-6 rounded-b-[24px] border-t border-primary/10 bg-white/95 backdrop-blur-sm px-5 md:px-6 py-5 flex items-center justify-between gap-3 z-40">
        <Button type="button" variant="secondary" size="sm" onClick={back} disabled={step === 0}>
          {t.wizardBack}
        </Button>
        {/* #18 Step context in center on mobile */}
        <span className="text-[11px] text-primary/35 sm:hidden">{t.wizardProgress} {step + 1}/{stepsCount}</span>
        {step < steps.length - 1 ? (
          <motion.div animate={canAdvance ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 0.4 }}>
            <Button type="button" variant="primary" size="md" onClick={next}>
              {/* #16 Visual feedback when ready */}
              {canAdvance ? `${t.wizardNext} ✓` : t.wizardNext}
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-end gap-2">
            <motion.div animate={canAdvance ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 0.4 }}>
              <Button type="button" variant="primary" size="md" onClick={() => { if (!canAdvance) { setTried((prev) => ({ ...prev, [step]: true })); return; } onSubmit(data); }} >
                {t.wizardSubmit}
              </Button>
            </motion.div>
            <p className="text-xs text-primary/60">{t.wizardNextStepNote}</p>
          </div>
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

  const [route, setRoute] = useState(() => {
    if (typeof window === 'undefined') return 'home'
    return getCurrentRoute()
  })
  const [message, setMessage] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const [stepStatus, setStepStatus] = useState('')
  const [wizardData, setWizardData] = useState(null)
  const [wizardStep, setWizardStep] = useState({ current: 0, total: 5 })
  const [resumoOpen, setResumoOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  /* Scroll progress tracking */
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (h > 0) setScrollProgress(Math.min(1, window.scrollY / h))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Hero parallax */
  const heroRef = useRef(null)
  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroParallaxY = useTransform(heroScrollProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 40])

  const t = copy[lang]

  const handleServiceSelect = (serviceId) => {
    setPreselectedService(serviceId)
    setTimeout(() => {
      document.getElementById(lang === 'pt' ? 'questionario' : 'questionnaire')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const onPopState = () => setRoute(getCurrentRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setRoute(getCurrentRoute())
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  const handleWizardSubmit = async (data) => {
    const built = buildMessage(lang, data)
    setMessage(built)
    await copyToClipboard(built)
  }

  const handleStepChange = (currentStep, totalSteps) => {
    setWizardStep({ current: currentStep ?? 0, total: totalSteps ?? 5 })
    setStepStatus(lang === 'pt' ? 'Continuas depois — guardado ✅' : 'Continue later — saved ✅')
    setTimeout(() => setStepStatus(''), 1600)
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

  const container = 'mx-auto w-full max-w-[1120px] px-5 sm:px-6'

  return (
    <div className="font-body text-primary">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-primary/10 relative">
        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-teal/60 transition-[width] duration-100" style={{ width: `${scrollProgress * 100}%` }} />
        <div className={`${container} flex items-center justify-between py-2 sm:py-4`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={() => navigate('/')} className="h-12 w-12 sm:h-20 sm:w-20 flex items-center justify-center shrink-0">
              <img src={logoBrand} alt="TravelBuddies" className="h-12 w-12 sm:h-20 sm:w-20 object-contain" />
            </button>
            <div>
              <p className="font-display text-lg sm:text-xl">TravelBuddies</p>
              <p className="font-subtitle font-light text-xs sm:text-sm text-primary hidden sm:block">Organizamos Viagens em Família</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault()
                navigate('/')
              }}
              className={`hover:text-primary/80 ${route === 'home' ? 'text-primary font-semibold' : 'text-primary'}`}
            >
              {t.homeNav}
            </a>
            {route === 'home' &&
              t.navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-primary hover:text-primary/80">
                  {link.label}
                </a>
              ))}
            <a
              href="/produtos"
              onClick={(event) => {
                event.preventDefault()
                navigate('/produtos')
              }}
              className={`hover:text-primary/80 ${route === 'produtos' ? 'text-primary font-semibold' : 'text-primary'}`}
            >
              {t.productsNav}
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop: full CTA + lang toggles */}
            {route === 'home' && (
              <Button as="a" href={lang === 'pt' ? '#questionario' : '#questionnaire'} variant="secondary" size="sm" className="hidden sm:inline-flex">
                {t.primaryCta}
              </Button>
            )}
            <div className="hidden sm:flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={lang === 'pt' ? 'primary' : 'ghost'}
                className={`min-h-[40px] ${
                  lang === 'pt' ? 'bg-primary text-white border-primary' : 'border-primary/20 text-primary/70'
                }`}
                onClick={() => setLang('pt')}
              >
                PT
              </Button>
              <Button
                type="button"
                size="sm"
                variant={lang === 'en' ? 'primary' : 'ghost'}
                className={`min-h-[40px] ${
                  lang === 'en' ? 'bg-primary text-white border-primary' : 'border-primary/20 text-primary/70'
                }`}
                onClick={() => setLang('en')}
              >
                EN
              </Button>
            </div>
            {/* Mobile: hamburger button */}
            <button type="button" onClick={() => setMobileMenuOpen(true)} className="sm:hidden flex items-center justify-center h-11 w-11 rounded-xl border border-primary/10 hover:bg-cream/40 transition" aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="5" x2="17" y2="5"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="15" x2="17" y2="15"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu bottom sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm sm:hidden" onClick={() => setMobileMenuOpen(false)} />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white shadow-[0_-8px_30px_rgba(2,47,89,0.15)] p-6 pb-10 sm:hidden">
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-primary/20" />
              <nav className="space-y-1">
                {route === 'home' && t.navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-primary hover:bg-cream/50 transition min-h-[44px]">
                    {link.label}
                  </a>
                ))}
                <button type="button" onClick={() => { navigate(route === 'home' ? '/produtos' : '/'); setMobileMenuOpen(false) }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-primary hover:bg-cream/50 transition w-full text-left min-h-[44px]">
                  {route === 'home' ? t.productsNav : t.homeNav}
                </button>
              </nav>
              <div className="mt-4 pt-4 border-t border-primary/10 flex items-center justify-between">
                <span className="text-xs text-primary/40">{lang === 'pt' ? 'Idioma' : 'Language'}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setLang('pt'); setMobileMenuOpen(false) }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition min-h-[40px] ${lang === 'pt' ? 'bg-primary text-white' : 'border border-primary/15 text-primary/60'}`}>
                    PT
                  </button>
                  <button type="button" onClick={() => { setLang('en'); setMobileMenuOpen(false) }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition min-h-[40px] ${lang === 'en' ? 'bg-primary text-white' : 'border border-primary/15 text-primary/60'}`}>
                    EN
                  </button>
                </div>
              </div>
              {route === 'home' && (
                <div className="mt-4">
                  <Button as="a" href={lang === 'pt' ? '#questionario' : '#questionnaire'} variant="primary" size="lg" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    {t.primaryCta}
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {route === 'home' ? (
          <>
            {/* Urgency ribbon */}
            <div className="bg-blush/20 border-b border-blush/30 py-2 text-center text-xs text-primary/70">
              {t.heroUrgency}
            </div>

            {/* HERO */}
            <section ref={heroRef} className="pt-4 pb-8 sm:pt-10 sm:pb-10 md:py-14">
              <div className={`${container} grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr] items-center`}>
                {/* Image first on mobile, second on desktop */}
                <Reveal immediate className="relative order-first lg:order-last">
                  <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-tealSoft/70 blur-2xl" />
                  <div className="overflow-hidden rounded-2xl sm:rounded-[24px] -mx-5 sm:mx-0 shadow-[0_12px_30px_rgba(2,47,89,0.1)]">
                    <motion.img src={travel2} alt="Family traveling"
                      style={{ y: heroParallaxY }}
                      className="h-[220px] sm:h-[280px] lg:h-[340px] w-full object-cover object-[50%_42%] scale-[1.10]" />
                  </div>
                </Reveal>
                <Reveal immediate>
                  <h1 className="text-[1.65rem] sm:text-[2.1rem] lg:text-[2.6rem] font-display leading-[1.25] text-balance whitespace-pre-line">
                    {t.heroTitle}
                  </h1>
                  <p className="font-subtitle font-light mt-3 text-sm sm:text-base text-primary/70 text-balance max-w-lg">{t.heroBody}</p>
                  <div className="mt-5">
                    <p className="font-subtitle font-light mb-2 text-sm text-primary/60">{t.heroCtaPrompt}</p>
                    <Button as="a" href={lang === 'pt' ? '#questionario' : '#questionnaire'} variant="primary" size="lg">
                      {t.primaryCta}
                    </Button>
                    <p className="font-subtitle font-light mt-2 btn-helper">{t.heroCtaNote}</p>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* QUALIFY — "Isto é para ti se…" */}
            <section className="py-8 md:py-10 border-t border-primary/5">
              <div className={container}>
                <Reveal>
                  <h2 className="text-[1.5rem] sm:text-[1.8rem] font-display leading-[1.25]">{t.qualifyTitle}</h2>
                </Reveal>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {t.qualifyItems.map((item, i) => (
                    <Reveal key={item.title}>
                      <Card className={`p-4 min-h-[80px] ${i === t.qualifyItems.length - 1 ? 'border-blush/30 bg-blush/5' : ''}`}>
                        <p className="text-sm font-semibold text-primary">{item.title}</p>
                        <p className="mt-1 text-xs text-primary/60">{item.text}</p>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="como-funciona" className="py-8 md:py-10 border-t border-primary/5 bg-cream/15">
              <div className={container}>
                <Reveal>
                  <h2 className="text-[1.5rem] sm:text-[1.8rem] font-display leading-[1.25]">{t.howTitle}</h2>
                </Reveal>
                {/* Desktop: 3-column grid | Mobile: vertical timeline */}
                <div className="mt-8 hidden sm:grid gap-6 sm:grid-cols-3">
                  {t.howSteps.map((s, i) => (
                    <Reveal key={s.title}>
                      <div className="text-left">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal text-white text-lg font-semibold">{i + 1}</span>
                        <h3 className="mt-3 font-display text-lg text-primary">{s.title}</h3>
                        <p className="mt-1 text-sm text-primary/60">{s.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                {/* Mobile vertical timeline */}
                <div className="mt-6 sm:hidden space-y-0">
                  {t.howSteps.map((s, i) => (
                    <Reveal key={s.title}>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-white text-lg font-semibold shrink-0">{i + 1}</span>
                          {i < t.howSteps.length - 1 && <div className="w-0.5 flex-1 bg-teal/20 mt-2 mb-2 min-h-[24px]" />}
                        </div>
                        <div className="pb-6">
                          <h3 className="font-display text-lg text-primary mt-1.5">{s.title}</h3>
                          <p className="mt-1 text-sm text-primary/60">{s.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* SERVICES — 3 cards: Free first, Base (popular), Premium (elevated) */}
            <section id="services" className="py-8 md:py-10 bg-white/70 border-t border-primary/5">
              <div className={container}>
                <Reveal>
                  <h2 className="text-[1.5rem] sm:text-[1.8rem] font-display leading-[1.25]">{t.servicesTitle}</h2>
                  <p className="font-subtitle font-light mt-2 text-primary text-balance">{t.servicesBody}</p>
                </Reveal>
                {/* Travel Planner offer banner */}
                <Reveal>
                  <div className="mt-4 rounded-2xl border border-teal/20 bg-teal/5 px-4 py-2.5 text-xs text-primary/70 text-center flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal shrink-0"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
                    {t.servicesTravelPlanner}
                  </div>
                </Reveal>
                {/* Mobile: horizontal swipe cards | Desktop: 3-col grid */}
                <div className="mt-6 -mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none flex sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-4 sm:pb-0 scrollbar-hide">
                  {/* FREE card */}
                  <Reveal className="w-[85vw] sm:w-auto shrink-0 snap-center">
                    <Card className="relative p-5 bg-tealSoft/8 flex flex-col h-full">
                      <span className="absolute -top-2.5 right-4 rounded-full bg-teal/80 text-white px-3 py-0.5 text-[11px] font-medium shadow-sm">{t.freeTag}</span>
                      <h3 className="font-display text-xl text-primary leading-none">{t.freeTitle}</h3>
                      <p className="mt-1 text-sm font-display text-teal">{t.freeSubtitle}</p>
                      <p className="mt-2 text-sm font-medium text-primary/80">{t.freeBenefit}</p>
                      <p className="mt-2 text-xs text-primary/55">{t.freeWhen}</p>
                      <ExpandableList items={t.freeDetailedList} />
                      <div className="mt-auto pt-4">
                        <Button type="button" variant="secondary" size="sm" className="w-full"
                          onClick={() => { haptic(); handleServiceSelect('Orçamento e marcação de viagem') }}>
                          {t.serviceCtaFree}
                        </Button>
                      </div>
                    </Card>
                  </Reveal>
                  {/* BASE card — "Mais pedido" */}
                  <Reveal className="w-[85vw] sm:w-auto shrink-0 snap-center">
                    <Card className="relative p-5 flex flex-col h-full ring-1 ring-teal/15">
                      <span className="absolute -top-2.5 right-4 rounded-full bg-teal text-white px-3 py-0.5 text-[11px] font-medium shadow-sm">{t.baseBadge}</span>
                      <h3 className="font-display text-xl text-primary leading-none">{t.baseTitle}</h3>
                      <p className="mt-1 text-sm font-display text-teal">{t.baseSubtitle}</p>
                      <p className="mt-2 text-sm font-medium text-primary/80">{t.baseBenefit}</p>
                      <p className="mt-1 text-[11px] text-teal/70">{t.baseDiscount}</p>
                      <p className="mt-2 text-xs text-primary/55">{t.baseWhen}</p>
                      <ExpandableList items={t.baseDetailedList} />
                      <div className="mt-auto pt-4">
                        <Button type="button" variant="primary" size="sm" className="w-full"
                          onClick={() => { haptic(); handleServiceSelect('Organização de Viagem em família (Plano Base)') }}>
                          {t.serviceCta}
                        </Button>
                      </div>
                    </Card>
                  </Reveal>
                  {/* PREMIUM card — elevated + bundles */}
                  <Reveal className="w-[85vw] sm:w-auto shrink-0 snap-center">
                    <Card variant="elevated" className="relative p-5 bg-gradient-to-br from-cream/50 to-tealSoft/15 ring-2 ring-teal/15 flex flex-col h-full">
                      <span className="absolute -top-2.5 right-4 rounded-full bg-primary text-white px-3 py-0.5 text-[11px] font-medium shadow-sm">{t.premiumBadge}</span>
                      <h3 className="font-display text-xl text-primary leading-none">{t.premiumTitle}</h3>
                      <p className="mt-1 text-sm font-display text-teal">{t.premiumSubtitle}</p>
                      <p className="mt-2 text-sm font-medium text-primary/80">{t.premiumBenefit}</p>
                      <Badge className="mt-2 text-[11px]">{t.premiumIncludesBase}</Badge>
                      <p className="mt-2 text-xs text-primary/55">{t.premiumWhen}</p>
                      <ExpandableList items={t.premiumDetailedList} />
                      {/* Premium bundles with product thumbnails */}
                      <div className="mt-3 rounded-xl border border-blush/25 bg-blush/5 px-3 py-2.5">
                        <p className="text-[11px] font-semibold text-primary/70">{t.premiumBundleTitle}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <img src={productBuddies} alt="Travel Buddy" className="h-10 w-10 rounded-lg object-cover shadow-sm" />
                          <img src={productCaps} alt="Boné" className="h-10 w-10 rounded-lg object-cover shadow-sm" />
                          <div className="flex-1">
                            <p className="text-[11px] text-primary/60">{t.premiumBundleA}</p>
                            <p className="text-[11px] text-primary/60">{t.premiumBundleB}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto pt-4">
                        <Button type="button" variant="primary" size="sm" className="w-full"
                          onClick={() => { haptic(); handleServiceSelect('Organização de Viagem em família (Premium)') }}>
                          {t.serviceCta}
                        </Button>
                      </div>
                    </Card>
                  </Reveal>
                </div>
                {/* Swipe hint — mobile only */}
                <p className="mt-2 text-center text-[11px] text-primary/30 sm:hidden">{lang === 'pt' ? '← desliza para comparar →' : '← swipe to compare →'}</p>
                <p className="font-subtitle font-light mt-3 text-xs text-primary/40">{t.pricingNote}</p>

                {/* Trip cost simulator */}
                <Reveal>
                  <Card className="mt-6 p-5 max-w-md mx-auto">
                    <h3 className="font-display text-lg text-primary text-center">{t.simulatorTitle}</h3>
                    <p className="mt-1 text-xs text-primary/60 text-center">{t.simulatorBody}</p>
                    <div className="mt-4">
                      <TripSimulator t={t} />
                    </div>
                  </Card>
                </Reveal>
              </div>
            </section>

            {/* FAQ */}
            <section className="py-10 md:py-12 border-t border-primary/5">
              <div className={`${container} max-w-[720px]`}>
                <Reveal>
                  <Card className="p-5 sm:p-8 bg-cream/20">
                    <h2 className="text-[1.65rem] sm:text-[1.95rem] font-display leading-[1.25]">{t.faqTitle}</h2>
                    <div className="mt-6">
                      {t.faqItems.map((item) => <FAQItem key={item.q} q={item.q} a={item.a} />)}
                    </div>
                  </Card>
                </Reveal>
              </div>
            </section>

            {/* FOUNDER section */}
            <section className="py-8 md:py-10 border-t border-primary/5 bg-cream/15">
              <div className={`${container} max-w-[720px]`}>
                <Reveal>
                  <h2 className="text-[1.5rem] sm:text-[1.8rem] font-display leading-[1.25]">{t.founderTitle}</h2>
                  <p className="mt-3 text-sm text-primary/70 leading-relaxed">{t.founderBody}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.founderHighlights.map((h) => (
                      <span key={h} className="rounded-full bg-teal/10 text-teal px-3 py-1 text-xs font-medium">{h}</span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Sticky mobile CTA — full-width with frosted glass */}
            <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden px-4 pb-4 pt-2 bg-gradient-to-t from-white/95 via-white/80 to-transparent backdrop-blur-sm pointer-events-none">
              <Button as="a" href={lang === 'pt' ? '#questionario' : '#questionnaire'} variant="primary" size="lg" className="w-full pointer-events-auto shadow-lg">
                {t.primaryCta}
              </Button>
            </div>

            {/* Floating WhatsApp button — tablet+, stacked above Resumo on sm-lg */}
            <a href="https://wa.me/351919676329" target="_blank" rel="noopener noreferrer"
              className="fixed bottom-5 right-4 z-40 hidden sm:flex items-center gap-2 rounded-full bg-[#25D366] text-white pl-4 pr-5 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              aria-label="WhatsApp">
              <img src={btnWhatsapp} alt="" className="h-5 w-5 brightness-0 invert" />
              <span className="text-sm font-medium">{t.whatsappFloat}</span>
            </a>

            <section id={lang === 'pt' ? 'questionario' : 'questionnaire'} className="py-12 md:py-16 border-t border-primary/10">
              {/* #20 Full-width success state replaces wizard after submit */}
              {message ? (
                <div className={container}>
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                    className="max-w-lg mx-auto text-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
                      className="text-5xl mb-4">🎉</motion.div>
                    <h2 className="font-display text-2xl sm:text-3xl text-primary">{t.wizardSuccessTitle}</h2>
                    <p className="mt-3 text-sm text-primary/70 max-w-md mx-auto">{t.wizardSuccessBody}</p>
                    <div className="mt-6 rounded-2xl border border-teal/20 bg-teal/5 p-5 text-left">
                      <p className="text-xs font-semibold text-primary/80 mb-3">{t.wizardSuccessNext}</p>
                      <div className="space-y-2">
                        {t.wizardSuccessSteps.map((s, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal text-white text-xs font-medium shrink-0">{i + 1}</span>
                            <span className="text-sm text-primary/70">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="mt-6 text-xs text-primary/50 mb-3">{t.wizardSuccessCta}</p>
                    {links && (
                      <div className="grid gap-2 max-w-xs mx-auto">
                        <Button as="a" href={links.whatsapp} target="_blank" rel="noopener noreferrer" variant="primary" size="md" className="w-full">{t.whatsapp}</Button>
                        <Button as="a" href={links.email} variant="secondary" size="sm" className="w-full">{t.email}</Button>
                        <Button as="a" href={links.instagram} target="_blank" rel="noopener noreferrer" variant="link" className="text-center text-xs"
                          onClick={async (event) => { if (!message) return; event.preventDefault(); await copyToClipboard(message); window.open(links.instagram, '_blank'); }}>
                          {t.instagram}
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </div>
              ) : (
              <div className={`${container} grid gap-8 lg:grid-cols-[1fr_320px] items-start`}>
                {/* Left: Wizard — #3 full-screen feel on mobile */}
                <Reveal>
                  <div className="text-center">
                    <h2 className="text-[1.65rem] sm:text-[1.95rem] font-display leading-[1.25]">{t.formTitle}</h2>
                    <p className="font-subtitle font-light mt-3 text-primary">{t.formBody}</p>
                    <p className="font-subtitle font-light mt-2 text-sm text-primary">{t.formHint}</p>
                  </div>
                  {/* #3 On mobile, wizard card gets extra emphasis */}
                  <Card variant="surface" className="mt-6 bg-gradient-to-br from-tealSoft/40 via-white to-cream/40 pt-6 px-5 pb-5 md:p-6 overflow-hidden -mx-5 sm:mx-0 rounded-t-3xl sm:rounded-[24px]">
                    <DiagnosisWizard t={t} onSubmit={handleWizardSubmit} onStepChange={handleStepChange} onDataChange={setWizardData} onAutosave={() => {}} preselectedService={preselectedService} />
                  </Card>
                  <div className="mt-4 grid gap-2 grid-cols-3">
                    {t.wizardReceiveItems.map((item) => (
                      <div key={item} className="rounded-xl border border-primary/10 bg-cream/60 px-3 py-3 text-xs text-primary/70 text-center">
                        {item}
                      </div>
                    ))}
                  </div>
                  {stepStatus && <p className="mt-2 text-xs text-teal text-center">{stepStatus}</p>}
                </Reveal>

                {/* Right: #4 Humanized Resumo — conversational style with icons */}
                <Reveal className="hidden lg:block">
                  <Card variant="elevated" className="p-5 sticky top-24">
                    <div>
                      <p className="text-sm font-semibold">{t.wizardSummaryTitle}</p>
                      <p className="text-xs text-primary/60 mt-1">{t.wizardSummaryBody}</p>
                      <div className="mt-3 space-y-2.5">
                        {wizardData && (wizardData.motivation || wizardData.dateMode || wizardData.meal || wizardData.lodging || wizardData.service || wizardData.email || wizardData.travelerProfiles?.length || wizardData.familyTraveled) ? (
                          <>
                            {wizardData.motivation && (
                              <div className="flex items-start gap-2 rounded-xl bg-cream/50 px-3 py-2">
                                <span className="text-sm shrink-0">{t.wizardMotivationIcons?.[wizardData.motivation] || '✈️'}</span>
                                <div>
                                  <p className="text-[11px] text-primary/40">{t.messageLabels.motivation}</p>
                                  <p className="text-xs text-primary/80 font-medium">{wizardData.motivation}</p>
                                </div>
                              </div>
                            )}
                            {(wizardData.adults || wizardData.kids?.length > 0) && (
                              <div className="flex items-start gap-2 rounded-xl bg-cream/50 px-3 py-2">
                                <span className="text-sm shrink-0">👨‍👩‍👧</span>
                                <div>
                                  <p className="text-[11px] text-primary/40">{t.messageLabels.travelers}</p>
                                  <p className="text-xs text-primary/80 font-medium">{formatTravelers(lang, wizardData)}</p>
                                </div>
                              </div>
                            )}
                            {wizardData.dateMode && (
                              <div className="flex items-start gap-2 rounded-xl bg-cream/50 px-3 py-2">
                                <span className="text-sm shrink-0">📅</span>
                                <div>
                                  <p className="text-[11px] text-primary/40">{t.messageLabels.dates}</p>
                                  <p className="text-xs text-primary/80 font-medium">{formatDates(lang, wizardData)}</p>
                                </div>
                              </div>
                            )}
                            {(wizardData.attraction || wizardData.lodging || wizardData.meal) && (
                              <div className="flex items-start gap-2 rounded-xl bg-cream/50 px-3 py-2">
                                <span className="text-sm shrink-0">🏨</span>
                                <div>
                                  <p className="text-[11px] text-primary/40">{t.wizardSummarySections.lodging}</p>
                                  <p className="text-xs text-primary/80 font-medium">
                                    {[wizardData.attraction, wizardData.lodging, wizardData.meal].filter(Boolean).join(' · ')}
                                  </p>
                                </div>
                              </div>
                            )}
                            {wizardData.service && (
                              <div className="flex items-start gap-2 rounded-xl bg-teal/8 px-3 py-2">
                                <span className="text-sm shrink-0">🎯</span>
                                <div>
                                  <p className="text-[11px] text-primary/40">{t.messageLabels.service}</p>
                                  <p className="text-xs text-primary/80 font-medium">{wizardData.service}</p>
                                </div>
                              </div>
                            )}
                            {wizardData.travelerProfiles?.filter((p) => p.profile).length > 0 && (
                              <div className="flex items-start gap-2 rounded-xl bg-cream/50 px-3 py-2">
                                <span className="text-sm shrink-0">👤</span>
                                <div>
                                  <p className="text-[11px] text-primary/40">{t.wizardSummarySections.profiles}</p>
                                  {wizardData.travelerProfiles.filter((p) => p.profile).map((p, i) => (
                                    <p key={i} className="text-xs text-primary/70">{p.role === 'adult' ? `A${p.index + 1}` : `C${p.index + 1}`}: {p.profile}</p>
                                  ))}
                                </div>
                              </div>
                            )}
                            {wizardData.email && (
                              <div className="flex items-start gap-2 rounded-xl bg-cream/50 px-3 py-2">
                                <span className="text-sm shrink-0">📧</span>
                                <div>
                                  <p className="text-[11px] text-primary/40">{t.messageLabels.email}</p>
                                  <p className="text-xs text-primary/80 font-medium">{wizardData.email}</p>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-primary/15 bg-cream/30 p-4 text-center">
                            <p className="text-xs text-primary/35">{lang === 'pt' ? 'As tuas respostas aparecem aqui...' : 'Your answers will appear here...'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Reveal>
              </div>
              )}

              {/* Mobile floating Resumo drawer */}
              <div className="lg:hidden">
                <motion.button
                  type="button"
                  onClick={() => { haptic(); setResumoOpen(!resumoOpen) }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
                  className="fixed bottom-[4.5rem] sm:bottom-[4.5rem] right-4 z-50 flex items-center gap-2 rounded-full bg-primary text-white px-4 py-2.5 shadow-lg text-xs font-medium transition-all hover:scale-105 min-h-[44px]"
                >
                  {t.wizardStepTitles[wizardStep.current]?.slice(0, 2) || '📋'} {wizardStep.current + 1}/{wizardStep.total}
                  <span className="hidden sm:inline">— {t.wizardSummaryTitle}</span>
                </motion.button>
                <AnimatePresence>
                  {resumoOpen && (
                    <>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={() => setResumoOpen(false)} />
                      <motion.div
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={0.2}
                        onDragEnd={(_, info) => { if (info.offset.y > 100) setResumoOpen(false) }}
                        className="fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-3xl bg-white shadow-[0_-8px_30px_rgba(2,47,89,0.15)] p-5"
                        role="dialog" aria-modal="true" aria-label={t.wizardSummaryTitle}>
                        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-primary/20 cursor-grab" />
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold">{t.wizardSummaryTitle}</p>
                          <button type="button" onClick={() => setResumoOpen(false)} className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-primary/5 text-primary/50 hover:text-primary transition">✕</button>
                        </div>
                        {message ? (
                          <div className="space-y-4">
                            <p className="text-xs text-primary/60">{t.formThankBody}</p>
                            <div className="rounded-2xl border border-dashed border-primary/20 bg-cream/40 p-3 text-xs text-primary/70 whitespace-pre-wrap max-h-[40vh] overflow-y-auto">
                              {message}
                            </div>
                            {links && (
                              <div className="grid gap-2">
                                <Button as="a" href={links.whatsapp} target="_blank" rel="noopener noreferrer" variant="primary" size="md" className="w-full">{t.whatsapp}</Button>
                                <Button as="a" href={links.email} variant="secondary" size="sm">{t.email}</Button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-primary/20 bg-cream/40 p-3 text-xs text-primary/60 space-y-1.5">
                            {wizardData && (wizardData.motivation || wizardData.dateMode || wizardData.adults || wizardData.meal || wizardData.lodging || wizardData.service || wizardData.email || wizardData.travelerProfiles?.length || wizardData.familyTraveled) ? (
                              <>
                                {wizardData.motivation && <p><span className="text-primary/40">{t.messageLabels.motivation}:</span> {wizardData.motivation}</p>}
                                {(wizardData.adults || wizardData.kids?.length > 0) && <p><span className="text-primary/40">{t.messageLabels.travelers}:</span> {formatTravelers(lang, wizardData)}</p>}
                                {wizardData.dateMode && <p><span className="text-primary/40">{t.messageLabels.dates}:</span> {formatDates(lang, wizardData)}</p>}
                                {wizardData.meal && <p><span className="text-primary/40">{t.messageLabels.meal}:</span> {wizardData.meal}</p>}
                                {wizardData.lodging && <p><span className="text-primary/40">{t.messageLabels.lodging}:</span> {wizardData.lodging}</p>}
                                {wizardData.service && <p><span className="text-primary/40">{t.messageLabels.service}:</span> {wizardData.service}</p>}
                                {wizardData.email && <p><span className="text-primary/40">{t.messageLabels.email}:</span> {wizardData.email}</p>}
                                {wizardData.familyTraveled && <p><span className="text-primary/40">{t.messageLabels.familyTraveled}:</span> {wizardData.familyTraveled}</p>}
                              </>
                            ) : (
                              <p className="text-primary/40">{lang === 'pt' ? 'As tuas respostas aparecem aqui...' : 'Your answers will appear here...'}</p>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <section id="trust" className="py-12 md:py-16 border-t border-primary/10">
              <div className={container}>
                <Reveal>
                  <h2 className="text-[1.65rem] sm:text-[1.95rem] font-display leading-[1.25]">{t.trustTitle}</h2>
                </Reveal>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {t.trustCards.map((card) => (
                    <Reveal key={card.title}><Card className="p-5 md:p-6 min-h-[128px]">
                      <p className="text-base font-semibold">{card.title}</p>
                      <p className="mt-2 text-sm text-primary">{card.text}</p>
                    </Card>
                    </Reveal>
                  ))}
                </div>
                <p className="mt-3 text-sm text-primary">{t.trustLine}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[travel1, travel2, travel3].map((img, index) => (
                    <Reveal key={img}>
                      <Card className="overflow-hidden rounded-2xl p-0">
                        <img src={img} alt={t.trustCaptions?.[index] || `Viagem em família ${index + 1}`} className="h-52 sm:h-40 w-full object-cover" loading="lazy" />
                        <p className="px-3 py-2 text-xs text-primary/50 text-center">{t.trustCaptions?.[index]}</p>
                      </Card>
                    </Reveal>
                  ))}
                </div>
                <p className="mt-3 text-xs text-primary/50">{lang === 'pt' ? 'Fotos reais da nossa família.' : 'Real photos of our family.'}</p>
              </div>
            </section>

            {/* Lead Magnet — Travel Planner PDF download */}
            <section className="py-10 md:py-12 border-t border-primary/5 bg-gradient-to-br from-tealSoft/20 to-cream/30">
              <div className={`${container} max-w-[600px]`}>
                <Reveal>
                  <Card className="p-6 sm:p-8 text-center bg-white/80">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    </div>
                    <h2 className="text-[1.5rem] sm:text-[1.8rem] font-display leading-[1.25]">{t.leadMagnetTitle}</h2>
                    <p className="mt-2 text-sm text-primary/70">{t.leadMagnetBody}</p>
                    {/* Peek inside */}
                    <div className="mt-4 flex flex-col gap-1.5 items-start max-w-xs mx-auto text-left">
                      {(lang === 'pt' ? ['Checklist de malas para toda a família', 'Timeline dia-a-dia para a viagem', 'Dicas práticas por tipo de destino'] : ['Family packing checklist', 'Day-by-day trip timeline', 'Practical tips by destination type']).map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-primary/60">
                          <span className="text-teal text-sm">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); haptic(); const email = e.target.elements.leadEmail?.value; if (email) { window.open(`mailto:joana_krisna@hotmail.com?subject=${encodeURIComponent(lang === 'pt' ? 'Pedido Travel Planner PDF' : 'Travel Planner PDF Request')}&body=${encodeURIComponent(lang === 'pt' ? `Olá! Quero receber o Travel Planner gratuito. O meu email é: ${email}` : `Hi! I want to receive the free Travel Planner. My email is: ${email}`)}`, '_self') } }}
                      className="mt-5 flex gap-2 items-stretch max-w-sm mx-auto">
                      <input type="email" name="leadEmail" required placeholder="email@exemplo.com"
                        className="flex-1 rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-teal/50 min-h-[48px]" />
                      <Button type="submit" variant="primary" size="md" className="shrink-0">{t.leadMagnetCta}</Button>
                    </form>
                    <p className="mt-2 text-[11px] text-primary/35">{t.leadMagnetNote}</p>
                  </Card>
                </Reveal>
              </div>
            </section>
          </>
        ) : (
          <ProductsPage lang={lang} />
        )}
      </main>

      {/* #13/#15 Enhanced footer with navigation, social, copyright */}
      <footer className="py-12 md:py-16 border-t border-primary/10 bg-primary/[0.03]">
        <div className={`${container} grid gap-8 sm:grid-cols-[1fr_auto_auto]`}>
          <div className="space-y-3">
            <img src={logoBrand} alt={t.footerTitle} className="h-14 sm:h-20 w-auto object-contain" />
            <p className="font-subtitle font-light text-sm text-primary max-w-[260px]">{t.footerTagline || t.footerBody}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-primary/40 uppercase tracking-wider">{lang === 'pt' ? 'Navegação' : 'Navigation'}</p>
            {(t.footerNav || t.navLinks).map((link) => (
              <a key={link.href} href={link.href} className="block text-sm text-primary/70 hover:text-primary transition">{link.label}</a>
            ))}
            <a href="/produtos" onClick={(e) => { e.preventDefault(); navigate('/produtos') }}
              className="block text-sm text-primary/70 hover:text-primary transition">{t.productsNav}</a>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-primary/40 uppercase tracking-wider">{lang === 'pt' ? 'Contacto' : 'Contact'}</p>
            <div className="flex gap-3">
              <a href="https://wa.me/351919676329" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><img src={btnWhatsapp} alt="WhatsApp" className="h-10 w-auto" /></a>
              <a href="mailto:joana_krisna@hotmail.com" aria-label="Email"><img src={btnEmail} alt="Email" className="h-10 w-auto" /></a>
              <a href="https://www.instagram.com/family_in_trouble/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src={btnInstagram} alt="Instagram" className="h-10 w-auto" /></a>
            </div>
          </div>
        </div>
        <div className={`${container} mt-8 pt-4 border-t border-primary/8`}>
          <p className="text-xs text-primary/30 text-center">{t.footerCopyright || t.footerSmall}</p>
        </div>
      </footer>
      <Analytics />
    </div>
  )
}
