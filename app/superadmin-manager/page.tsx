"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AdminHeader } from "@/components/admin-header"
import { useSuperAdminManager } from "@/hooks/use-superadmin-manager"
import { ArrowLeft, Pencil, X, Plus, Search, Trash2 } from "lucide-react"

function formatGroups(groups: { name: string; role: string }[] | undefined) {
  if (!groups || groups.length === 0) return "\u2014"
  return groups.map((g) => `${g.name} (${g.role})`).join(", ")
}

export default function SuperAdminManagerPage() {
  const {
    organizations,
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
  } = useSuperAdminManager()

  return (
    <>
      <AdminHeader />
      <main className="flex-1 bg-[#efefef] p-6 dark:bg-slate-950 min-h-screen">
        <div className="mx-auto max-w-[1400px]">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4 gap-2 font-extrabold">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr] items-start">
            <aside className="rounded-2xl border bg-card p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08),0_2px_8px_rgba(0,0,0,0.05)]">
              <h2 className="m-0 text-lg font-bold text-foreground">
                Organizations
              </h2>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                Choose an organization to manage its SuperAdmins
              </p>

              <div className="relative mt-4 mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search organization..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-9 h-11 rounded-xl font-semibold"
                />
              </div>

              <div className="flex flex-col gap-3.5 max-h-[70vh] overflow-y-auto pr-1">
                {filteredOrganizations.length === 0 ? (
                  <div className="py-10 px-5 border-2 border-dashed rounded-xl text-center text-sm font-semibold text-muted-foreground bg-[#fafcff]">
                    No organization found.
                  </div>
                ) : (
                  filteredOrganizations.map((org) => {
                    const isActive = org.id === (selectedOrganization?.id ?? null)
                    return (
                      <button
                        key={org.id}
                        type="button"
                        onClick={() => setSelected(org.id)}
                        className={[
                          "w-full text-left border-2 rounded-xl bg-card p-4 cursor-pointer",
                          "transition-all duration-200 hover:-translate-y-0.5",
                          isActive
                            ? "border-primary bg-[#eaf2ff] shadow-[0_10px_24px_rgba(11,61,145,0.12)]"
                            : "border-[rgba(15,23,42,0.14)] hover:border-primary hover:bg-[#f8fbff]",
                        ].join(" ")}
                      >
                        <div className="font-extrabold text-foreground">
                          {org.organizationName || "Unnamed Organization"}
                        </div>
                        <div className="mt-1.5 text-sm font-semibold text-muted-foreground">
                          {org.organizationType || "No type"} &bull; {org.superAdmins.length} SuperAdmins
                        </div>
                      </button>
                    )
                  })
                )}
              </div>
            </aside>

            <section className="rounded-2xl border bg-card p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08),0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="m-0 text-xl font-bold text-foreground">
                    {selectedOrganization
                      ? (selectedOrganization.organizationName || "Unnamed Organization")
                      : "Select an organization"}
                  </h1>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    {selectedOrganization
                      ? `${selectedOrganization.organizationType || "No type"} \u2022 Client Card: ${selectedOrganization.clientCardNumber || "No client card"} \u2022 Current SuperAdmins: ${selectedOrganization.superAdmins.length}`
                      : "Choose an organization from the left side"}
                  </p>
                </div>

                <Button
                  onClick={navigateToAdd}
                  disabled={!selectedOrganization}
                  className="gap-2 shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  Add New SuperAdmin
                </Button>
              </div>

              <div className="flex flex-col gap-4">
                {!selectedOrganization ? (
                  <div className="py-10 px-5 border-2 border-dashed rounded-xl text-center text-sm font-semibold text-muted-foreground bg-[#fafcff]">
                    Select an organization from the left side to view its SuperAdmins.
                  </div>
                ) : selectedOrganization.superAdmins.length === 0 ? (
                  <div className="py-10 px-5 border-2 border-dashed rounded-xl text-center text-sm font-semibold text-muted-foreground bg-[#fafcff]">
                    This organization has no SuperAdmins yet. Click &quot;Add New SuperAdmin&quot; to add the first one.
                  </div>
                ) : (
                  selectedOrganization.superAdmins.map((admin, index) => {
                    const phoneValue = admin.phones?.[0]?.number || "\u2014"
                    const emailValue = admin.emails?.[0]?.email || "\u2014"

                    return (
                      <div
                        key={admin.id}
                        className="rounded-xl border bg-card p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                      >
                        <div className="flex justify-between items-start gap-4 mb-5">
                          <div>
                            <h3 className="m-0 text-lg font-extrabold text-foreground">
                              {admin.title || ""} {admin.first || ""} {admin.middle || ""} {admin.last || ""}
                            </h3>
                            <Badge
                              variant="secondary"
                              className="mt-2 rounded-full text-xs font-extrabold"
                            >
                              SuperAdmin {index + 1}
                            </Badge>
                          </div>

                          <div className="flex gap-2.5">
                            <Button
                              variant="outline"
                              size="icon"
                              title="Edit"
                              aria-label="Edit"
                              onClick={() => navigateToEdit(selectedOrganization.id, admin.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              title="Delete"
                              aria-label="Delete"
                              className="border-[#e7eaf2] hover:bg-[#fff4fb] hover:border-[#ffb8e0]"
                              onClick={() =>
                                openDeleteModal(
                                  selectedOrganization.id,
                                  admin.id,
                                  `${admin.first || ""} ${admin.last || ""}`.trim() || "this SuperAdmin"
                                )
                              }
                            >
                              <X className="h-4 w-4 text-[#ff5ac8]" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                          <InfoBox label="Email" value={emailValue} />
                          <InfoBox label="Phone" value={phoneValue} />
                          <InfoBox label="SIN" value={admin.sin || "\u2014"} />
                          <InfoBox label="City" value={admin.address?.city || "\u2014"} />
                          <InfoBox label="Province" value={admin.address?.province || "\u2014"} />
                          <InfoBox label="Groups" value={formatGroups(admin.groups)} />
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Dialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) closeDeleteModal()
        }}
      >
        <DialogContent className="max-w-[470px] text-center sm:max-w-[470px]">
          <DialogHeader>
            <div className="mx-auto flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf2ff] text-primary border-2 border-[rgba(11,61,145,0.18)] text-2xl font-black">
                !
              </div>
            </div>
            <DialogTitle className="text-primary text-lg font-extrabold text-center">
              Delete SuperAdmin
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm font-semibold text-muted-foreground text-center px-2">
            Are you sure you want to delete {pendingDelete?.adminName || "this SuperAdmin"}?
          </DialogDescription>
          <DialogFooter className="justify-center gap-3 sm:justify-center">
            <DialogClose asChild>
              <Button variant="outline" className="min-w-[120px] font-extrabold">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="min-w-[120px] font-extrabold"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-[#fbfdff] p-3.5">
      <div className="text-xs font-bold text-muted-foreground mb-2">{label}</div>
      <div className="text-sm font-bold text-foreground break-words">{value}</div>
    </div>
  )
}
