import React from 'react'

import { CreditCard } from '@medusajs/icons'
import { StoreCollection, StoreProductCategory } from '@medusajs/types'
import { BancontactIcon, IdealIcon, PayPalIcon } from '@modules/common/icons'

// Product filters
export const FILTER_KEYS = {
  ORDER_BY_KEY: 'sort_by',
  SEARCH_KEY: 'q',
  PAGE_KEY: 'p',
  PRICE_KEY: 'price',
  MATERIAL_KEY: 'material',
  COLLECTION_KEY: 'collection',
  ACTIVE: 'active',
}

export const PRODUCT_LIST_PATHNAMES = {
  CATEGORY: '/categories',
  EXPLORE: '/shop',
  SEARCH: '/search',
} as const

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: 'Credit card',
    icon: <CreditCard />,
  },
  'pp_stripe-ideal_stripe': {
    title: 'iDeal',
    icon: <IdealIcon />,
  },
  'pp_stripe-bancontact_stripe': {
    title: 'Bancontact',
    icon: <BancontactIcon />,
  },
  pp_paypal_paypal: {
    title: 'PayPal',
    icon: <PayPalIcon />,
  },
  pp_system_default: {
    title: 'Manual Payment',
    icon: <CreditCard />,
  },
  // Add more payment providers here
}

// This only checks if it is native stripe for card payments, it ignores the other stripe-based providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith('pp_stripe_')
}
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith('pp_paypal')
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith('pp_system_default')
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  'krw',
  'jpy',
  'vnd',
  'clp',
  'pyg',
  'xaf',
  'xof',
  'bif',
  'djf',
  'gnf',
  'kmf',
  'mga',
  'rwf',
  'xpf',
  'htg',
  'vuv',
  'xag',
  'xdr',
  'xau',
]

export const createNavigation = (
  productCategories: StoreProductCategory[],
  collections?: StoreCollection[]
) => [
  {
    name: 'Shop',
    handle: '/shop',
    category_children: productCategories
      .filter((category) => !category.parent_category)
      .map((category) => ({
        name: category.name,
        handle: `/categories/${category.handle}`,
        category_children: category.category_children.map((subCategory) => ({
          name: subCategory.name,
          handle: `/categories/${subCategory.handle}`,
          icon: null,
          category_children: null,
        })),
      })),
  },
  {
    name: 'Collections',
    handle: '/shop',
    category_children: !collections
      ? null
      : collections.map((collection) => ({
          name: collection.title,
          handle: `/collections/${collection.handle}`,
          category_children: null,
        })),
  },
  {
    name: 'About Us',
    handle: '/',
    category_children: null,
  },
]

export const createFooterNavigation = (
  productCategories: StoreProductCategory[]
) => {
  return {
    navigation: [
      {
        header: 'Categories',
        links: [
          ...productCategories
            .filter((category) => !category.parent_category)
            .slice(0, 5)
            .map((category) => ({
              title: category.name,
              href: `/categories/${category.handle}`,
            })),
        ],
      },
      {
        header: 'Orders',
        links: [
          {
            title: 'Orders and delivery',
            href: '/account/orders',
          },
          {
            title: 'Returns and refunds',
            href: '#',
          },
          {
            title: 'Payment and pricing',
            href: '#',
          },
        ],
      },
      {
        header: 'About',
        links: [
          {
            title: 'About us',
            href: '#',
          },
          {
            title: 'Blog',
            href: '#',
          },
          {
            title: 'Careers',
            href: '#',
          },
        ],
      },
      {
        header: 'Need help?',
        links: [
          {
            title: 'FAQs',
            href: '#',
          },
          {
            title: 'Support center',
            href: '#',
          },
          {
            title: 'Contact us',
            href: '#',
          },
        ],
      },
    ],
    contact: {
      header: "Let's stay in touch",
      text: 'Keep up to date with the latest product launches and news. Find out more about our brands and get special promo codes.',
    },
    other: [
      {
        title: 'Privacy Policy',
        href: '#',
      },
      {
        title: 'Terms & Conditions',
        href: '#',
      },
    ],
  }
}

export const checkoutFooterNavigation = [
  {
    title: 'Privacy Policy',
    href: '#',
  },
  {
    title: 'Terms & Conditions',
    href: '#',
  },
]
