export interface StrapiPhotoArray {
  data: StrapiPhotoAttributes[]
}

export interface StrapiPhotoAttributes {
  id: number
  name: string
  size: number
  width: number
  height: number
  url: string
  alternativeText: string
}

export interface StrapiData<T> {
  data: T
}

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

export type Collection = {
  id: number
  documentId: string
  Title: string
  Handle: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  Image: StrapiPhotoAttributes
  locale: string
  Description: string
}

export type CollectionsData = {
  data: Collection[]
}
