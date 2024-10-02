import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Heading } from '@modules/common/components/heading'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <Box className="flex flex-col gap-y-4">
      <Box className="flex flex-col gap-y-1" id="product-info">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="w-max text-md text-secondary"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          as="h2"
          className="text-2xl text-basic-primary small:text-3xl"
          data-testid="product-title"
        >
          {product.title}
        </Heading>
      </Box>
    </Box>
  )
}

export default ProductInfo
