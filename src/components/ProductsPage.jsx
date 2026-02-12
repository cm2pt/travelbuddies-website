import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProductModal from './ProductModal'
import Button from './ui/Button'
import Card from './ui/Card'
import { addOns, productCatalog } from '../data/products'

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
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

const copy = {
  pt: {
    title: 'Produtos TravelBuddies',
    intro: 'Essenciais para viajar em família com mais organização e identidade.',
    pills: [
      { key: 'all', label: 'Todos os produtos' },
      { key: 'planner', label: 'Travel Planner' },
      { key: 'buddies', label: 'Travel Buddies' },
      { key: 'wear', label: 'Vestuário' },
      { key: 'packs', label: 'Packs' },
    ],
    shippingTitle: 'Envios',
    shippingBody: 'Portes de envio aplicam-se a todos os produtos físicos. Envio CTT Expresso — valores consoante peso e destino.',
    addOnFamily: `Add-on: ${addOns.familyPacks.pt}`,
    addOnCombo: `Add-on: ${addOns.comboPacks.pt}`,
  },
  en: {
    title: 'TravelBuddies Products',
    intro: 'Essentials for family travel with more organization and identity.',
    pills: [
      { key: 'all', label: 'All products' },
      { key: 'planner', label: 'Travel Planner' },
      { key: 'buddies', label: 'Travel Buddies' },
      { key: 'wear', label: 'Apparel' },
      { key: 'packs', label: 'Packs' },
    ],
    shippingTitle: 'Shipping',
    shippingBody: 'Shipping costs apply to all physical products. Express shipping via CTT — costs vary depending on weight and destination.',
    addOnFamily: `Add-on: ${addOns.familyPacks.en}`,
    addOnCombo: `Add-on: ${addOns.comboPacks.en}`,
  },
}

export default function ProductsPage({ lang = 'pt' }) {
  const t = copy[lang] || copy.pt
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return productCatalog
    return productCatalog.filter((item) => item.category === activeCategory)
  }, [activeCategory])
  const isPt = lang === 'pt'
  const isFamilyPack = (id) => ['pack-2-conjuntos', 'pack-4-conjuntos', 'pack-7-conjuntos'].includes(id)
  const isComboPack = (id) => ['pack-buddy-planner', 'pack-buddy-bone', 'pack-buddy-tshirt'].includes(id)
  const getTitle = (item) => (isPt ? item.titlePT : item.titleEN)
  const getShort = (item) => (isPt ? item.shortDescriptionPT : item.shortDescriptionEN)
  const getPrimaryLabel = (item) => {
    if (item.category === 'planner') return isPt ? 'Obter versão digital' : 'Get digital version'
    if (item.category === 'packs') return isPt ? 'Escolher este pack' : 'Choose this pack'
    return isPt ? 'Quero este produto' : 'I want this product'
  }

  return (
    <section id="produtos" className="py-12 md:py-16 bg-white">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <Reveal>
          <h1 className="font-display text-[2.1rem] leading-[1.08] text-primary sm:text-5xl">{t.title}</h1>
          <p className="font-body mt-3 max-w-2xl text-base text-primary/85">{t.intro}</p>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-3">
          {t.pills.map((pill) => (
            <Button
              key={pill.key}
              type="button"
              variant={activeCategory === pill.key ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory(pill.key)}
              className={activeCategory === pill.key ? '' : 'bg-transparent'}
            >
              {pill.label}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {filtered.map((item) => (
            <Reveal key={item.id}>
              <Card className="overflow-hidden">
              <img src={item.image} alt={getTitle(item)} className="h-52 w-full object-cover" loading="lazy" />
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-3xl leading-none text-primary">{getTitle(item)}</h2>
                  <span className="font-semibold text-primary text-sm">{item.price}</span>
                </div>
                <p className="font-body mt-3 text-sm text-primary/85">{getShort(item)}</p>
                {isFamilyPack(item.id) && <p className="mt-3 text-xs text-primary/75">{t.addOnFamily}</p>}
                {isComboPack(item.id) && <p className="mt-3 text-xs text-primary/75">{t.addOnCombo}</p>}
                <Button type="button" variant="primary" size="md" onClick={() => setSelected(item)} className="mt-4 w-full">
                  {getPrimaryLabel(item)}
                </Button>
              </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Card variant="muted" className="mt-10 p-6">
          <h3 className="font-display text-3xl text-primary">{t.shippingTitle}</h3>
          <p className="font-body mt-2 text-sm text-primary/85">{t.shippingBody}</p>
          </Card>
        </Reveal>
      </div>

      <ProductModal lang={lang} product={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
