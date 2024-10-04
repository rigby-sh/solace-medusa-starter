import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { getProductsListByCollectionId } from '@lib/data/products'
import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import ImageGallery from '@modules/products/components/image-gallery'
import ProductActions from '@modules/products/components/product-actions'
import ProductTabs from '@modules/products/components/product-tabs'
import ProductInfo from '@modules/products/templates/product-info'

import { ProductCarousel } from '../components/product-carousel'
import ProductBreadcrumbs from './breadcrumbs'
import ProductActionsWrapper from './product-actions-wrapper'

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = async ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const { response: productsList } = await getProductsListByCollectionId({
    collectionId: product.collection_id,
    countryCode,
    excludeProductId: product.id,
  })

  return (
    <>
      <Container
        className="relative flex flex-col gap-y-6 !py-8 small:gap-y-12"
        data-testid="product-container"
      >
        <ProductBreadcrumbs product={product} countryCode={countryCode} />
        <Box className="relative flex flex-col gap-y-6 small:items-start large:flex-row large:gap-x-16 xl:gap-x-[120px]">
          <div className="relative block w-full">
            <ImageGallery images={product?.images || []} />
          </div>
          <div className="flex w-full flex-col gap-y-6 py-8 small:sticky small:top-24 small:max-w-[440px] small:py-0">
            <ProductInfo product={product} />
            <ProductTabs product={product} />
            <div className="flex w-full flex-col gap-y-12 py-8 small:sticky small:top-24 small:max-w-[300px] small:py-0">
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>
          </div>
        </Box>
      </Container>
      {productsList.products.length > 0 && (
        <ProductCarousel
          products={productsList.products}
          title="Complete the look"
        />
      )}
    </>
  )
}

export default ProductTemplate
