export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-primary/15 bg-tealSoft/45 px-3 py-1 text-xs font-medium text-primary ${className}`.trim()}>
      {children}
    </span>
  )
}
