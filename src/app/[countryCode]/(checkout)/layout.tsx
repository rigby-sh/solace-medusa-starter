import CheckoutFooter from '@modules/layout/templates/checkout-footer'
import CheckoutNav from '@modules/layout/templates/checkout-nav'

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full bg-primary small:min-h-screen">
      <div className="border-b bg-primary">
        <CheckoutNav />
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <CheckoutFooter />
    </div>
  )
}
