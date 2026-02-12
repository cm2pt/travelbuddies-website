import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import productPlanner from '../assets/products/product-planner.png'
import productBuddies from '../assets/products/Travel Buddies.png'
import productWear from '../assets/products/product-tshirts.jpg'
import productPack from '../assets/products/product-caps.jpg'
import { productGroups } from '../data/products'

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
    shippingBody:
      'Envios para Portugal e UE. Após confirmação, partilhamos prazo estimado e custos de envio.',
    shippingNote: 'Produto físico: acresce envio (valor confirmado por mensagem).',
    buy: 'Comprar',
    close: 'Fechar',
    modalTitle: 'Comprar produto',
    whatsapp: 'Comprar por WhatsApp',
    email: 'Comprar por Email',
    emailSubject: 'Pedido de compra TravelBuddies',
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
    shippingBody: 'Shipping to Portugal and EU. After confirmation, we share delivery time and shipping costs.',
    shippingNote: 'Physical product: shipping applies (final value confirmed by message).',
    buy: 'Buy',
    close: 'Close',
    modalTitle: 'Buy product',
    whatsapp: 'Buy on WhatsApp',
    email: 'Buy by Email',
    emailSubject: 'TravelBuddies purchase request',
  },
}

const categoryImages = {
  planner: productPlanner,
  buddies: productBuddies,
  wear: productWear,
  packs: productPack,
}

export default function ProductsPage({ lang = 'pt' }) {
  const t = copy[lang] || copy.pt
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return productGroups
    return productGroups.filter((group) => group.category === activeCategory)
  }, [activeCategory])

  const purchaseMessage = useMemo(() => {
    if (!selected) return ''
    const isPt = lang === 'pt'
    const shippingLine = selected.isPhysical ? `\n- ${t.shippingNote}` : ''
    if (isPt) {
      return `Olá! Quero comprar:\n- Produto: ${selected.name}\n- Preço final: ${selected.price}${shippingLine}`
    }
    return `Hi! I want to buy:\n- Product: ${selected.name}\n- Final price: ${selected.price}${shippingLine}`
  }, [lang, selected, t.shippingNote])

  const links = useMemo(() => {
    if (!selected) return null
    const encoded = encodeURIComponent(purchaseMessage)
    const subject = encodeURIComponent(t.emailSubject)
    return {
      whatsapp: `https://wa.me/351919676329?text=${encoded}`,
      email: `mailto:joana_krisna@hotmail.com?subject=${subject}&body=${encoded}`,
    }
  }, [purchaseMessage, selected, t.emailSubject])

  const getGroupTitle = (group) => (lang === 'en' ? group.titleEn : group.title)
  const getItemName = (item) => (lang === 'en' ? item.nameEn : item.name)

  return (
    <section id="produtos" className="py-12 sm:py-16 bg-white">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <h1 className="font-display text-4xl text-primary sm:text-5xl">{t.title}</h1>
          <p className="font-body mt-3 max-w-2xl text-base text-primary/85">{t.intro}</p>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-3">
          {t.pills.map((pill) => (
            <button
              key={pill.key}
              type="button"
              onClick={() => setActiveCategory(pill.key)}
              className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                activeCategory === pill.key ? 'border-primary bg-primary text-white' : 'border-primary/25 text-primary hover:border-primary'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {filtered.map((group) => (
            <Reveal key={group.id} className="card overflow-hidden">
              <img src={categoryImages[group.category]} alt={getGroupTitle(group)} className="h-52 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h2 className="font-display text-3xl leading-none text-primary">{getGroupTitle(group)}</h2>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item.id} className="rounded-xl border border-primary/10 bg-white/80 px-3 py-3">
                      <div className="flex items-center justify-between gap-3 text-sm text-primary/85">
                        <span className="font-body">{getItemName(item)}</span>
                        <span className="font-semibold text-primary">{item.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setSelected({
                            ...item,
                            name: getItemName(item),
                            image: categoryImages[group.category],
                          })
                        }
                        className="mt-3 rounded-full border border-primary/20 px-4 py-2 text-xs text-primary hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        {t.buy}
                      </button>
                    </li>
                  ))}
                </ul>
                {group.addOns && (
                  <div className="mt-3 rounded-xl border border-primary/10 bg-cream/40 px-3 py-2">
                    {group.addOns.map((addOn) => (
                      <p key={addOn.name} className="text-sm text-primary/85">
                        <span className="font-body">{getItemName(addOn)}</span>{' '}
                        <span className="font-semibold text-primary">{addOn.price}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 rounded-3xl border border-primary/12 bg-cream/35 p-6">
          <h3 className="font-display text-3xl text-primary">{t.shippingTitle}</h3>
          <p className="font-body mt-2 text-sm text-primary/85">{t.shippingBody}</p>
        </Reveal>
      </div>

      {selected && links && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/35 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-primary/15 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-3xl text-primary">{t.modalTitle}</h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-primary/20 px-3 py-1 text-xs text-primary hover:border-primary"
              >
                {t.close}
              </button>
            </div>
            <img src={selected.image} alt={selected.name} className="mt-4 h-44 w-full rounded-2xl object-cover" />
            <p className="font-display mt-4 text-3xl text-primary">{selected.name}</p>
            <p className="font-body mt-2 text-sm text-primary/85">{selected.description}</p>
            <p className="mt-3 text-sm text-primary">
              <span className="font-body">Preço final:</span> <span className="font-semibold">{selected.price}</span>
            </p>
            {selected.isPhysical && <p className="mt-2 text-xs text-primary/80">{t.shippingNote}</p>}
            <div className="mt-5 grid gap-3">
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-primary px-4 py-3 text-center text-sm text-white shadow-soft"
              >
                {t.whatsapp}
              </a>
              <a
                href={links.email}
                className="rounded-full border border-primary/20 px-4 py-3 text-center text-sm text-primary hover:border-primary"
              >
                {t.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
