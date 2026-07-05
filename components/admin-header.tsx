"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { HelpCircle } from "lucide-react"

export function AdminHeader() {
  const handleInfoClick = () => {
    toast.info("Code: 1000100", {
      description: "Status information",
    })
  }

  return (
    <header className="flex h-15 items-center justify-between border-b bg-slate-50 px-4 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary" />
        <span className="font-bold text-slate-900 dark:text-slate-100">
          ONEklient Solutions Inc.
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Status = NEW
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleInfoClick}
          aria-label="Click for more info"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}