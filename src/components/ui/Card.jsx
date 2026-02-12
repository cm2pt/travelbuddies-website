const variants = {
  default: 'rounded-[18px] border border-primary/10 bg-white/92 shadow-[0_8px_24px_rgba(2,47,89,0.08)] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_12px_26px_rgba(2,47,89,0.11)]',
  elevated: 'rounded-[18px] border border-primary/12 bg-white shadow-[0_12px_28px_rgba(2,47,89,0.1)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_16px_30px_rgba(2,47,89,0.14)]',
  muted: 'rounded-[18px] border border-primary/10 bg-cream/35 shadow-[0_6px_18px_rgba(2,47,89,0.06)]',
  surface: 'rounded-[24px] border border-primary/12 bg-white shadow-[0_12px_30px_rgba(2,47,89,0.1)]',
}

export default function Card({ children, className = '', variant = 'default', as = 'div', ...props }) {
  const Comp = as
  return (
    <Comp className={`${variants[variant] ?? variants.default} ${className}`.trim()} {...props}>
      {children}
    </Comp>
  )
}
