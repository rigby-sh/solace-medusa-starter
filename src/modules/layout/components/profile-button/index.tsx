import { getCustomer } from '@lib/data/customer'

import ProfileDropdown from '../profile-dropdown'

export default async function ProfileButton() {
  const customer = await getCustomer().catch(() => null)
  return <ProfileDropdown loggedIn={!!customer} />
}
