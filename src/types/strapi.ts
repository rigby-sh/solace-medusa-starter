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
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
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

export type VariantColor = {
  id: number
  Name: string
  Type: {
    Color?: string
    Image?: {
      url: string
      alternativeText?: string
    }
  }[]
}

export type VariantColorData = {
  data: VariantColor[]
}

export type ContentAttributes = {
  id: number
  Title: string
  Text: string
  Image: StrapiPhotoAttributes
}

export type WhyUsAttributes = {
  id: number
  Title: string
  Tile: ContentAttributes[]
}

export type AboutUs = {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  Banner: StrapiPhotoAttributes[]
  OurStory: ContentAttributes
  WhyUs: WhyUsAttributes
  OurCraftsmanship: ContentAttributes
  Numbers: Omit<ContentAttributes, 'Image'>[]
}

export type AboutUsData = {
  data: AboutUs
}

export type Question = {
  id: number
  Title: string
  Text: string
}

export type FAQSection = {
  id: number
  Title: string
  Question: Question[]
  Bookmark: string
}

export type FAQ = {
  FAQSection: FAQSection[]
}

export type FAQData = {
  data: FAQ
}

export type ContentPage = {
  id: number
  documentId: string
  PageContent: string
}

export type ContentPageData = {
  data: ContentPage
}
