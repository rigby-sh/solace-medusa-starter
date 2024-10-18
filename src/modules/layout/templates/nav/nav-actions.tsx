import { Box } from '@modules/common/components/box'
import CartButton from '@modules/layout/components/cart-button'
import ProfileButton from '@modules/layout/components/profile-button'

export default function NavActions() {
  return (
    <Box className="flex items-center !py-4">
      <ProfileButton />
      <CartButton />
    </Box>
  )
}
