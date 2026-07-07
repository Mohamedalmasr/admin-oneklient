"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { OrganizationData } from "@/types/onboarding"
import type { SuperAdmin, PhoneEntry, EmailEntry } from "@/types/superadmin"

const STORAGE_KEY = "onboardingOrganizations"
const SELECTED_ORG_KEY = "selectedOnboardingOrganization"

function getOrganizations(): OrganizationData[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveOrganizations(orgs: OrganizationData[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(orgs))
}

function generateId() {
  return "sa_" + Date.now() + "_" + Math.floor(Math.random() * 100000)
}

const defaultPhone: PhoneEntry = { type: "Mobile", number: "", ext: "" }
const defaultEmail: EmailEntry = { type: "Office", email: "" }

export function useAddSuperadmin() {
  const router = useRouter()
  const [mode, setMode] = useState<"add" | "edit">("add")
  const [editId, setEditId] = useState<string | null>(null)
  const [orgId, setOrgId] = useState<string | null>(null)

  const [organization, setOrganization] = useState<OrganizationData | null>(null)
  const [title, setTitle] = useState("")
  const [first, setFirst] = useState("")
  const [middle, setMiddle] = useState("")
  const [last, setLast] = useState("")
  const [dob, setDob] = useState("")
  const [sin, setSin] = useState("")
  const [phones, setPhones] = useState<PhoneEntry[]>([{ ...defaultPhone }])
  const [emails, setEmails] = useState<EmailEntry[]>([{ ...defaultEmail }])
  const [urls, setUrls] = useState<string[]>([""])
  const [streetNo, setStreetNo] = useState("")
  const [unit, setUnit] = useState("")
  const [streetName, setStreetName] = useState("")
  const [dir, setDir] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [postal, setPostal] = useState("")
  const [country, setCountry] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)

  useEffect(() => {
    const m = sessionStorage.getItem("superAdminFormMode") || "add"
    const eId = sessionStorage.getItem("superAdminEditId")
    const oId = sessionStorage.getItem("superAdminSelectedOrganizationId")
    setMode(m as "add" | "edit")
    setEditId(eId)
    setOrgId(oId)

    const orgs = getOrganizations()
    const org = orgs.find((o) => o.id === oId) || null
    setOrganization(org)

    if (m === "edit" && eId && org) {
      const admin = org.superAdmins.find((a) => a.id === eId)
      if (admin) {
        setTitle(admin.title || "")
        setFirst(admin.first || "")
        setMiddle(admin.middle || "")
        setLast(admin.last || "")
        setDob(admin.dob || "")
        setSin(admin.sin || "")

        if (admin.phones?.length) {
          setPhones(admin.phones.map((p) => ({ type: p.type || "Mobile", number: p.number || "", ext: p.ext || "" })))
        }
        if (admin.emails?.length) {
          setEmails(admin.emails.map((e) => ({ type: e.type || "Office", email: e.email || "" })))
        }
        if (admin.urls?.length) {
          setUrls(admin.urls)
        }

        setStreetNo(admin.address?.streetNo || "")
        setUnit(admin.address?.unit || "")
        setStreetName(admin.address?.streetName || "")
        setDir(admin.address?.dir || "")
        setCity(admin.address?.city || "")
        setProvince(admin.address?.province || "")
        setPostal(admin.address?.postal || "")
        setCountry(admin.address?.country || "")
        setPassword(admin.password || "")
      }
    }
  }, [])

  const addPhone = useCallback(() => setPhones((p) => [...p, { ...defaultPhone }]), [])
  const removePhone = useCallback((idx: number) => setPhones((p) => p.filter((_, i) => i !== idx)), [])
  const updatePhone = useCallback((idx: number, field: keyof PhoneEntry, value: string) => {
    setPhones((p) => p.map((ph, i) => (i === idx ? { ...ph, [field]: value } : ph)))
  }, [])

  const addEmail = useCallback(() => setEmails((e) => [...e, { ...defaultEmail }]), [])
  const removeEmail = useCallback((idx: number) => setEmails((e) => e.filter((_, i) => i !== idx)), [])
  const updateEmail = useCallback((idx: number, field: keyof EmailEntry, value: string) => {
    setEmails((e) => e.map((em, i) => (i === idx ? { ...em, [field]: value } : em)))
  }, [])

  const addUrl = useCallback(() => setUrls((u) => [...u, ""]), [])
  const removeUrl = useCallback((idx: number) => setUrls((u) => u.filter((_, i) => i !== idx)), [])
  const updateUrl = useCallback((idx: number, value: string) => {
    setUrls((u) => u.map((url, i) => (i === idx ? value : url)))
  }, [])

  const handleSubmit = useCallback(() => {
    if (!organization) {
      toast.error("No organization context found.")
      return
    }
    if (!title.trim() || !first.trim() || !last.trim() || !password.trim()) {
      toast.error("Please fill all required fields: Title, First Name, Last Name, Password.")
      return
    }
    const validPhones = phones.filter((p) => p.number.trim())
    const validEmails = emails.filter((e) => e.email.trim())
    if (validPhones.length === 0) {
      toast.error("At least one phone number is required.")
      return
    }
    if (validEmails.length === 0) {
      toast.error("At least one email is required.")
      return
    }

    const validUrls = urls.filter((u) => u.trim())

    const admin: SuperAdmin = {
      id: editId || generateId(),
      role: "SuperAdmin",
      organizationId: organization.id,
      title: title.trim(),
      first: first.trim(),
      middle: middle.trim(),
      last: last.trim(),
      dob,
      sin: sin.trim(),
      phones: validPhones,
      emails: validEmails,
      urls: validUrls,
      address: {
        streetNo: streetNo.trim(),
        unit: unit.trim(),
        streetName: streetName.trim(),
        dir: dir === "none" ? "" : dir.trim(),
        city: city.trim(),
        province: province.trim(),
        postal: postal.trim(),
        country: country.trim(),
      },
      groups: [],
      password,
      updatedAt: new Date().toISOString(),
    }

    const orgs = getOrganizations()
    const orgIndex = orgs.findIndex((o) => o.id === organization.id)
    if (orgIndex === -1) {
      toast.error("Organization not found.")
      return
    }

    if (mode === "edit" && editId) {
      const adminIndex = orgs[orgIndex].superAdmins.findIndex((a) => a.id === editId)
      if (adminIndex !== -1) {
        orgs[orgIndex].superAdmins[adminIndex] = admin
      } else {
        orgs[orgIndex].superAdmins.push(admin)
      }
    } else {
      orgs[orgIndex].superAdmins.push(admin)
    }

    saveOrganizations(orgs)
    sessionStorage.setItem(SELECTED_ORG_KEY, JSON.stringify(orgs[orgIndex]))
    toast.success(mode === "edit" ? "SuperAdmin updated!" : "SuperAdmin added!")

    setTimeout(() => router.push("/superadmin-manager"), 2000)
  }, [organization, mode, editId, title, first, middle, last, dob, sin, phones, emails, urls, streetNo, unit, streetName, dir, city, province, postal, country, password, router])

  const handleCancel = useCallback(() => {
    router.push("/superadmin-manager")
  }, [router])

  return {
    mode,
    isEdit: mode === "edit",
    organization,
    title, setTitle,
    first, setFirst,
    middle, setMiddle,
    last, setLast,
    dob, setDob,
    sin, setSin,
    phones, addPhone, removePhone, updatePhone,
    emails, addEmail, removeEmail, updateEmail,
    urls, addUrl, removeUrl, updateUrl,
    streetNo, setStreetNo,
    unit, setUnit,
    streetName, setStreetName,
    dir, setDir,
    city, setCity,
    province, setProvince,
    postal, setPostal,
    country, setCountry,
    password, setPassword,
    showPw, setShowPw,
    handleSubmit,
    handleCancel,
  }
}
