import { getRegion } from '@lib/data/regions'
import { HttpTypes } from '@medusajs/types'
import ProductTile from '@modules/products/components/product-tile'
import { PRODUCT_LIMIT } from '@modules/search/actions'
import { Pagination } from '@modules/store/components/pagination'

export default async function PaginatedProducts({
  products,
  total,
  page,
  countryCode,
}: {
  products: HttpTypes.StoreProduct[]
  total: number
  page: number
  countryCode: string
}) {
  const totalPages = Math.ceil(total / PRODUCT_LIMIT)
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <ul
        className="grid w-full grid-cols-1 gap-x-2 gap-y-6 small:grid-cols-2 large:grid-cols-3"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductTile product={p} regionId={region.id} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
