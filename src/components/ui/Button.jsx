const base =
  'inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-[14px] text-sm font-medium leading-none transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary:
    'bg-primary text-white font-semibold shadow-[0_8px_22px_rgba(2,47,89,0.14)] hover:bg-[#0a3b6a] hover:-translate-y-[1px] hover:shadow-[0_12px_26px_rgba(2,47,89,0.18)]',
  secondary: 'border border-primary/30 text-primary font-medium bg-transparent hover:bg-primary/5 hover:-translate-y-[1px]',
  link: 'min-h-0 px-0 py-0 rounded-none text-primary/75 hover:text-primary underline-offset-4 hover:underline',
  ghost: 'border border-primary/20 bg-white text-primary font-medium hover:bg-primary/6',
}

const sizes = {
  sm: 'min-h-[44px] px-4 text-xs',
  md: 'min-h-[48px] px-5 text-sm',
  lg: 'min-h-[52px] px-6 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  as = 'button',
  children,
  ...props
}) {
  const Comp = as
  return (
    <Comp className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`.trim()} {...props}>
      {children}
    </Comp>
  )
}
