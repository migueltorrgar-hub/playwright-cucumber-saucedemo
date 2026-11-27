
import {
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber';

import { chromium } from 'playwright';
import { CustomWorld } from './world';

// Increase the default timeout to 30 seconds
setDefaultTimeout(30_000);

// Runs before each scenario
Before(async function (this: CustomWorld) {

  // Launch Chromium
  this.browser = await chromium.launch({
    headless: true
  });

  // Create a new browser context
  this.context = await this.browser.newContext();

  // Open a new page
  this.page = await this.context.newPage();

});

// Runs after each scenario
After(async function (this: CustomWorld) {

  // Close browser context
  if (this.context) {
    await this.context.close();
  }

  // Close browser
  if (this.browser) {
    await this.browser.close();
  }

});
