import { getProductsListWithSort } from '@lib/data/products'
import { getRegion } from '@lib/data/regions'
import ProductTile from '@modules/products/components/product-tile'
import { Pagination } from '@modules/store/components/pagination'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'

const PRODUCT_LIMIT = 3

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams['collection_id'] = [collectionId]
  }

  if (categoryId) {
    queryParams['category_id'] = [categoryId]
  }

  if (productsIds) {
    queryParams['id'] = productsIds
  }

  if (sortBy === 'created_at') {
    queryParams['order'] = 'created_at'
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="grid w-full grid-cols-1 gap-x-2 gap-y-6 small:grid-cols-2 large:grid-cols-3"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductTile product={p} />
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
