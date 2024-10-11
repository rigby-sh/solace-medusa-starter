import { listCategories } from '@lib/data/categories'
import { getCollectionsList } from '@lib/data/collections'
import { getCollectionsData } from '@lib/data/fetch'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { SolaceLogo } from '@modules/common/icons'
import SideMenu from '@modules/layout/components/side-menu'

import NavActions from './nav-actions'
import Navigation from './navigation'

export default async function NavWrapper(props: any) {
  const productCategories = await listCategories()

  const { collections } = await getCollectionsList()
  const strapiCollections = await getCollectionsData()

  return (
    <Container
      as="nav"
      className="duration-400 sticky top-0 z-50 mx-0 max-w-full border-b border-basic-primary bg-primary !py-0 transition-all ease-in-out medium:!px-14"
    >
      <Container className="flex items-center justify-between !p-0">
        <Box className="flex large:hidden">
          <SideMenu
            productCategories={productCategories}
            collections={collections}
          />
        </Box>
        <Navigation
          countryCode={props.countryCode}
          productCategories={productCategories}
          collections={collections}
          strapiCollections={strapiCollections}
        />
        <Box className="relative block medium:absolute medium:left-1/2 medium:top-1/2 medium:-translate-x-1/2 medium:-translate-y-1/2">
          <LocalizedClientLink href="/">
            <SolaceLogo className="h-6 medium:h-7" />
          </LocalizedClientLink>
        </Box>
        <NavActions />
      </Container>
    </Container>
  )
}
