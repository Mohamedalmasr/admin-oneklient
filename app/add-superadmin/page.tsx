"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AdminHeader } from "@/components/admin-header"
import { useAddSuperadmin } from "@/hooks/use-add-superadmin"
import { ArrowLeft, Eye, EyeOff, Plus, X } from "lucide-react"

export default function AddSuperAdminPage() {
  const {
    isEdit,
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
  } = useAddSuperadmin()

  return (
    <>
      <AdminHeader />
      <main className="flex-1 bg-[#efefef] p-6 dark:bg-slate-950 min-h-screen">
        <div className="mx-auto max-w-5xl">
          <Link href="/superadmin-manager">
            <Button variant="outline" size="sm" className="mb-4 gap-2 font-extrabold">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>

          <Card className="border shadow-sm">
            <CardHeader className="border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-extrabold text-primary">
                  {isEdit ? "Edit SuperAdmin" : "Add New SuperAdmin"}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="px-6 py-6 space-y-8">
              {/* Organization */}
              <fieldset className="border rounded-xl p-5 bg-gradient-to-b from-white to-[#fbfcff]">
                <legend className="px-2 text-sm font-extrabold text-primary">SuperAdmin</legend>

                <div className="space-y-1.5 mb-5">
                  <Label className="text-muted-foreground text-sm font-bold">Organization</Label>
                  <Input
                    value={organization?.organizationName || ""}
                    readOnly
                    tabIndex={-1}
                    className="bg-muted/50"
                  />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Title <span className="text-destructive">*</span></Label>
                    <Select value={title} onValueChange={setTitle}>
                      <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Ms">Ms</SelectItem>
                        <SelectItem value="Dr">Dr</SelectItem>
                        <SelectItem value="Prof">Prof</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">First Name <span className="text-destructive">*</span></Label>
                    <Input placeholder="First name" value={first} onChange={(e) => setFirst(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Middle Name</Label>
                    <Input placeholder="Middle name" value={middle} onChange={(e) => setMiddle(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Last Name <span className="text-destructive">*</span></Label>
                    <Input placeholder="Last name" value={last} onChange={(e) => setLast(e.target.value)} />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Date of Birth</Label>
                    <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">SIN</Label>
                    <Input
                      placeholder="123456789"
                      value={sin}
                      onChange={(e) => setSin(e.target.value)}
                      maxLength={12}
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Phones */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-dashed pb-2">
                    <h3 className="text-sm font-extrabold text-primary">Phone</h3>
                    <Button type="button" size="sm" variant="outline" onClick={addPhone} className="gap-1 h-7">
                      <Plus className="h-3.5 w-3.5" /> Add
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {phones.map((phone, idx) => (
                      <div key={idx} className="grid grid-cols-[11ch_1fr_9ch_32px] gap-3 items-end p-3 border rounded-xl bg-white">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-bold">Type</Label>
                          <Select value={phone.type} onValueChange={(v) => updatePhone(idx, "type", v)}>
                            <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Phone">Phone</SelectItem>
                              <SelectItem value="Fax">Fax</SelectItem>
                              <SelectItem value="Mobile">Mobile</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-bold">Phone Number</Label>
                          <Input
                            placeholder="(506) 452-1342"
                            value={phone.number}
                            onChange={(e) => updatePhone(idx, "number", e.target.value)}
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-bold">Ext</Label>
                          <Input
                            placeholder="Ext"
                            value={phone.ext}
                            onChange={(e) => updatePhone(idx, "ext", e.target.value)}
                            maxLength={7}
                            className="h-9"
                          />
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removePhone(idx)} className="size-9 text-destructive hover:bg-destructive/10">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Emails */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-dashed pb-2">
                    <h3 className="text-sm font-extrabold text-primary">Email</h3>
                    <Button type="button" size="sm" variant="outline" onClick={addEmail} className="gap-1 h-7">
                      <Plus className="h-3.5 w-3.5" /> Add
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {emails.map((email, idx) => (
                      <div key={idx} className="grid grid-cols-[12ch_1fr_32px] gap-3 items-end p-3 border rounded-xl bg-white">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-bold">Type</Label>
                          <Select value={email.type} onValueChange={(v) => updateEmail(idx, "type", v)}>
                            <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Office">Office</SelectItem>
                              <SelectItem value="Home">Home</SelectItem>
                              <SelectItem value="School">School</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground font-bold">Email</Label>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            value={email.email}
                            onChange={(e) => updateEmail(idx, "email", e.target.value)}
                            className="h-9"
                          />
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeEmail(idx)} className="size-9 text-destructive hover:bg-destructive/10">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* URLs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-dashed pb-2">
                    <h3 className="text-sm font-extrabold text-primary">URL</h3>
                    <Button type="button" size="sm" variant="outline" onClick={addUrl} className="gap-1 h-7">
                      <Plus className="h-3.5 w-3.5" /> Add
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {urls.map((url, idx) => (
                      <div key={idx} className="grid grid-cols-1fr-auto gap-3 items-end p-3 border rounded-xl bg-white">
                        <div className="flex gap-3 items-end">
                          <div className="flex-1 space-y-1">
                            <Label className="text-xs text-muted-foreground font-bold">URL</Label>
                            <Input
                              type="url"
                              placeholder="https://example.com"
                              value={url}
                              onChange={(e) => updateUrl(idx, e.target.value)}
                              className="h-9"
                            />
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeUrl(idx)} className="size-9 shrink-0 text-destructive hover:bg-destructive/10">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* Address */}
              <fieldset className="border rounded-xl p-5 bg-gradient-to-b from-white to-[#fbfcff]">
                <legend className="px-2 text-sm font-extrabold text-primary">Address</legend>

                <div className="grid grid-cols-[12ch_9ch_1fr_9ch] gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Street Number</Label>
                    <Input placeholder="123" value={streetNo} onChange={(e) => setStreetNo(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Unit/Apt</Label>
                    <Input placeholder="5B" value={unit} onChange={(e) => setUnit(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Street Name</Label>
                    <Input placeholder="Main St" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Direction</Label>
                    <Select value={dir} onValueChange={setDir}>
                      <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">—</SelectItem>
                        <SelectItem value="N">N</SelectItem>
                        <SelectItem value="NE">NE</SelectItem>
                        <SelectItem value="E">E</SelectItem>
                        <SelectItem value="SE">SE</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="SW">SW</SelectItem>
                        <SelectItem value="W">W</SelectItem>
                        <SelectItem value="NW">NW</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5 mt-4">
                  <Label className="text-muted-foreground text-sm font-bold">City</Label>
                  <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Province/State</Label>
                    <Input placeholder="Province" value={province} onChange={(e) => setProvince(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Postal Code</Label>
                    <Input placeholder="A1A 1A1" value={postal} onChange={(e) => setPostal(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-sm font-bold">Country</Label>
                    <Input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                  </div>
                </div>
              </fieldset>

              {/* Password */}
              <fieldset className="border rounded-xl p-5 bg-gradient-to-b from-white to-[#fbfcff]">
                <legend className="px-2 text-sm font-extrabold text-primary">Password</legend>
                <div className="space-y-1.5 max-w-md">
                  <Label className="text-muted-foreground text-sm font-bold">Password <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Input
                      type={showPw ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </fieldset>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleCancel} className="min-w-[120px] font-extrabold">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="min-w-[120px] font-extrabold">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
