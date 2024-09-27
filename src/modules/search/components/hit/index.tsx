import { HttpTypes } from '@medusajs/types'
import { Container, Text } from '@medusajs/ui'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import Thumbnail from '@modules/products/components/thumbnail'

export type ProductHit = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: HttpTypes.StoreProductVariant[]
  collection_handle: string | null
  collection_id: string | null
}

type HitProps = {
  hit: ProductHit
}

const Hit = ({ hit }: HitProps) => {
  return (
    <LocalizedClientLink
      href={`/products/${hit.handle}`}
      data-testid="search-result"
    >
      <Container
        key={hit.id}
        className="sm:flex-col sm:justify-center flex w-full items-center gap-2 p-4 shadow-elevation-card-rest hover:shadow-elevation-card-hover"
      >
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="square"
          className="sm:h-full sm:w-full group h-12 w-12"
        />
        <div className="group flex flex-col justify-between">
          <div className="flex flex-col">
            <Text
              className="text-ui-fg-subtle"
              data-testid="search-result-title"
            >
              {hit.title}
            </Text>
          </div>
        </div>
      </Container>
    </LocalizedClientLink>
  )
}

export default Hit
