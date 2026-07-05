"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format, parseISO } from "date-fns";
import { X, ArrowLeft, HelpCircle, Plus, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminHeader } from "@/components/admin-header";
import { useOnboardingForm } from "@/hooks/use-onboarding-form";

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
  } = useOnboardingForm();

  return (
    <TooltipProvider>
      <AdminHeader />
      <main className="flex-1 bg-slate-100 p-6 dark:bg-slate-950 min-h-screen">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="flex items-center justify-between px-1">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Onboarding a New Organization
                </h1>
                <Badge
                  variant="secondary"
                  className="text-base font-bold px-3 py-1"
                >
                  001
                </Badge>
              </div>
            </CardHeader>
            <CardHeader className="pb-3">
              <CardTitle className="text-base uppercase tracking-wide inline-flex items-center">
                Organization Info{" "}
                
                <button
                  type="button"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-sky-300 bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors ml-2"
                  onClick={() => toast.info("Code: 1000010", { duration: 5000, position: "bottom-right", closeButton: true })}
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="max-w-lg space-y-1.5">
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

            <Separator className="mx-6" />

            <CardHeader className="pb-3">
              <CardTitle className="text-base uppercase tracking-wide inline-flex items-center gap-1">
                Organization Details 
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="orgName">
                    Organization Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="orgName"
                    placeholder="Enter organization name"
                    value={formData.organizationName}
                    onChange={(e) =>
                      handleInputChange("organizationName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tradeName">Trade Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="tradeName"
                    placeholder="Enter trade name"
                    value={formData.tradeName}
                    onChange={(e) =>
                      handleInputChange("tradeName", e.target.value)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="space-y-1">
                  <Label className="text-base">
                    Legal Structure <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.legalStructure}
                    onValueChange={(v) =>
                      handleInputChange("legalStructure", v)
                    }
                  >
                    <SelectTrigger className="text-base py-2 h-auto w-full">
                      <SelectValue placeholder="Select structure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="sole-proprietorship">
                        Sole Proprietorship
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-base">
                    Legal Status <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.organizationLegalStatus}
                    onValueChange={(v) =>
                      handleInputChange("organizationLegalStatus", v)
                    }
                  >
                    <SelectTrigger className="text-base py-2 h-auto w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="dissolved">Dissolved</SelectItem>
                      <SelectItem value="ammalgamated">
                        Amalgamated
                      </SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-base">
                    Sector <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(v) => handleInputChange("sector", v)}
                  >
                    <SelectTrigger className="text-base py-2 h-auto w-full">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agriculture">
                        Agriculture, Forestry & Hunting
                      </SelectItem>
                      <SelectItem value="mining">
                        Mining, Quarrying & Oil
                      </SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:gap-3 sm:grid-cols-12">
                <div className="col-span-12 sm:col-span-5 space-y-1">
                  <Label className="text-base">
                    Organization Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.organizationType}
                    onValueChange={(v) =>
                      handleInputChange("organizationType", v)
                    }
                  >
                    <SelectTrigger className="text-base py-2 h-auto w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="non-profit">
                        Non-Profit Organization
                      </SelectItem>
                      <SelectItem value="for-profit">
                        For-Profit Company
                      </SelectItem>
                      <SelectItem value="government">
                        Government Entity
                      </SelectItem>
                      <SelectItem value="educational">
                        Educational Institution
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-6 sm:col-span-2 space-y-1">
                  <Label className="text-base">
                    Country <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(v) => handleInputChange("country", v)}
                  >
                    <SelectTrigger className="text-base py-2 h-auto w-full">
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
                <div className="col-span-6 sm:col-span-2 space-y-1">
                  <Label className="text-base">
                    Prov <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.prov}
                    onValueChange={(v) => handleInputChange("prov", v)}
                  >
                    <SelectTrigger className="text-base py-2 h-auto w-full">
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
                    onChange={(e) =>
                      handleInputChange("legalDoc", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>

            <Separator className="mx-6" />

            <CardHeader className="pb-3">
              <CardTitle className="text-base uppercase tracking-wide">
                Dates & Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-3 space-y-1.5">
                  <Label>Date Established <span className="text-destructive">*</span></Label>
                  <DatePicker
                    value={formData.dateEstablished}
                    onChange={(v) => handleInputChange("dateEstablished", v)}
                  />
                </div>

                <div className="col-span-12 sm:col-span-3 space-y-1">
                  <Label className="text-base text-center w-full block">Fiscal Year End</Label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Select
                        value={formData.fiscalMonth}
                        onValueChange={(v) => handleInputChange("fiscalMonth", v)}
                      >
                        <SelectTrigger className="text-base py-2 h-auto w-full">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ].map((m, i) => (
                            <SelectItem
                              key={i + 1}
                              value={String(i + 1).padStart(2, "0")}
                            >
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Select
                        value={formData.fiscalDay}
                        onValueChange={(v) => handleInputChange("fiscalDay", v)}
                      >
                        <SelectTrigger className="text-base py-2 h-auto w-full">
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 31 }, (_, i) => (
                            <SelectItem
                              key={i + 1}
                              value={String(i + 1).padStart(2, "0")}
                            >
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-3 space-y-1.5">
                  <Label>Date Dissolved <span className="text-destructive">*</span></Label>
                  <DatePicker
                    value={formData.dateDissolved}
                    onChange={(v) => handleInputChange("dateDissolved", v)}
                  />
                </div>
                <div className="col-span-12 sm:col-span-3 space-y-1.5">
                  <Label htmlFor="businessNumber">Business Number <span className="text-destructive">*</span></Label>
                  <Input
                    id="businessNumber"
                    placeholder="Business Number"
                    value={formData.businessNumber}
                    onChange={(e) =>
                      handleInputChange("businessNumber", e.target.value)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="hstGst">HST / GST <span className="text-destructive">*</span></Label>
                  <Input
                    id="hstGst"
                    placeholder="HST/GST number"
                    value={formData.hstGst}
                    onChange={(e) =>
                      handleInputChange("hstGst", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="payroll">Payroll <span className="text-destructive">*</span></Label>
                  <Input
                    id="payroll"
                    placeholder="Payroll number"
                    value={formData.payroll}
                    onChange={(e) =>
                      handleInputChange("payroll", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>

            <Separator className="mx-6" />

            <CardHeader className="pb-3">
              <CardTitle className="text-base uppercase tracking-wide inline-flex items-center gap-3">
                Legal Address
                <Select
                  value={formData.legalAddressCountry}
                  onValueChange={(v) => handleInputChange("legalAddressCountry", v)}
                >
                  <SelectTrigger className="text-xs py-1 h-auto w-auto min-w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="usa">USA</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 sm:col-span-2 space-y-1.5">
                  <Label htmlFor="unitApt">Unit / Apt <span className="text-destructive">*</span></Label>
                  <Input
                    id="unitApt"
                    placeholder="Unit"
                    value={formData.unitApt}
                    onChange={(e) =>
                      handleInputChange("unitApt", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-2 space-y-1.5">
                  <Label htmlFor="streetNumber">Street # <span className="text-destructive">*</span></Label>
                  <Input
                    id="streetNumber"
                    placeholder="Street #"
                    value={formData.streetNumber}
                    onChange={(e) =>
                      handleInputChange("streetNumber", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-2 space-y-1.5">
                  <Label htmlFor="direction">Direction <span className="text-destructive">*</span></Label>
                  <Select
                    value={formData.direction}
                    onValueChange={(v) => handleInputChange("direction", v)}
                  >
                    <SelectTrigger className="text-base py-2 h-auto w-full">
                      <SelectValue placeholder="N / S / E / W" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="N">N</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="W">W</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-12 sm:col-span-3 space-y-1.5">
                  <Label htmlFor="streetName">Street Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="streetName"
                    placeholder="Street name"
                    value={formData.streetName}
                    onChange={(e) =>
                      handleInputChange("streetName", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-2 space-y-1.5">
                  <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      handleInputChange("city", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-1 space-y-1.5">
                  <Label htmlFor="province">Prov <span className="text-destructive">*</span></Label>
                  <Input
                    id="province"
                    placeholder="Prov"
                    value={formData.province}
                    onChange={(e) =>
                      handleInputChange("province", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>

            <Separator className="mx-6" />

            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base uppercase tracking-wide">
                  Contact Information{" "}
                  
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
                <div className="flex items-center gap-3">
                  <span className="w-[130px] shrink-0 text-sm font-medium">Label <span className="text-destructive">*</span></span>
                  <span className="w-[120px] shrink-0 text-sm font-medium">Method <span className="text-destructive">*</span></span>
                  <span className="flex-1 text-sm font-medium">Value <span className="text-destructive">*</span></span>
                  <span className="w-9 shrink-0" />
                </div>
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Select
                      value={contact.label}
                      onValueChange={(v) => updateContact(index, "label", v)}
                    >
                      <SelectTrigger className="w-[130px] shrink-0 text-base py-2 h-auto">
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
                      <SelectTrigger className="w-[120px] shrink-0 text-base py-2 h-auto">
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

                    <div className="flex-1">
                      <Input
                        placeholder="Enter contact value"
                        value={contact.value}
                        onChange={(e) =>
                          updateContact(index, "value", e.target.value)
                        }
                      />
                    </div>

                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeContact(index)}
                        className="h-9 w-9 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <Separator className="mx-6" />
            <CardContent className="py-5">
              <div className="flex flex-wrap justify-center gap-3">
                <Button onClick={handleSubmit} className="min-w-[140px]">
                  Save & Submit
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSubmit}
                  className="min-w-[140px]"
                >
                  Save & Exit
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="min-w-[140px] text-muted-foreground"
                    >
                      Cancel
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Onboarding?</DialogTitle>
                      <DialogDescription>
                        You will lose all unsaved changes. Are you sure you want to cancel?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" className="min-w-[100px]">
                          Back
                        </Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={handleCancel}
                        className="min-w-[100px]"
                      >
                        Yes, Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </TooltipProvider>
  );
}

type DatePickerProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const selected = value ? parseISO(value) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
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
  );
}