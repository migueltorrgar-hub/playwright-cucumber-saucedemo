import { Page, Locator } from 'playwright';

export class ProductsPage {

  private readonly pageTitle: Locator;
  private readonly productNames: Locator;
  private readonly productPrices: Locator;
  private readonly page: Page;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {

    this.pageTitle = page.getByText('Products', {
      exact: true
    });

    this.productNames = page.locator('.inventory_item_name');

    this.productPrices = page.locator('.inventory_item_price');

    this.page = page;

    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

  }

  // Get products page title
  async getPageTitle(): Promise<string> {
    return await this.pageTitle.innerText();
  }

  // Get all product names
  async getProductNames(): Promise<string[]> {

  await this.productNames.first().waitFor({
    state: 'visible'
  });

  return await this.productNames.allTextContents();

}

// Get all product prices
async getProductPrices(): Promise<string[]> {

  await this.productPrices.first().waitFor({
    state: 'visible'
  });

  return await this.productPrices.allTextContents();

}

// Get price of a specific product
async getProductPrice(productName: string): Promise<string> {


  const product = this.page.locator('.inventory_item').filter({
    has: this.page.locator('.inventory_item_name', {
      hasText: productName
    })
  });

  const price = product.locator('.inventory_item_price');

  await price.waitFor({
    state: 'visible'
  });

  return await price.innerText();

}

// Sort products by price: low to high
async sortByPriceLowToHigh(): Promise<void> {

  await this.sortDropdown.selectOption('lohi');

}

// Sort products by price: high to low
async sortByPriceHighToLow(): Promise<void> {

  await this.sortDropdown.selectOption('hilo');

}


}