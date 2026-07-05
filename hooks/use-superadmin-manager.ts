"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { OrganizationData } from "@/types/onboarding"

const ONBOARDING_STORAGE_KEY = "onboardingOrganizations"
const SELECTED_ORG_KEY = "selectedOnboardingOrganization"

function wasPageReloaded() {
  try {
    const navEntries = performance.getEntriesByType("navigation")
    if (navEntries && navEntries.length > 0) {
      const nav = navEntries[0] as PerformanceNavigationTiming
      return nav.type === "reload"
    }
    if ((performance as any).navigation) {
      return (performance as any).navigation.type === 1
    }
  } catch {
    // ignore
  }
  return false
}

function clearSuperAdminSessionOnReload() {
  if (!wasPageReloaded()) return
  sessionStorage.removeItem(ONBOARDING_STORAGE_KEY)
  sessionStorage.removeItem(SELECTED_ORG_KEY)
  sessionStorage.removeItem("superAdminSelectedOrganizationId")
  sessionStorage.removeItem("superAdminFormMode")
  sessionStorage.removeItem("superAdminEditId")
  sessionStorage.removeItem("superAdminLastSavedAdminId")
  sessionStorage.removeItem("superAdminLastSavedOrganizationId")
}

function getOrganizationsFromStorage(): OrganizationData[] {
  try {
    const raw = sessionStorage.getItem(ONBOARDING_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function getSelectedOrganizationFromSession(): OrganizationData | null {
  try {
    const raw = sessionStorage.getItem(SELECTED_ORG_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function normalizeOrganizations(list: OrganizationData[]): OrganizationData[] {
  return (Array.isArray(list) ? list : []).map((org) => ({
    ...org,
    superAdmins: Array.isArray(org.superAdmins) ? org.superAdmins : [],
  }))
}

export function useSuperAdminManager() {
  const router = useRouter()
  const [organizations, setOrganizations] = useState<OrganizationData[]>([])
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const [pendingDelete, setPendingDelete] = useState<{
    orgId: string
    adminId: string
    adminName: string
  } | null>(null)

  useEffect(() => {
    clearSuperAdminSessionOnReload()
    const orgs = normalizeOrganizations(getOrganizationsFromStorage())
    setOrganizations(orgs)

    const savedId = sessionStorage.getItem("superAdminSelectedOrganizationId")
    if (savedId && orgs.some((o) => o.id === savedId)) {
      setSelectedOrganizationId(savedId)
    } else {
      const selectedFromSession = getSelectedOrganizationFromSession()
      if (selectedFromSession?.id && orgs.some((o) => o.id === selectedFromSession.id)) {
        setSelectedOrganizationId(selectedFromSession.id)
      } else if (orgs.length > 0) {
        setSelectedOrganizationId(orgs[0].id)
      }
    }
  }, [])

  const saveOrganizations = useCallback((orgs: OrganizationData[]) => {
    sessionStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(orgs))
    setOrganizations(orgs)
  }, [])

  const getOrganizationById = useCallback(
    (id: string) => organizations.find((o) => o.id === id) ?? null,
    [organizations]
  )

  const setSelected = useCallback((orgId: string) => {
    setSelectedOrganizationId(orgId)
    sessionStorage.setItem("superAdminSelectedOrganizationId", orgId)
    const org = organizations.find((o) => o.id === orgId)
    if (org) {
      sessionStorage.setItem(SELECTED_ORG_KEY, JSON.stringify(org))
    }
  }, [organizations])

  const openDeleteModal = useCallback((orgId: string, adminId: string, adminName: string) => {
    setPendingDelete({ orgId, adminId, adminName })
  }, [])

  const closeDeleteModal = useCallback(() => {
    setPendingDelete(null)
  }, [])

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return
    const { orgId, adminId } = pendingDelete
    setOrganizations((prev) => {
      const updated = prev.map((org) => {
        if (org.id !== orgId) return org
        return {
          ...org,
          superAdmins: org.superAdmins.filter((a) => a.id !== adminId),
        }
      })
      sessionStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(updated))
      const selectedOrg = updated.find((o) => o.id === orgId)
      if (selectedOrg) {
        sessionStorage.setItem(SELECTED_ORG_KEY, JSON.stringify(selectedOrg))
      }
      return updated
    })
    setPendingDelete(null)
    toast.success("SuperAdmin deleted successfully.", {
      duration: 5000,
      position: "bottom-right",
      closeButton: true,
    })
  }, [pendingDelete])

  const filteredOrganizations = getFilteredOrganizations(organizations, searchValue)

  const selectedOrganization = selectedOrganizationId
    ? getOrganizationById(selectedOrganizationId)
    : null

  const navigateToAdd = useCallback(() => {
    if (!selectedOrganizationId) return
    sessionStorage.setItem("superAdminFormMode", "add")
    sessionStorage.setItem("superAdminSelectedOrganizationId", selectedOrganizationId)
    sessionStorage.removeItem("superAdminEditId")
    router.push("/add-superadmin")
  }, [selectedOrganizationId, router])

  const navigateToEdit = useCallback(
    (orgId: string, adminId: string) => {
      sessionStorage.setItem("superAdminFormMode", "edit")
      sessionStorage.setItem("superAdminSelectedOrganizationId", orgId)
      sessionStorage.setItem("superAdminEditId", adminId)
      router.push("/add-superadmin")
    },
    [router]
  )

  return {
    organizations,
    selectedOrganizationId,
    selectedOrganization,
    searchValue,
    setSearchValue,
    filteredOrganizations,
    setSelected,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    pendingDelete,
    navigateToAdd,
    navigateToEdit,
    saveOrganizations,
  }
}

function getFilteredOrganizations(orgs: OrganizationData[], search: string) {
  const value = search.trim().toLowerCase()
  if (!value) return orgs
  return orgs.filter((org) =>
    (org.organizationName || "").toLowerCase().includes(value)
  )
}
