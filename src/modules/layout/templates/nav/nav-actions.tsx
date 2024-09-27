import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { SearchIcon } from '@modules/common/icons/search'
import { UserIcon } from '@modules/common/icons/user'
import CartButton from '@modules/layout/components/cart-button'

export default function NavActions() {
  return (
    <Box className="flex items-center !py-4">
      <Button
        variant="icon"
        withIcon
        asChild
        className="h-auto !p-2 xsmall:!p-3.5"
      >
        <LocalizedClientLink href="/account">
          <SearchIcon />
        </LocalizedClientLink>
      </Button>
      <Button
        variant="icon"
        withIcon
        asChild
        className="h-auto !p-2 xsmall:!p-3.5"
      >
        <LocalizedClientLink href="/account">
          <UserIcon />
        </LocalizedClientLink>
      </Button>
      <CartButton />
    </Box>
  )
}
