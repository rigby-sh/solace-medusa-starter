export type HeroBanner = {
  Headline: string
  Text: string
  CTA: {
    id: number
    BtnText: string
    BtnLink: string
  }
  Image: {
    url: string
    alternativeText?: string
  }
}

export type HeroBannerData = {
  data: {
    HeroBanner: HeroBanner
  }
}

export type BlogPost = {
  Title: string
  Slug: string
  Content: string
  FeaturedImage: {
    url: string
    alternativeText?: string
  }
}

export type BlogData = {
  data: BlogPost[]
}
