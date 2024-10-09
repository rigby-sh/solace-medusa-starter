import { Suspense } from 'react';



import { getRegion } from '@lib/data/regions';
import { Box } from '@modules/common/components/box';
import { Container } from '@modules/common/components/container';
import { Heading } from '@modules/common/components/heading';
import { Text } from '@modules/common/components/text';
import { search } from '@modules/search/actions';
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { ProductFilters as ProductFiltersType } from 'types/global';



import ProductFilters from '../components/filters';
import ActiveProductFilters from '../components/filters/active-filters';
import ProductFiltersDrawer from '../components/filters/filters-drawer';
import RefinementList from '../components/refinement-list';
import StoreBreadcrumbs from './breadcrumbs';
import PaginatedProducts from './paginated-products';


const StoreTemplate = async ({
  sortBy,
  page,
  collection,
  type,
  material,
  price,
  filters,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  collection?: string[]
  type?: string[]
  material?: string[]
  price?: string[]
  filters: ProductFiltersType
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const order = sortBy

  const region = await getRegion(countryCode)

  const { results } = await search({
    currency_code: region.currency_code,
    order,
    page: Number(page),
    collection,
  })

  // console.log('results', results)

  return (
    <Container className="flex flex-col gap-8 !py-8">
      <Box className="flex flex-col gap-4">
        <StoreBreadcrumbs />
        <Heading as="h1" className="text-4xl text-basic-primary small:text-5xl">
          All products
        </Heading>
        {/* TODO: Fetch products count after meilisearch connection */}
        <Text className="text-md text-secondary">50 products</Text>
        <Box className="grid w-full grid-cols-2 items-center justify-between gap-2 small:flex small:flex-wrap">
          <Box className="hidden small:flex">
            <ProductFilters filters={filters} />
          </Box>
          {/* <ProductFiltersDrawer>
            <ProductFilters filters={filters} />
          </ProductFiltersDrawer> */}
          <RefinementList sortBy={sortBy || 'created_at'} />
        </Box>
      </Box>
      {/* <ActiveProductFilters
        countryCode={countryCode}
        filters={filters}
      /> */}
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts
          sortBy={order}
          page={pageNumber}
          countryCode={countryCode}
        />
      </Suspense>
    </Container>
  )
}

export default StoreTemplate