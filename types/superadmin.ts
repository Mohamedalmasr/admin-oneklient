export type PhoneEntry = {
  type: string
  number: string
  ext: string
}

export type EmailEntry = {
  type: string
  email: string
}

export type SuperAdminAddress = {
  streetNo: string
  unit: string
  streetName: string
  dir: string
  city: string
  province: string
  postal: string
  country: string
}

export type GroupEntry = {
  name: string
  role: string
}

export type SuperAdmin = {
  id: string
  title: string
  first: string
  middle: string
  last: string
  sin: string
  dob: string
  role: string
  organizationId: string
  phones: PhoneEntry[]
  emails: EmailEntry[]
  urls: string[]
  address: SuperAdminAddress
  groups: GroupEntry[]
  password: string
  updatedAt: string
}
