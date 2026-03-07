const variants = {
  default: 'rounded-[18px] border border-primary/10 bg-white/95 shadow-[0_4px_20px_rgba(2,47,89,0.06)] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(2,47,89,0.1)]',
  elevated: 'rounded-[18px] border border-primary/10 bg-white shadow-[0_8px_24px_rgba(2,47,89,0.08)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(2,47,89,0.12)]',
  muted: 'rounded-[18px] border border-primary/10 bg-cream/30 shadow-[0_2px_12px_rgba(2,47,89,0.04)]',
  surface: 'rounded-[24px] border border-primary/10 bg-white shadow-[0_8px_24px_rgba(2,47,89,0.08)]',
}

export default function Card({ children, className = '', variant = 'default', as = 'div', ...props }) {
  const Comp = as
  return (
    <Comp className={`${variants[variant] ?? variants.default} ${className}`.trim()} {...props}>
      {children}
    </Comp>
  )
}
