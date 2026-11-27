import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { CustomWorld } from '../support/world';
import { ProductsPage } from '../pages/ProductsPage';

Then(
  'the products list should contain {int} products',
  async function (this: CustomWorld, expectedCount: number) {

    const productsPage = new ProductsPage(this.page);

    const productNames = await productsPage.getProductNames();

    expect(productNames).toHaveLength(expectedCount);

  }
);

Then(
  'the products list should include {string}',
  async function (this: CustomWorld, expectedProduct: string) {

    const productsPage = new ProductsPage(this.page);

    const productNames = await productsPage.getProductNames();

    expect(productNames).toContain(expectedProduct);

  }
);

Then(
  'the products list should include the following products',
  async function (this: CustomWorld, dataTable: DataTable) {

    const productsPage = new ProductsPage(this.page);

    const productNames = await productsPage.getProductNames();

    const expectedProducts = dataTable
      .raw()
      .map(([productName]) => productName);

    for (const expectedProduct of expectedProducts) {
      expect(productNames).toContain(expectedProduct);
    }

  }
);

Then(
  'the products list should display the following prices',
  async function (this: CustomWorld, dataTable: DataTable) {

    const productsPage = new ProductsPage(this.page);

    const actualPrices = await productsPage.getProductPrices();

    const expectedPrices = dataTable
      .raw()
      .map(([price]) => price);

    expect(actualPrices).toEqual(expectedPrices);

  }
);

Then(
  'the product {string} should have price {string}',
  async function (
    this: CustomWorld,
    productName: string,
    expectedPrice: string
  ) {

    const productsPage = new ProductsPage(this.page);

    const actualPrice = await productsPage.getProductPrice(productName);

    expect(actualPrice).toBe(expectedPrice);

  }
);

Then(
  'the following products should have these prices',
  async function (this: CustomWorld, dataTable: DataTable) {

    const productsPage = new ProductsPage(this.page);

    const expectedProducts = dataTable.raw();

    for (const [productName, expectedPrice] of expectedProducts) {

      const actualPrice = await productsPage.getProductPrice(productName);

      expect(actualPrice).toBe(expectedPrice);

    }

  }
);

When(
  'the user sorts products by price from low to high',
  async function (this: CustomWorld) {

    const productsPage = new ProductsPage(this.page);

    await productsPage.sortByPriceLowToHigh();

  }
);

When(
  'the user sorts products by price from high to low',
  async function (this: CustomWorld) {

    const productsPage = new ProductsPage(this.page);

    await productsPage.sortByPriceHighToLow();

  }
);

Then(
  'the products should be sorted by price from low to high',
  async function (this: CustomWorld) {

    const productsPage = new ProductsPage(this.page);

    const actualPrices = await productsPage.getProductPrices();

    const numericPrices = actualPrices.map(price =>
      Number(price.replace('$', ''))
    );

    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);

  }
);

Then(
  'the products should be sorted by price from high to low',
  async function (this: CustomWorld) {

    const productsPage = new ProductsPage(this.page);

    const actualPrices = await productsPage.getProductPrices();

    const numericPrices = actualPrices.map(price =>
      Number(price.replace('$', ''))
    );

    const sortedPrices = [...numericPrices].sort((a, b) => b - a);

    expect(numericPrices).toEqual(sortedPrices);

  }
);