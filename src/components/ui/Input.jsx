export default function Input({ as = 'input', className = '', ...props }) {
  const Comp = as
  return (
    <Comp
      className={`font-body w-full min-h-[48px] rounded-[14px] border border-primary/15 bg-white px-3 py-3 text-sm text-primary placeholder:text-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${className}`.trim()}
      {...props}
    />
  )
}
