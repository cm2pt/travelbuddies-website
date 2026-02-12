import { useMemo } from 'react'
import { shippingNote } from '../data/products'
import Button from './ui/Button'
import Card from './ui/Card'

export default function ProductModal({ lang = 'pt', product, onClose }) {
  if (!product) return null

  const isPt = lang === 'pt'
  const title = isPt ? product.titlePT : product.titleEN
  const description = isPt ? product.longDescriptionPT : product.longDescriptionEN
  const note = isPt ? shippingNote.pt : shippingNote.en
  const subject = encodeURIComponent(isPt ? 'Pedido de compra TravelBuddies' : 'TravelBuddies purchase request')
  const message = useMemo(() => {
    const base = isPt
      ? `Olá! Quero comprar:\n- Produto: ${title}\n- Preço final: ${product.price}`
      : `Hi! I want to buy:\n- Product: ${title}\n- Final price: ${product.price}`
    return product.isDigital ? base : `${base}\n- ${note}`
  }, [isPt, note, product.isDigital, product.price, title])

  const primaryLabel =
    product.category === 'planner'
      ? isPt
        ? 'Obter versão digital'
        : 'Get digital version'
      : product.category === 'packs'
        ? isPt
          ? 'Escolher este pack'
          : 'Choose this pack'
        : isPt
          ? 'Quero este produto'
          : 'I want this product'
  const secondaryLabel = isPt ? 'Prefiro email' : 'Prefer email'
  const helperText =
    product.category === 'planner'
      ? isPt
        ? 'Envio digital após confirmação.'
        : 'Digital delivery after confirmation.'
      : product.category === 'packs'
        ? isPt
          ? 'Podemos ajustar à tua família.'
          : 'We can adapt this to your family.'
        : isPt
          ? 'Resposta rápida por mensagem direta.'
          : 'Quick response via direct message.'

  const encoded = encodeURIComponent(message)
  const links = {
    whatsapp: `https://wa.me/351919676329?text=${encoded}`,
    email: `mailto:joana_krisna@hotmail.com?subject=${subject}&body=${encoded}`,
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/35 p-4">
      <Card variant="surface" className="w-full max-w-lg p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-3xl text-primary">{isPt ? 'Comprar produto' : 'Buy product'}</h3>
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            {isPt ? 'Fechar' : 'Close'}
          </Button>
        </div>
        <img src={product.image} alt={title} className="mt-4 h-44 w-full rounded-2xl object-cover" />
        <p className="font-display mt-4 text-3xl text-primary">{title}</p>
        <p className="font-body mt-2 text-sm text-primary/85">{description}</p>
        <p className="mt-3 text-sm text-primary">
          <span className="font-body">{isPt ? 'Preço final:' : 'Final price:'}</span> <span className="font-semibold">{product.price}</span>
        </p>
        {!product.isDigital && <Card variant="muted" className="mt-3 p-3 text-xs text-primary/80">{note}</Card>}
        <div className="mt-5 grid gap-3">
          <Button as="a" href={links.whatsapp} target="_blank" rel="noreferrer" variant="primary" size="lg" className="w-full">
            {primaryLabel}
          </Button>
          <Button as="a" href={links.email} variant="secondary" size="md" className="w-full">
            {secondaryLabel}
          </Button>
          <p className="btn-helper text-center">{helperText}</p>
        </div>
      </Card>
    </div>
  )
}
