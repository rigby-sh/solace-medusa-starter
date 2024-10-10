import { DashboardIcon } from '@modules/common/icons/dashboard'
import { LogoutIcon } from '@modules/common/icons/logout'
import { OrderIcon } from '@modules/common/icons/order'
import { SettingsIcon } from '@modules/common/icons/settings'
import { ShippingIcon } from '@modules/common/icons/shipping'

export const profileNavItemsGroups = [
  [
    {
      href: '/account',
      icon: <DashboardIcon className="h-6 w-6" />,
      label: 'Dashboard',
      type: 'link',
    },
    {
      href: '/account/orders',
      icon: <OrderIcon className="h-6 w-6" />,
      label: 'Order history',
      type: 'link',
    },
  ],
  [
    {
      href: '/account/addresses',
      icon: <ShippingIcon className="h-6 w-6" />,
      label: 'Shipping details',
      type: 'link',
    },
    {
      href: '/account/profile',
      icon: <SettingsIcon className="h-6 w-6" />,
      label: 'Account settings',
      type: 'link',
    },
  ],
  [
    {
      href: '',
      type: 'logout',
      icon: <LogoutIcon className="h-6 w-6" />,
      label: 'Log out',
    },
  ],
]
