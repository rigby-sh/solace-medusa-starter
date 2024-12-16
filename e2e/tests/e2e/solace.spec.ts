import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Timeout config
export default defineConfig({
  timeout: 10 * 1000, // 10 seconds
});

dotenv.config({
  path: `e2e.env`      
});

const BaseUrl = process.env.E2E_BASE_URL;
const SearchUrl = process.env.E2E_SEARCH_URL;
const ProductUrl = process.env.E2E_PRODUCT_URL;
const AccountUrl = process.env.E2E_ACCOUNT_URL;
const CartUrl = process.env.E2E_CART_URL;
const UserEmail = process.env.E2E_EMAIL;
const UserPassword = process.env.E2E_PASSWORD;

// Page title test
test('Page has title', async ({ page }) => {
  await page.goto(BaseUrl);

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
test('search', async ({ page }) => {
  // Go to search section
  await page.goto(SearchUrl);

  //Check products visibility
  const SearchResults = await page.getByTestId('products-list').first();
  await expect(SearchResults).toBeVisible();
});

// Product page test
test('product page', async ({ page }) => {
  await page.goto(ProductUrl);
  await expect(page.getByTestId('product-title')).toBeVisible();
  await expect(page.getByTestId('product-price')).toBeVisible();
  await expect(page.getByTestId('orders-and-delivery-link')).toBeVisible();
  await expect(page.getByTestId('about-us-link')).toBeVisible();
});

// Changing categories test 
// verification of header menu
test('categories', async ({ page }) => {
  await page.goto(BaseUrl);

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
  await page.goto(AccountUrl);

  // Login, check if correct customer is logged in
  const EmailInput = await page.getByTestId('email-input').first()
  await EmailInput.fill(UserEmail)

  const PasswordInput = await page.getByTestId('password-input').first()
  await PasswordInput.fill(UserPassword)

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
  await page.goto(AccountUrl);

   // Login, check if correct customer is logged in
  const EmailInput = await page.getByTestId('email-input').first()
  await EmailInput.fill(UserEmail)

  const PasswordInput = await page.getByTestId('password-input').first()
  await PasswordInput.fill(UserPassword)

  const LoginButton = await page.getByTestId('sign-in-button').first()
  await LoginButton.click()

  // Go to orders tab
  const OrdersHistory = await page.getByText('Order history').nth(1);
  await OrdersHistory.click();

  const Order = await page.getByTestId('orders-page-wrapper').first();
  await expect(Order).toBeVisible();
});

// Test checkout area
test('Checkout', async ({ page }) => {

  await page.goto(ProductUrl);

  // Proceed to checkout from product page
  const AddToCartButton = await page.getByTestId('add-product-button').first()
  await (AddToCartButton).click();

  await page.waitForTimeout(5000);

  await page.goto(CartUrl);

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
  await Email.fill(UserEmail)
  
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
});

// Test footer links loading
test('load footer links', async ({ page }) => {
  await page.goto(BaseUrl);
  const AboutUsLink = await page.getByTestId('payment-and-pricing-link').first()
  await AboutUsLink.click();

  const AssertionH1 = await page.getByText('Terms & Conditions').first()
  await expect(AssertionH1).toBeVisible();
  });


//Edit account details

// Test footer links loading
test('edit account details', async ({ page }) => {
  await page.goto(AccountUrl);

  // Login, check if correct customer is logged in
  const EmailInput = await page.getByTestId('email-input').first()
  await EmailInput.fill(UserEmail)

  const PasswordInput = await page.getByTestId('password-input').first()
  await PasswordInput.fill(UserPassword)

  const LoginButton = await page.getByTestId('sign-in-button').first()
  await LoginButton.click()

  const AccountDetailsButton = await page.getByTestId('account-settings-nav-item').nth(1)
  await AccountDetailsButton.click()

  const EditButton = await page.getByTestId('edit-details-button').first()
  await EditButton.click()

  const FirstName = await page.getByTestId('first-name-input')
  const LastName = await page.getByTestId('last-name-input')
  const Phone = await page.getByTestId('phone-input')

  await FirstName.fill('firstName')
  await LastName.fill('lastName')
  await Phone.fill('503123123')

  const SaveButton = await page.getByTestId('save-details-button').first()
  await SaveButton.click()

  });
