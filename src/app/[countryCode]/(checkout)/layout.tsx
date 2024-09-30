import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { ChevronDownIcon } from '@modules/common/icons/chevron-down'
import MedusaCTA from '@modules/layout/components/medusa-cta'

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full bg-white small:min-h-screen">
      <div className="h-16 border-b bg-white">
        <nav className="content-container flex h-full items-center justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi flex flex-1 basis-0 items-center gap-x-2 uppercase text-ui-fg-base"
            data-testid="back-to-cart-link"
          >
            <ChevronDownIcon className="rotate-90" size={16} />
            <span className="txt-compact-plus mt-px hidden text-ui-fg-subtle hover:text-ui-fg-base small:block">
              Back to shopping cart
            </span>
            <span className="txt-compact-plus mt-px block text-ui-fg-subtle hover:text-ui-fg-base small:hidden">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus uppercase text-ui-fg-subtle hover:text-ui-fg-base"
            data-testid="store-link"
          >
            Solace Medusa Starter
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="flex w-full items-center justify-center py-4">
        <MedusaCTA />
      </div>
    </div>
  )
}
