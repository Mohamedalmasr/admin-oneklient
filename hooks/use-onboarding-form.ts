"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Contact, OrganizationData, OnboardingFormData } from "@/types/onboarding"

const STORAGE_KEY = "onboardingOrganizations"
const SELECTED_ORG_KEY = "selectedOnboardingOrganization"

const initialFormData: OnboardingFormData = {
  clientCard: "",
  organizationName: "",
  tradeName: "",
  legalStructure: "",
  organizationLegalStatus: "",
  sector: "",
  organizationType: "",
  country: "",
  prov: "",
  legalDoc: "",
  dateEstablished: "",
  fiscalMonth: "",
  fiscalDay: "",
  dateDissolved: "",
  businessNumber: "",
  hstGst: "",
  payroll: "",
  unitApt: "",
  streetNumber: "",
  direction: "",
  streetName: "",
  city: "",
  province: "",
}

export function useOnboardingForm() {
  const router = useRouter()
  const [locked, setLocked] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([{ label: "Home...", method: "Phone", value: "" }])
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData)

  const handleInputChange = useCallback((field: keyof OnboardingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const addContact = useCallback(() => {
    if (locked) return
    setContacts((prev) => [...prev, { label: "Home...", method: "Phone", value: "" }])
  }, [locked])

  const removeContact = useCallback((index: number) => {
    if (locked) return
    if (contacts.length <= 1) {
      setContacts([{ label: "Home...", method: "Phone", value: "" }])
      return
    }
    setContacts((prev) => prev.filter((_, i) => i !== index))
  }, [locked, contacts.length])

  const updateContact = useCallback((index: number, field: keyof Contact, value: string) => {
    if (locked) return
    setContacts((prev) =>
      prev.map((contact, i) => (i === index ? { ...contact, [field]: value } : contact))
    )
  }, [locked])

  const validateForm = useCallback((): boolean => {
    const requiredFields: { key: keyof OnboardingFormData; name: string }[] = [
      { key: "clientCard", name: "Client Card Number" },
      { key: "organizationName", name: "Organization Name" },
      { key: "legalStructure", name: "Legal Structure" },
      { key: "organizationLegalStatus", name: "Legal Status" },
      { key: "sector", name: "Sector" },
      { key: "organizationType", name: "Organization Type" },
      { key: "country", name: "Country" },
      { key: "prov", name: "Prov" },
    ]

    const missing: string[] = []

    requiredFields.forEach((field) => {
      if (!formData[field.key]) {
        missing.push(field.name)
      }
    })

    const hasContact = contacts.some((c) => c.value.trim() !== "")
    if (!hasContact) {
      missing.push("Contact Information")
    }

    if (missing.length > 0) {
      toast.error("Please fill all required fields marked with red asterisk (*)", {
        description: missing.map((m) => `• ${m}`).join("\n"),
      })
      return false
    }

    return true
  }, [formData, contacts])

  const buildOrganizationData = useCallback((): OrganizationData => ({
    id: `org_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    clientCardNumber: formData.clientCard,
    organizationName: formData.organizationName,
    tradeName: formData.tradeName,
    legalStructure: formData.legalStructure,
    organizationLegalStatus: formData.organizationLegalStatus,
    sector: formData.sector,
    organizationType: formData.organizationType,
    country: formData.country,
    prov: formData.prov,
    legalDoc: formData.legalDoc,
    dateEstablished: formData.dateEstablished,
    fiscalYearEnd: {
      month: formData.fiscalMonth,
      day: formData.fiscalDay,
    },
    dateDissolved: formData.dateDissolved,
    businessNumber: formData.businessNumber,
    hstGst: formData.hstGst,
    payroll: formData.payroll,
    legalAddress: {
      unitApt: formData.unitApt,
      streetNumber: formData.streetNumber,
      direction: formData.direction,
      streetName: formData.streetName,
      city: formData.city,
      province: formData.province,
    },
    contacts: contacts.filter((c) => c.value.trim() !== ""),
    superAdmins: [],
    createdAt: new Date().toISOString(),
  }), [formData, contacts])

  const saveOrganization = useCallback((organization: OrganizationData) => {
    const existing = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]")
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, organization]))
    sessionStorage.setItem(SELECTED_ORG_KEY, JSON.stringify(organization))
  }, [])

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return

    setLocked(true)
    const organization = buildOrganizationData()
    saveOrganization(organization)

    toast.success("Organization saved successfully!", {
      description: "Redirecting to admin...",
    })

    setTimeout(() => router.push("/"), 700)
  }, [validateForm, buildOrganizationData, saveOrganization, router])

  const handleCancel = useCallback(() => {
    router.push("/")
  }, [router])

  return {
    locked,
    contacts,
    formData,
    handleInputChange,
    addContact,
    removeContact,
    updateContact,
    handleSubmit,
    handleCancel,
  }
}