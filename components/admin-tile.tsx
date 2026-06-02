"use client"

import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface AdminTileProps {
  title: string
  description: string
  href: string
  message?: string
}

export function AdminTile({
  title,
  description,
  href,
  message,
}: AdminTileProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (message) {
      e.preventDefault()
      toast.success(message)
      setTimeout(() => {
        window.location.href = href
      }, 1500)
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border-2 border-primary/30 bg-white p-5 text-center w-60",
        "shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-lg",
        "dark:border-primary/40 dark:bg-slate-800 dark:hover:bg-slate-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      <span className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </span>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {description}
      </span>
    </a>
  )
}