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

export type BannerResponse<T extends string> = {
  data: {
    [K in T]: HeroBanner
  }
}

export type HeroBannerData = BannerResponse<'HeroBanner'>
export type MidBannerData = BannerResponse<'MidBanner'>

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
