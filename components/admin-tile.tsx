"use client"

import { toast } from "sonner"
import { cn } from "@/lib/utils"

type Status = "red" | "yellow" | "green"

interface AdminTileProps {
  title: string
  description: string
  href: string
  message?: string
  status?: Status
}

const statusConfig: Record<Status, { active: string; inactive: string }> = {
  red: { active: "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]", inactive: "bg-gray-300 dark:bg-gray-600" },
  yellow: { active: "bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.6)]", inactive: "bg-gray-300 dark:bg-gray-600" },
  green: { active: "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]", inactive: "bg-gray-300 dark:bg-gray-600" },
}

const statusOrder: Status[] = ["red", "yellow", "green"]

export function AdminTile({
  title,
  description,
  href,
  message,
  status = "red",
}: AdminTileProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (message) {
      e.preventDefault()
      toast.success(message, {
        duration: 5000,
        position: "bottom-right",
        closeButton: true,
      })
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
      <div className="flex gap-1.5 mb-3" dir="ltr">
        {statusOrder.map((s) => (
          <span
            key={s}
            className={cn(
              "h-3 w-3 rounded-full transition-all duration-300",
              status === s ? statusConfig[s].active : statusConfig[s].inactive
            )}
          />
        ))}
      </div>
      <span className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </span>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {description}
      </span>
    </a>
  )
}