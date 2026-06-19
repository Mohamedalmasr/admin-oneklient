"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminTile } from "@/components/admin-tile"
import { Card } from "@/components/ui/card"
import type { OrganizationData } from "@/types/onboarding"

type Status = "red" | "yellow" | "green"

function getInitialStatuses(): { onboardingStatus: Status; superadminStatus: Status } {
  const raw = typeof window !== "undefined" ? sessionStorage.getItem("onboardingOrganizations") : null
  if (!raw) return { onboardingStatus: "red", superadminStatus: "red" }

  let orgs: OrganizationData[]
  try {
    orgs = JSON.parse(raw)
    if (!Array.isArray(orgs)) orgs = []
  } catch {
    orgs = []
  }

  if (orgs.length === 0) return { onboardingStatus: "red", superadminStatus: "red" }

  const completed = sessionStorage.getItem("onboardingCompleted") === "true"
  const onboardingStatus: Status = completed ? "green" : "yellow"

  const hasSuperAdmins = orgs.some(
    (org) => Array.isArray(org.superAdmins) && org.superAdmins.length > 0
  )
  const superadminStatus: Status = hasSuperAdmins ? "green" : "yellow"

  return { onboardingStatus, superadminStatus }
}

export default function Home() {
  const [{ onboardingStatus, superadminStatus }] = useState(getInitialStatuses)

  return (
    <>
      <AdminHeader />
      <main className="flex-1 bg-slate-200 p-8 dark:bg-slate-800">
        <Card className="mx-auto max-w-5xl bg-white p-12 dark:bg-slate-900">
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