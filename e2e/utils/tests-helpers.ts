import { expect } from '@playwright/test'

import Checkout from '../fixtures/page-objects/3-checkout/checkout-flow'

export async function waitForPageLoad(page) {
  await page.waitForLoadState('domcontentloaded')

  await page.waitForLoadState('load')
}

export async function fillSignupInputs(page) {
  await page.getByTestId('first-name-input').fill('Adam')

  await page.getByTestId('last-name-input').fill('Nowak')

  await page.getByTestId('email-input').fill('nowak@example.com')

  await page.getByTestId('phone-input').fill('444000111')

  await page.getByTestId('password-input').fill('Password!1')

  await page.getByLabel('I read and agree to Terms &').click()
}

export async function fillSignInInputs(page) {
  await page.getByTestId('email-input').fill('nowak@example.com')

  await page.getByTestId('password-input').fill('Password!1')
}

export async function goToSignUpPage(page) {
  await page.goto('https://solace-medusa-starter.vercel.app/de')

  await page.getByTestId('profile-dropdown-button').hover()

  await page.getByRole('link', { name: 'Sign up' }).click()
}

export async function goToSignInPage(page) {
  await page.goto('https://solace-medusa-starter.vercel.app/de')

  await page.getByTestId('profile-dropdown-button').hover()

  await page.getByRole('link', { name: 'Sign in' }).click()
}

export async function login(page) {
  await goToSignInPage(page)

  await fillSignInInputs(page)

  await page.getByTestId('sign-in-button').click({ force: true })
}

export async function goToSingleProductPage(page) {
  await page.goto(
    'https://solace-medusa-starter.vercel.app/de/products/winsdor-bar-stool'
  )

  await page.waitForURL(
    'https://solace-medusa-starter.vercel.app/de/products/winsdor-bar-stool'
  )

  await expect(page).toHaveURL(/products\/winsdor-bar-stool/)

  await waitForPageLoad(page)
}

export async function goToCartPage(page) {
  await page.goto('https://solace-medusa-starter.vercel.app/de/cart')

  await page.waitForURL('https://solace-medusa-starter.vercel.app/de/cart')

  await expect(page).toHaveURL(/\/cart/)

  await waitForPageLoad(page)
}

export async function fillShippingAddressInputs(page) {
  await waitForPageLoad(page)

  await page.getByTestId('shipping-first-name-input').fill('Adam')

  await page.getByTestId('shipping-last-name-input').fill('Nowak')

  await page.getByTestId('shipping-company-input').fill('Firma')

  await page.getByTestId('shipping-address-input').fill('Mokra 12')

  await page.getByTestId('shipping-postal-code-input').fill('00-999')

  await page.getByTestId('shipping-city-input').fill('Warsaw')

  await page.getByTestId('shipping-province-input').fill('Mazowieckie')

  await page.getByTestId('billing-email-input').fill('nowak@example.com')

  await page.getByTestId('shipping-phone-input').fill('444222000')
}

export async function orderProductFlow(page) {
  const checkout = new Checkout(page)

  await checkout.addProductToCart()

  // fill shipping address
  await fillShippingAddressInputs(page)

  // save and proceed to delivery step
  await checkout.saveAndProceedToDeliveryStep()

  // choose delivery method
  await checkout.chooseDeliveryMethod()

  // choose payment method
  await checkout.choosePaymentMethod()

  // check order confirmation items
  await checkout.checkOrderConfirmationPage()
}

export async function goToAccount(page) {
  await page.getByTestId('profile-dropdown-button').hover()

  await page
    .getByTestId('profile-dropdown-logged-in')
    .getByRole('link', { name: 'Dashboard icon Dashboard' })
    .click()

  await waitForPageLoad(page)

  await expect(page).toHaveURL(/\/account/)
}

export async function addNewShippingDetailsAddress(page) {
  await waitForPageLoad(page)

  await page.getByTestId('first-name-input').fill('Adam')

  await page.getByTestId('last-name-input').fill('Nowak')

  await page.getByTestId('company-input').fill('Firma')

  await page.getByTestId('address-1-input').fill('Mokra 12')

  await page.getByTestId('postal-code-input').fill('00-999')

  await page.getByTestId('city-input').fill('Warsaw')

  await page.getByTestId('country-select').selectOption('de')

  await page.getByTestId('state-input').fill('Mazowieckie')

  await page.getByTestId('phone-input').fill('444222000')

  await page.getByTestId('save-address-button').click()

  await waitForPageLoad(page)
}

export async function fillProfileDetails(page) {
  await waitForPageLoad(page)

  await page.getByTestId('edit-details-button').nth(0).click()

  await page.getByTestId('first-name-input').fill('')

  await page.getByTestId('first-name-input').fill('Adam')

  await page.getByTestId('last-name-input').fill('')

  await page.getByTestId('last-name-input').fill('Nowak')

  await page.getByTestId('phone-input').fill('')

  await page.getByTestId('phone-input').fill('99900888')

  await page.getByTestId('save-details-button').click()
}

const helpers = {
  waitForPageLoad,
  fillSignupInputs,
  fillSignInInputs,
  goToSignUpPage,
  goToSignInPage,
  login,
  goToSingleProductPage,
  goToCartPage,
  fillShippingAddressInputs,
  orderProductFlow,
  goToAccount,
  addNewShippingDetailsAddress,
  fillProfileDetails,
}
export default helpers
