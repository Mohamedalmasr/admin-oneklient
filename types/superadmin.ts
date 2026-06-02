export type SuperAdmin = {
  id: string
  title: string
  first: string
  middle: string
  last: string
  sin: string
  address: {
    city: string
    province: string
  }
  phones: { number: string }[]
  emails: { email: string }[]
  groups: { name: string; role: string }[]
}
