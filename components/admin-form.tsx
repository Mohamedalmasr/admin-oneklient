"use client"

import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAdminForm } from "@/hooks/use-admin-form"
import type { AdminFormData } from "@/types/admin"

const infoMessages: Record<string, string> = {
  "1000100": "Account is in NEW state. Pending initial configuration and activation.",
  "1000200": "The system trust level has not been established. Please complete security verification.",
}

function showInfoToast(code: string) {
  toast.info(code, {
    description: infoMessages[code] ?? "",
    duration: 5000,
    position: "bottom-right",
    closeButton: true,
  })
}

type FieldDef = {
  label: string
  key: keyof AdminFormData
}

const fields: FieldDef[] = [
  { label: "Account Number", key: "accountNumber" },
  { label: "Super Admin Identification Number", key: "superAdminId" },
  { label: "Licence Number", key: "licenceNumber" },
  { label: "Key Code", key: "keyCode" },
  { label: "Pass Key", key: "passKey" },
]

const rightFields: FieldDef[] = [
  { label: "Maximum Numbers of Users", key: "maxUsers" },
  { label: "Maximum Numbers of Documents", key: "maxDocuments" },
  { label: "Maximum Numbers of Journals", key: "maxJournals" },
]

export function AdminForm() {
  const { formData, handleInputChange } = useAdminForm()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-15 gap-y-8">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3.5 items-center">
        {fields.map((f) => (
          <div key={f.key} className="contents">
            <Label className="font-bold text-foreground text-sm whitespace-nowrap">
              {f.label}
            </Label>
            <Input
              placeholder="Text"
              value={formData[f.key]}
              onChange={(e) => handleInputChange(f.key, e.target.value)}
              className="h-[38px] border-[#c8a882] placeholder:text-[#c8a882] focus:border-ring focus:ring-3 focus:ring-ring/50"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3.5 items-center">
        <div className="col-span-full flex items-center gap-2.5 h-[38px]">
          <span className="text-sm font-extrabold text-foreground">
            System is NOT Trusted
          </span>
          <button
            type="button"
            onClick={() => showInfoToast("1000200")}
            className="size-[26px] rounded-full bg-sky-100 text-sky-700 border border-sky-200 inline-flex items-center justify-center text-[15px] font-bold cursor-pointer transition-all hover:bg-sky-200 hover:scale-105"
            title="Click for more info"
            aria-label="Click for more info"
          >
            ?
          </button>
        </div>
        {rightFields.map((f) => (
          <div key={f.key} className="contents">
            <Label className="font-bold text-foreground text-sm whitespace-nowrap">
              {f.label}
            </Label>
            <Input
              placeholder="Text"
              value={formData[f.key]}
              onChange={(e) => handleInputChange(f.key, e.target.value)}
              className="h-[38px] border-[#c8a882] placeholder:text-[#c8a882] focus:border-ring focus:ring-3 focus:ring-ring/50"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
