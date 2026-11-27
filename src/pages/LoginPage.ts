
import { Page, Locator } from 'playwright';

export class LoginPage {

  private readonly page: Page;

  // Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {

    this.page = page;

    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');

  }

  // Navigate to login page
  async navigate(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Login action
  async login(username: string, password: string): Promise<void> {

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

  }

  // Get error message
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

}
