import { Locator, Page } from '@playwright/test'

import { BasePage } from './base/base-page'

export class ProductPage extends BasePage {
  container: Locator
  productTitle: Locator
  productDescription: Locator
  productOptions: Locator
  productPrice: Locator
  addProductButton: Locator
  mobileTitle: Locator
  mobileAddToCartButton: Locator

  constructor(page: Page) {
    super(page)

    this.container = page.getByTestId('product-container')
    this.productTitle = this.container.getByTestId('product-title')
    this.productDescription = this.container.getByTestId('product-description')
    this.productOptions = this.container.getByTestId('product-options')
    this.productPrice = this.container.getByTestId('product-price')
    this.addProductButton = this.container.getByTestId('add-product-button')
  }

  async clickAddProduct() {
    await this.addProductButton.click()
    await this.cartDropdown.cartDropdown.waitFor({ state: 'visible' })
  }

  async selectOption(option: string) {
    await this.page.mouse.move(0, 0) // hides the checkout container
    const optionButton = this.productOptions
      .getByTestId('option-button')
      .filter({ hasText: option })
    await optionButton.click({ clickCount: 2 })
  }
}
