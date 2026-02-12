import productPlanner from '../assets/products/product-planner.png'
import productBuddies from '../assets/products/Travel Buddies.png'
import productWear from '../assets/products/product-tshirts.jpg'
import productPack from '../assets/products/product-caps.jpg'

export type ProductCategoryKey = 'planner' | 'buddies' | 'wear' | 'packs'

export type ProductCatalogItem = {
  id: string
  category: ProductCategoryKey
  titlePT: string
  titleEN: string
  shortDescriptionPT: string
  shortDescriptionEN: string
  longDescriptionPT: string
  longDescriptionEN: string
  price: string
  isDigital: boolean
  image: string
}

export const shippingNote = {
  pt: 'Portes de envio aplicam-se a todos os produtos físicos. Envio CTT Expresso — valores consoante peso e destino.',
  en: 'Shipping costs apply to all physical products. Express shipping via CTT — costs vary depending on weight and destination.',
}

export const addOns = {
  familyPacks: { pt: '+5€ Travel Planner', en: '+5€ Travel Planner' },
  comboPacks: { pt: '+3€ Travel Planner', en: '+3€ Travel Planner' },
}

export const productCatalog: ProductCatalogItem[] = [
  {
    id: 'travel-planner-digital',
    category: 'planner',
    titlePT: 'Travel Planner Digital',
    titleEN: 'Digital Travel Planner',
    shortDescriptionPT: 'Guia de viagem em formato PDF com checklists e organização prática.',
    shortDescriptionEN: 'PDF travel playbook with checklists and practical planning.',
    longDescriptionPT:
      'O teu guia completo de viagem pensado para famílias com crianças e bebés. Inclui listas de embalagem, timeline flexível, organização de documentos e mais.',
    longDescriptionEN:
      'Your complete travel guide tailored for families with kids. Includes packing lists, flexible timelines, document organization, and more.',
    price: '4€',
    isDigital: true,
    image: productPlanner,
  },
  {
    id: 'travel-planner-impresso',
    category: 'planner',
    titlePT: 'Travel Planner Impresso',
    titleEN: 'Printed Travel Planner',
    shortDescriptionPT: 'Versão física do planner para planear e acompanhar cada etapa da viagem.',
    shortDescriptionEN: 'Printed planner version to organize and track each stage of your trip.',
    longDescriptionPT:
      'O mesmo método prático do Travel Planner em formato impresso. Ideal para quem prefere escrever, organizar à mão e levar tudo visível durante a viagem.',
    longDescriptionEN:
      'The same practical Travel Planner method in a printed format. Perfect if you prefer handwriting, visual organization, and having everything at hand during the trip.',
    price: '6€',
    isDigital: false,
    image: productPlanner,
  },
  {
    id: 'travel-buddy',
    category: 'buddies',
    titlePT: 'Travel Buddy',
    titleEN: 'Travel Buddy',
    shortDescriptionPT: 'Companheiro prático para manter o essencial da viagem sempre organizado.',
    shortDescriptionEN: 'Practical companion to keep your travel essentials always organized.',
    longDescriptionPT:
      'Pensado para famílias que querem reduzir o caos em viagem. Ajuda-te a centralizar o essencial e a ganhar clareza no dia a dia da viagem.',
    longDescriptionEN:
      'Designed for families who want less chaos while traveling. It helps centralize essentials and brings clarity to everyday travel routines.',
    price: '16,90€',
    isDigital: false,
    image: productBuddies,
  },
  {
    id: 'bone',
    category: 'wear',
    titlePT: 'Boné',
    titleEN: 'Cap',
    shortDescriptionPT: 'Leve, confortável e pensado para dias de viagem ao ar livre.',
    shortDescriptionEN: 'Lightweight, comfortable, and made for outdoor travel days.',
    longDescriptionPT:
      'Boné TravelBuddies para proteger do sol com conforto e estilo discreto. Ideal para passeios longos e dias de calor com crianças.',
    longDescriptionEN:
      'TravelBuddies cap designed for sun protection with comfort and clean style. Great for long walks and warm days with kids.',
    price: '9,90€',
    isDigital: false,
    image: productPack,
  },
  {
    id: 'tshirt-crianca',
    category: 'wear',
    titlePT: 'T-shirt Criança',
    titleEN: 'Kids T-shirt',
    shortDescriptionPT: 'T-shirt confortável e resistente para crianças em movimento.',
    shortDescriptionEN: 'Comfortable, durable t-shirt for kids on the move.',
    longDescriptionPT:
      'Criada para o ritmo real das viagens em família. Tecido leve e corte confortável para acompanhar brincadeiras, deslocações e dias completos fora.',
    longDescriptionEN:
      'Made for real family travel pace. Lightweight fabric and comfortable fit for playtime, transfers, and full days out.',
    price: '15,90€',
    isDigital: false,
    image: productWear,
  },
  {
    id: 'tshirt-adulto',
    category: 'wear',
    titlePT: 'T-shirt Adulto',
    titleEN: 'Adult T-shirt',
    shortDescriptionPT: 'Conforto e versatilidade para pais em viagem.',
    shortDescriptionEN: 'Comfort and versatility for traveling parents.',
    longDescriptionPT:
      'T-shirt pensada para quem viaja com crianças e precisa de peças práticas, leves e fáceis de combinar ao longo da viagem.',
    longDescriptionEN:
      'T-shirt made for parents traveling with kids who need practical, lightweight, and easy-to-style pieces.',
    price: '16,90€',
    isDigital: false,
    image: productWear,
  },
  {
    id: 'pack-2-conjuntos',
    category: 'packs',
    titlePT: '2 Conjuntos',
    titleEN: '2 Sets',
    shortDescriptionPT: 'Pack família base para começar com os essenciais.',
    shortDescriptionEN: 'Starter family pack with key essentials.',
    longDescriptionPT: 'Seleção de 2 conjuntos pensada para simplificar a preparação da viagem em família.',
    longDescriptionEN: '2-set selection built to simplify family trip preparation.',
    price: '35€',
    isDigital: false,
    image: productPack,
  },
  {
    id: 'pack-4-conjuntos',
    category: 'packs',
    titlePT: '4 Conjuntos',
    titleEN: '4 Sets',
    shortDescriptionPT: 'Pack intermédio para famílias que querem mais cobertura.',
    shortDescriptionEN: 'Mid-size pack for families who want broader coverage.',
    longDescriptionPT: 'Seleção de 4 conjuntos para reduzir decisões e ganhar consistência na viagem.',
    longDescriptionEN: '4-set selection to reduce decisions and keep things consistent during the trip.',
    price: '60€',
    isDigital: false,
    image: productPack,
  },
  {
    id: 'pack-7-conjuntos',
    category: 'packs',
    titlePT: '7 Conjuntos T-shirt + Boné',
    titleEN: '7 Sets T-shirt + Cap',
    shortDescriptionPT: 'Pack completo para famílias viajantes.',
    shortDescriptionEN: 'Full pack for traveling families.',
    longDescriptionPT: 'Seleção alargada com T-shirt + Boné para cobrir viagens longas com mais praticidade.',
    longDescriptionEN: 'Expanded T-shirt + Cap selection to support longer trips with more practicality.',
    price: '90€',
    isDigital: false,
    image: productPack,
  },
  {
    id: 'pack-buddy-planner',
    category: 'packs',
    titlePT: 'Travel Buddy + Travel Planner',
    titleEN: 'Travel Buddy + Travel Planner',
    shortDescriptionPT: 'Pack híbrido para organização prática antes e durante a viagem.',
    shortDescriptionEN: 'Hybrid pack for practical planning before and during the trip.',
    longDescriptionPT: 'Combinação ideal para quem quer estrutura simples com apoio visual no planeamento.',
    longDescriptionEN: 'Ideal combo for families wanting simple structure and visual planning support.',
    price: '17,90€',
    isDigital: false,
    image: productBuddies,
  },
  {
    id: 'pack-buddy-bone',
    category: 'packs',
    titlePT: 'Travel Buddy + Boné',
    titleEN: 'Travel Buddy + Cap',
    shortDescriptionPT: 'Pack funcional para conforto e organização em movimento.',
    shortDescriptionEN: 'Functional combo for comfort and organization on the go.',
    longDescriptionPT: 'Junta organização prática e proteção para dias longos de passeio em família.',
    longDescriptionEN: 'Combines practical organization and protection for long family days out.',
    price: '21,90€',
    isDigital: false,
    image: productBuddies,
  },
  {
    id: 'pack-buddy-tshirt',
    category: 'packs',
    titlePT: 'Travel Buddy + T-shirt',
    titleEN: 'Travel Buddy + T-shirt',
    shortDescriptionPT: 'Pack completo para organização e conforto diário.',
    shortDescriptionEN: 'Complete combo for day-to-day comfort and organization.',
    longDescriptionPT: 'Ideal para famílias que valorizam praticidade e uma base simples para a viagem.',
    longDescriptionEN: 'Perfect for families who value practicality and a simple travel setup.',
    price: '29,90€',
    isDigital: false,
    image: productBuddies,
  },
]
