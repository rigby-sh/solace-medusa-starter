import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { SearchIcon } from '@modules/common/icons'
import CartButton from '@modules/layout/components/cart-button'
import ProfileButton from '@modules/layout/components/profile-button'

export default function NavActions() {
  return (
    <Box className="flex items-center !py-4">
      <Button
        variant="icon"
        withIcon
        asChild
        className="h-auto !p-2 xsmall:!p-3.5"
      >
        <LocalizedClientLink href="/search">
          <SearchIcon />
        </LocalizedClientLink>
      </Button>
      <ProfileButton />
      <CartButton />
    </Box>
  )
}
