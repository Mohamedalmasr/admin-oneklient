"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  className?: string
  children: ReactNode
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border bg-card shadow-sm dark:bg-card",
        className
      )}
    >
      {children}
    </div>
  )
}