export interface Candidate {
  id: string
  name: string
  party: string
  position: string
  biography?: string
  imageUrl?: string
  website?: string
  socialMedia?: {
    twitter?: string
    facebook?: string
    instagram?: string
  }
}

export interface ElectionDate {
  id: string
  title: string
  date: Date
  description: string
  type: 'primary' | 'general' | 'runoff' | 'registration-deadline'
}

export interface VotingLocation {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  hours: string
  accessibility: boolean
}

export interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  author: string
  publishedDate: Date
  imageUrl?: string
  tags: string[]
}