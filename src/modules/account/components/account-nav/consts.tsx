import {
  BoxIcon,
  DashboardIcon,
  LogoutIcon,
  SettingsIcon,
  ShippingIcon,
} from '@modules/common/icons'

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
      icon: <BoxIcon className="h-6 w-6" />,
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
