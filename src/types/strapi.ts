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
