
import { Given, When, Then } from '@cucumber/cucumber';

import { expect } from 'playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

let loginPage: LoginPage;

// Given: Navigate to login page
Given('the user is on the login page', async function (this: CustomWorld) {

  loginPage = new LoginPage(this.page);

  await loginPage.navigate();

});

// When: Login with credentials
When(
  'the user logs in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {

    await loginPage.login(username, password);

  }
);

// Then: Verify products page
Then('the products page should be displayed', async function (this: CustomWorld) {

  const productsPage = new ProductsPage(this.page);

  await expect(this.page).toHaveURL(/inventory.html/);

  const pageTitle = await productsPage.getPageTitle();

  expect(pageTitle).toBe('Products');

});

// Then: Verify error message
Then(
  'the error message should contain {string}',
  async function (this: CustomWorld, expectedMessage: string) {

    const errorMessage = await loginPage.getErrorMessage();

    expect(errorMessage).toContain(expectedMessage);

  }
);