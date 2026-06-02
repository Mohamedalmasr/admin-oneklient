import { SuperAdmin } from "./superadmin"

export type Contact = {
  label: string
  method: string
  value: string
}

export type OrganizationData = {
  id: string
  clientCardNumber: string
  organizationName: string
  tradeName: string
  legalStructure: string
  organizationLegalStatus: string
  sector: string
  organizationType: string
  country: string
  prov: string
  legalDoc: string
  dateEstablished: string
  fiscalYearEnd: {
    month: string
    day: string
  }
  dateDissolved: string
  businessNumber: string
  hstGst: string
  payroll: string
  legalAddress: {
    unitApt: string
    streetNumber: string
    direction: string
    streetName: string
    city: string
    province: string
  }
  contacts: Contact[]
  superAdmins: SuperAdmin[]
  createdAt: string
}

export type OnboardingFormData = {
  clientCard: string
  organizationName: string
  tradeName: string
  legalStructure: string
  organizationLegalStatus: string
  sector: string
  organizationType: string
  country: string
  prov: string
  legalDoc: string
  dateEstablished: string
  fiscalMonth: string
  fiscalDay: string
  dateDissolved: string
  businessNumber: string
  hstGst: string
  payroll: string
  unitApt: string
  streetNumber: string
  direction: string
  streetName: string
  city: string
  province: string
}