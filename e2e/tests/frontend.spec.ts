import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';
import { defineConfig } from '@playwright/test';

// Timeout config
export default defineConfig({
  timeout: 10 * 1000, // 10 seconds
});

// Page title test
test('Page has title', async ({ page }) => {
  await page.goto('https://solace-medusa-starter.vercel.app/de');
  await expect(page).toHaveTitle(/Solace Medusa/);
});

// Main page elements visibility
// deleted 2 menu elements, only one selector is available 
test('main page elements visibilty', async ({ page }) => {
  await page.goto('https://solace-medusa-starter.vercel.app/de');

  //Header elements
  const CartLink = await page.getByTestId('nav-cart-link').first();

  //Header elements visibility
  await expect(CartLink).toBeVisible();
});

// Search test
// deleted natural path of clicking element from footer (doesn't include testid locator for nested svg button)
// deleted specified product visibility, only accessible element is 'product-lists'
test('search', async ({ page }) => {
  // Go to search section
  await page.goto('https://solace-medusa-starter.vercel.app/de/results/chair');

  //Check products visibility
  const SearchResults = await page.getByTestId('products-list').first();
  await expect(SearchResults).toBeVisible();
});

// Product page test
// deleted whole footer link tests, any of elements dosen't include testid
// deleted products-container
test('product page', async ({ page }) => {
  await page.goto('https://solace-medusa-starter.vercel.app/de/products/ashton-leather-accent-chair');
  await expect(page.getByTestId('product-title')).toBeVisible();
  await expect(page.getByTestId('product-price')).toBeVisible();
});

// Changing categories test 
// verification of header menu
test('categories', async ({ page }) => {
  await page.goto('https://solace-medusa-starter.vercel.app/de');

  // Horizontal menu select
  const ShopMenuButton = await page.getByText('Shop').first()
  await (ShopMenuButton).hover();

  const CategorySelect = await page.getByText('Dining Chairs').first()
  await (CategorySelect).click();

  const SearchResults = await page.getByTestId('products-list').first();
  await expect(SearchResults).toBeVisible();
});

// Test user area
test('user login', async ({ page }) => {
  await page.goto('https://solace-medusa-starter.vercel.app/de/account');

  // Login, check if correct customer is logged in
  const EmailInput = await page.getByTestId('email-input').first()
  await EmailInput.fill('mateusz.pilat+playwright@rigbyjs.com')

  const PasswordInput = await page.getByTestId('password-input').first()
  await PasswordInput.fill('Hasloplaywright123@')

  const LoginButton = await page.getByTestId('sign-in-button').first()
  await LoginButton.click()
  
  //Go to address section
  const AccountSettings = await page.getByText('Shipping details').nth(1);
  await AccountSettings.click()

  const AddAddress = await page.getByText('Add new address').first()
  await AddAddress.click()
  
  // Selector for adress input
  const FirstName = await page.getByTestId('first-name-input').first()
  const LastName = await page.getByTestId('last-name-input').first()
  const Company = await page.getByTestId('company-input').first()
  const Address1 = await page.getByTestId('address-1-input').first()
  const Postcode = await page.getByTestId('postal-code-input').first()
  const City = await page.getByTestId('city-input').first()
  const State = await page.getByTestId('state-input').first()
  const Country = await page.getByTestId('country-select').first()
  const Phone = await page.getByTestId('phone-input').first()

  // Filling address inputs
  await FirstName.fill('firstName')
  await LastName.fill('lastName')
  await Company.fill('company')
  await Address1.fill('strasse')
  await Postcode.fill('10115')
  await State.fill('state')
  await City.fill('city')
  await Country.selectOption('Germany')
  await Phone.fill('503123123')

  // Add address button
  const AddButton = await page.getByText('Save').first()
  await AddButton.click()
});

// Test orders display
test('check orders history', async ({ page }) => {
  await page.goto('https://solace-medusa-starter.vercel.app/de/account');

   // Login, check if correct customer is logged in
  const EmailInput = await page.getByTestId('email-input').first()
  await EmailInput.fill('mateusz.pilat+playwright@rigbyjs.com')

  const PasswordInput = await page.getByTestId('password-input').first()
  await PasswordInput.fill('Hasloplaywright123@')

  const LoginButton = await page.getByTestId('sign-in-button').first()
  await LoginButton.click()

  // Go to orders tab
  const OrdersHistory = await page.getByText('Order history').nth(1);
  await OrdersHistory.click();
  // Test to be contiuned in test env with test mode orders placing
});

// Test checkout area
test('Checkout', async ({ page }) => {

  await page.goto('https://solace-medusa-starter.vercel.app/de/products/savannah-wooden-oak-chair');

  // Proceed to checkout from product page
  const AddToCartButton = await page.getByTestId('add-product-button').first()
  await (AddToCartButton).click();

  await page.waitForTimeout(5000);

  await page.goto('https://solace-medusa-starter.vercel.app/de/cart');

  const CheckoutButton = await page.getByText('Proceed to checkout');
  await (CheckoutButton).click();

  // Address selectors
  const FirstName = await page.getByTestId('shipping-first-name-input')
  const LastName = await page.getByTestId('shipping-last-name-input')
  const Company = await page.getByTestId('shipping-company-input').first()
  const Address = await page.getByTestId('shipping-address-input').first()
  const Postcode = await page.getByTestId('shipping-postal-code-input').first()
  const State = await page.getByTestId('shipping-province-input').first()
  const City = await page.getByTestId('shipping-city-input').first()
  const Phone = await page.getByTestId('shipping-phone-input').first()
  const Email = await page.getByTestId('billing-email-input').first()

  // Address filling
  await FirstName.fill('firstName')
  await LastName.fill('lastName')
  await Company.fill('company')
  await Address.fill('strasse')
  await Postcode.fill('10115')
  await State.fill('state')
  await City.fill('city')
  await Phone.fill('503123123')
  await Email.fill('mateusz.pilat+test@rigbyjs.com')
  
  // Confirm Address 
  const SubmitAddress = await page.getByTestId('submit-address-button').first()
  await (SubmitAddress).click()

  //Delivery method select 
  const ShippingMethod = await page.getByText('Standard Shipping');
  await (ShippingMethod).click()

  //Payment method selection
  const ContinueToDeliveryButton = await page.getByText('Proceed to payment').first()
  await ContinueToDeliveryButton.click();

  const PaymentMethod = await page.getByText('Manual Payment').first()
  await PaymentMethod.click();

  //Totals visibility
  const CartSubtotal = await page.getByTestId('cart-subtotal').first()
  await CartSubtotal.isVisible();

  const CartShipping = await page.getByTestId('cart-shipping').first()
  await CartShipping.isVisible();

  const CartTotal = await page.getByTestId('cart-total').first()
  await CartTotal.isVisible();

  const PlaceOrder = await page.getByText('Place order').first()
  await PlaceOrder.click();

// Promo code should be added in env with this option possible
});
