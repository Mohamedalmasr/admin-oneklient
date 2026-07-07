"use client"

import { useState, useEffect } from "react"
import { AdminForm } from "@/components/admin-form"
import { AdminHeader } from "@/components/admin-header"
import { AdminTile } from "@/components/admin-tile"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { OrganizationData } from "@/types/onboarding"

type Status = "red" | "yellow" | "green"

export default function Home() {
  const [onboardingStatus, setOnboardingStatus] = useState<Status>("red")
  const [superadminStatus, setSuperadminStatus] = useState<Status>("red")

  useEffect(() => {
    const raw = sessionStorage.getItem("onboardingOrganizations")
    if (!raw) return

    let orgs: OrganizationData[]
    try {
      orgs = JSON.parse(raw)
      if (!Array.isArray(orgs)) orgs = []
    } catch {
      orgs = []
    }

    if (orgs.length === 0) return

    const completed = sessionStorage.getItem("onboardingCompleted") === "true"
    setOnboardingStatus(completed ? "green" : "yellow")

    const hasSuperAdmins = orgs.some(
      (org) => Array.isArray(org.superAdmins) && org.superAdmins.length > 0
    )
    setSuperadminStatus(hasSuperAdmins ? "green" : "yellow")
  }, [])

  return (
    <>
      <AdminHeader />
      <main className="flex-1 bg-slate-200 p-8 dark:bg-slate-800">
        <Card className="mx-auto max-w-5xl bg-white p-12 dark:bg-slate-900">
          <AdminForm />
          <Separator className="my-9" />
          <div className="flex flex-wrap justify-center gap-8">
            <AdminTile
              title="ONBOARDING"
              description="Add new organization"
              href="/onboarding"
              message="Opening onboarding flow..."
              status={onboardingStatus}
            />
            <AdminTile
              title="ADD NEW SUPERADMIN"
              description="Create super admin account"
              href="/superadmin-manager"
              message="Opening add new super admin page..."
              status={superadminStatus}
            />
          </div>
        </Card>
      </main>
    </>
  )
}