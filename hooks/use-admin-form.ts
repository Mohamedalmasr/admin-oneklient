"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import type { AdminFormData } from "@/types/admin"

const STORAGE_KEY = "adminConfig"

const initialFormData: AdminFormData = {
  accountNumber: "",
  superAdminId: "",
  licenceNumber: "",
  keyCode: "",
  passKey: "",
  maxUsers: "",
  maxDocuments: "",
  maxJournals: "",
}

export function useAdminForm() {
  const [locked, setLocked] = useState(false)
  const [formData, setFormData] = useState<AdminFormData>(initialFormData)

  const handleInputChange = useCallback((field: keyof AdminFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const validateForm = useCallback((): boolean => {
    const requiredFields: { key: keyof AdminFormData; name: string }[] = [
      { key: "accountNumber", name: "Account Number" },
      { key: "licenceNumber", name: "Licence Number" },
      { key: "keyCode", name: "Key Code" },
      { key: "passKey", name: "Pass Key" },
    ]

    const missing: string[] = []

    requiredFields.forEach((field) => {
      if (!formData[field.key]) {
        missing.push(field.name)
      }
    })

    if (missing.length > 0) {
      toast.error("Please fill all required fields", {
        description: missing.map((m) => `• ${m}`).join("\n"),
        duration: 5000,
        position: "bottom-right",
        closeButton: true,
      })
      return false
    }

    return true
  }, [formData])

  const saveConfig = useCallback((data: AdminFormData) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [])

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return

    setLocked(true)
    saveConfig(formData)

    toast.success("Configuration saved successfully!", {
      duration: 5000,
      position: "bottom-right",
      closeButton: true,
    })
  }, [validateForm, saveConfig, formData])

  const handleReset = useCallback(() => {
    setFormData(initialFormData)
    setLocked(false)
  }, [])

  return {
    locked,
    formData,
    handleInputChange,
    handleSubmit,
    handleReset,
  }
}
