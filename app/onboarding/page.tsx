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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format, parseISO } from "date-fns"
import { X, ArrowLeft, HelpCircle, Plus, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminHeader } from "@/components/admin-header"
import { useOnboardingForm } from "@/hooks/use-onboarding-form"
import type { OnboardingFormData, Contact } from "@/types/onboarding"

export default function OnboardingPage() {
  const {
    locked,
    contacts,
    formData,
    handleInputChange,
    addContact,
    removeContact,
    updateContact,
    handleSubmit,
    handleCancel,
  } = useOnboardingForm()

  return (
    <TooltipProvider>
      <AdminHeader />
      <main className="flex-1 bg-slate-100 p-6 dark:bg-slate-950 min-h-screen">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Page Header Card */}
          <Card className="border-0 shadow-sm">
            <CardContent className="flex items-center justify-between py-4 px-6">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight text-foreground uppercase">
                  Onboarding a New Organization
                </h1>
                <Badge variant="secondary" className="text-base font-bold px-3 py-1">
                  001
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Main Form */}
          <fieldset disabled={locked} className={locked ? "opacity-50 pointer-events-none" : ""}>

            {/* Organization Info */}
            <Card className="shadow-sm mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base uppercase tracking-wide">
                  Organization Info
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-sky-300 bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                        onClick={() => alert("Code: 1000010")}
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Code: 1000010</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-sm">
                  <Label htmlFor="clientCard" className="mb-1.5 block">
                    Client Card Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="clientCard"
                    placeholder="Client card number"
                    value={formData.clientCard}
                    onChange={(e) => handleInputChange("clientCard", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Organization Details */}
            <Card className="shadow-sm mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base uppercase tracking-wide">Organization Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Row 1: Name + Trade Name */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="orgName">
                      Organization Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="orgName"
                      placeholder="Enter organization name"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange("organizationName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="tradeName">Trade Name</Label>
                    <Input
                      id="tradeName"
                      placeholder="Enter trade name"
                      value={formData.tradeName}
                      onChange={(e) => handleInputChange("tradeName", e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Row 2: Legal Structure / Status / Sector */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label>
                      Legal Structure <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.legalStructure}
                      onValueChange={(v) => handleInputChange("legalStructure", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select structure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>
                      Legal Status <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.organizationLegalStatus}
                      onValueChange={(v) => handleInputChange("organizationLegalStatus", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="dissolved">Dissolved</SelectItem>
                        <SelectItem value="ammalgamated">Amalgamated</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>
                      Sector <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(v) => handleInputChange("sector", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agriculture">Agriculture, Forestry & Hunting</SelectItem>
                        <SelectItem value="mining">Mining, Quarrying & Oil</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Row 3: Org Type / Country / Prov / Legal Doc */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 sm:col-span-5 space-y-1.5">
                    <Label>
                      Organization Type <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.organizationType}
                      onValueChange={(v) => handleInputChange("organizationType", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="non-profit">Non-Profit Organization</SelectItem>
                        <SelectItem value="for-profit">For-Profit Company</SelectItem>
                        <SelectItem value="government">Government Entity</SelectItem>
                        <SelectItem value="educational">Educational Institution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-6 sm:col-span-2 space-y-1.5">
                    <Label>
                      Country <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(v) => handleInputChange("country", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-6 sm:col-span-2 space-y-1.5">
                    <Label>
                      Prov <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.prov}
                      onValueChange={(v) => handleInputChange("prov", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Prov" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ON">Ontario</SelectItem>
                        <SelectItem value="QC">Quebec</SelectItem>
                        <SelectItem value="BC">British Columbia</SelectItem>
                        <SelectItem value="AB">Alberta</SelectItem>
                        <SelectItem value="NS">Nova Scotia</SelectItem>
                        <SelectItem value="MB">Manitoba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-12 sm:col-span-3 space-y-1.5">
                    <Label htmlFor="legalDoc">Legal Doc #</Label>
                    <Input
                      id="legalDoc"
                      placeholder="Legal Doc #"
                      value={formData.legalDoc}
                      onChange={(e) => handleInputChange("legalDoc", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dates & Numbers */}
            <Card className="shadow-sm mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base uppercase tracking-wide">Dates & Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 sm:col-span-3 space-y-1.5">
                    <Label>Date Established</Label>
                    <DatePicker
                      value={formData.dateEstablished}
                      onChange={(v) => handleInputChange("dateEstablished", v)}
                    />
                  </div>

                  {/* Fiscal Year End */}
                  <div className="col-span-6 sm:col-span-2 space-y-1.5">
                    <Label>Fiscal Month</Label>
                    <Select
                      value={formData.fiscalMonth}
                      onValueChange={(v) => handleInputChange("fiscalMonth", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
                          <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-6 sm:col-span-1 space-y-1.5">
                    <Label>Day</Label>
                    <Select
                      value={formData.fiscalDay}
                      onValueChange={(v) => handleInputChange("fiscalDay", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>{i + 1}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-12 sm:col-span-3 space-y-1.5">
                    <Label>Date Dissolved</Label>
                    <DatePicker
                      value={formData.dateDissolved}
                      onChange={(v) => handleInputChange("dateDissolved", v)}
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-3 space-y-1.5">
                    <Label htmlFor="businessNumber">Business Number</Label>
                    <Input
                      id="businessNumber"
                      placeholder="Business Number"
                      value={formData.businessNumber}
                      onChange={(e) => handleInputChange("businessNumber", e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Row 2: HST/GST + Payroll */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="hstGst">HST / GST</Label>
                    <Input
                      id="hstGst"
                      placeholder="HST/GST number"
                      value={formData.hstGst}
                      onChange={(e) => handleInputChange("hstGst", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="payroll">Payroll</Label>
                    <Input
                      id="payroll"
                      placeholder="Payroll number"
                      value={formData.payroll}
                      onChange={(e) => handleInputChange("payroll", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Address */}
            <Card className="shadow-sm mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base uppercase tracking-wide">Legal Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6 sm:col-span-2 space-y-1.5">
                    <Label htmlFor="unitApt">Unit / Apt</Label>
                    <Input
                      id="unitApt"
                      placeholder="Unit"
                      value={formData.unitApt}
                      onChange={(e) => handleInputChange("unitApt", e.target.value)}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2 space-y-1.5">
                    <Label htmlFor="streetNumber">Street #</Label>
                    <Input
                      id="streetNumber"
                      placeholder="Street #"
                      value={formData.streetNumber}
                      onChange={(e) => handleInputChange("streetNumber", e.target.value)}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2 space-y-1.5">
                    <Label htmlFor="direction">Direction</Label>
                    <Input
                      id="direction"
                      placeholder="N / S / E / W"
                      value={formData.direction}
                      onChange={(e) => handleInputChange("direction", e.target.value)}
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-3 space-y-1.5">
                    <Label htmlFor="streetName">Street Name</Label>
                    <Input
                      id="streetName"
                      placeholder="Street name"
                      value={formData.streetName}
                      onChange={(e) => handleInputChange("streetName", e.target.value)}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2 space-y-1.5">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-1 space-y-1.5">
                    <Label htmlFor="province">Prov</Label>
                    <Input
                      id="province"
                      placeholder="Prov"
                      value={formData.province}
                      onChange={(e) => handleInputChange("province", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-sm mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base uppercase tracking-wide">
                    Contact Information <span className="text-destructive">*</span>
                  </CardTitle>
                  <Button
                    type="button"
                    size="sm"
                    onClick={addContact}
                    className="gap-1.5 rounded-full h-8 px-3"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contacts.map((contact, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Select
                        value={contact.label}
                        onValueChange={(v) => updateContact(index, "label", v)}
                      >
                        <SelectTrigger className="w-[130px] shrink-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Home...">Home</SelectItem>
                          <SelectItem value="Work...">Work</SelectItem>
                          <SelectItem value="Other...">Other</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={contact.method}
                        onValueChange={(v) => updateContact(index, "method", v)}
                      >
                        <SelectTrigger className="w-[120px] shrink-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Phone">Phone</SelectItem>
                          <SelectItem value="Cell">Cell</SelectItem>
                          <SelectItem value="Mobile">Mobile</SelectItem>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Url">URL</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        className="flex-1"
                        placeholder="Enter contact value"
                        value={contact.value}
                        onChange={(e) => updateContact(index, "value", e.target.value)}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeContact(index)}
                        className="h-9 w-9 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="shadow-sm">
              <CardContent className="py-5">
                <div className="flex flex-wrap justify-center gap-3">
                  <Button onClick={handleSubmit} className="min-w-[140px]">
                    Save & Submit
                  </Button>
                  <Button variant="outline" onClick={handleSubmit} className="min-w-[140px]">
                    Save & Exit
                  </Button>
                  <Button variant="ghost" onClick={handleCancel} className="min-w-[140px] text-muted-foreground">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

          </fieldset>
        </div>
      </main>
    </TooltipProvider>
  )
}

// ─── Reusable shadcn DatePicker ───────────────────────────────────────────────
type DatePickerProps = {
  value: string          // stored as "yyyy-MM-dd" ISO string
  onChange: (v: string) => void
  placeholder?: string
}

function DatePicker({ value, onChange, placeholder = "Pick a date" }: DatePickerProps) {
  const selected = value ? parseISO(value) : undefined

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          {selected ? format(selected, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(day) => onChange(day ? format(day, "yyyy-MM-dd") : "")}
        />
      </PopoverContent>
    </Popover>
  )
}