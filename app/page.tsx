import { AdminHeader } from "@/components/admin-header"
import { AdminTile } from "@/components/admin-tile"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <>
      <AdminHeader />
      <main className="flex-1 bg-slate-200 p-8 dark:bg-slate-800">
        <Card className="mx-auto max-w-5xl bg-white p-12 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AdminTile
              title="ONBOARDING"
              description="Add new organization"
              href="/onboarding"
              message="Opening onboarding flow..."
            />
            <AdminTile
              title="ADD NEW SUPERADMIN"
              description="Create super admin account"
              href="/superadmin-manager"
              message="Opening add new super admin page..."
            />
          </div>
        </Card>
      </main>
    </>
  )
}