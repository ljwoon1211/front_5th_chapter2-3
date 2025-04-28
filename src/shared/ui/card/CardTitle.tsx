import { forwardRef } from "react"

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(({ className = "", ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))
CardTitle.displayName = "CardTitle"
