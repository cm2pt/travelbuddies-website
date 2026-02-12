export type ProductCategoryKey = 'planner' | 'buddies' | 'wear' | 'packs'

export type ProductLine = {
  id: string
  name: string
  nameEn: string
  price: string
  description: string
  isPhysical: boolean
}

export type ProductGroup = {
  id: string
  category: ProductCategoryKey
  title: string
  titleEn: string
  items: ProductLine[]
  addOns?: ProductLine[]
}

export const productGroups: ProductGroup[] = [
  {
    id: 'travel-planner',
    category: 'planner',
    title: 'Travel Planner',
    titleEn: 'Travel Planner',
    items: [
      {
        id: 'planner-digital',
        name: 'Travel Planner Digital',
        nameEn: 'Digital Travel Planner',
        price: '4€',
        description: 'Versão digital para organizar viagens em família no telemóvel ou computador.',
        isPhysical: false,
      },
      {
        id: 'planner-print',
        name: 'Travel Planner Impresso',
        nameEn: 'Printed Travel Planner',
        price: '6€',
        description: 'Versão impressa pronta a usar para planear em papel.',
        isPhysical: true,
      },
    ],
  },
  {
    id: 'travel-buddies',
    category: 'buddies',
    title: 'Travel Buddies',
    titleEn: 'Travel Buddies',
    items: [
      {
        id: 'travel-buddy',
        name: 'Travel Buddy',
        nameEn: 'Travel Buddy',
        price: '16,90€',
        description: 'Companheiro prático para organização e rotinas em viagem.',
        isPhysical: true,
      },
    ],
  },
  {
    id: 'vestuario',
    category: 'wear',
    title: 'Vestuário',
    titleEn: 'Apparel',
    items: [
      {
        id: 'bone',
        name: 'Boné',
        nameEn: 'Cap',
        price: '9,90€',
        description: 'Boné leve para proteger nos dias de viagem.',
        isPhysical: true,
      },
      {
        id: 'tshirt-kid',
        name: 'T-shirt Criança',
        nameEn: 'Kids T-shirt',
        price: '15,90€',
        description: 'T-shirt confortável para crianças em movimento.',
        isPhysical: true,
      },
      {
        id: 'tshirt-adult',
        name: 'T-shirt Adulto',
        nameEn: 'Adult T-shirt',
        price: '16,90€',
        description: 'T-shirt prática para pais viajantes.',
        isPhysical: true,
      },
    ],
  },
  {
    id: 'packs-familias-viajantes',
    category: 'packs',
    title: 'Packs Famílias Viajantes',
    titleEn: 'Traveling Families Packs',
    items: [
      {
        id: 'pack-family-2',
        name: '2 conjuntos',
        nameEn: '2 sets',
        price: '35€',
        description: 'Pack família com 2 conjuntos selecionados.',
        isPhysical: true,
      },
      {
        id: 'pack-family-4',
        name: '4 conjuntos',
        nameEn: '4 sets',
        price: '60€',
        description: 'Pack família com 4 conjuntos selecionados.',
        isPhysical: true,
      },
      {
        id: 'pack-family-7',
        name: '7 conjuntos T-shirt + Boné',
        nameEn: '7 sets T-shirt + Cap',
        price: '90€',
        description: 'Pack família alargado com T-shirt + Boné.',
        isPhysical: true,
      },
    ],
    addOns: [
      {
        id: 'family-addon-planner',
        name: 'Add-on Travel Planner',
        nameEn: 'Travel Planner add-on',
        price: '+5€',
        description: 'Complemento Travel Planner para o pack.',
        isPhysical: false,
      },
    ],
  },
  {
    id: 'packs',
    category: 'packs',
    title: 'Packs',
    titleEn: 'Packs',
    items: [
      {
        id: 'pack-buddy-planner',
        name: 'Travel Buddy + Travel Planner',
        nameEn: 'Travel Buddy + Travel Planner',
        price: '17,90€',
        description: 'Pack essencial para começar com organização e acompanhamento.',
        isPhysical: true,
      },
      {
        id: 'pack-buddy-bone',
        name: 'Travel Buddy + Boné',
        nameEn: 'Travel Buddy + Cap',
        price: '21,90€',
        description: 'Pack prático para família em movimento.',
        isPhysical: true,
      },
      {
        id: 'pack-buddy-shirt',
        name: 'Travel Buddy + T-shirt',
        nameEn: 'Travel Buddy + T-shirt',
        price: '29,90€',
        description: 'Pack completo com peça de vestuário.',
        isPhysical: true,
      },
    ],
    addOns: [
      {
        id: 'packs-addon-planner',
        name: 'Add-on Travel Planner',
        nameEn: 'Travel Planner add-on',
        price: '+3€',
        description: 'Complemento Travel Planner para o pack.',
        isPhysical: false,
      },
    ],
  },
]
