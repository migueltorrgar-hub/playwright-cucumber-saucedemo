
Feature: User Login

  As a user
  I want to log in to SauceDemo
  So that I can access the products page

  Background:
    Given the user is on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the products page should be displayed


  @smoke
  Scenario: Verify products list after successful login
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the products list should contain 6 products
    And the products list should include the following products
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Fleece Jacket         |
      | Sauce Labs Onesie                |
      | Test.allTheThings() T-Shirt (Red) |
    And the products list should display the following prices
      | $29.99 |
      | $9.99  |
      | $15.99 |
      | $49.99 |
      | $7.99  |
      | $15.99 |
    And the product "Sauce Labs Backpack" should have price "$29.99"
    And the following products should have these prices
      | Sauce Labs Backpack               | $29.99 |
      | Sauce Labs Bike Light             | $9.99  |
      | Sauce Labs Bolt T-Shirt           | $15.99 |
      | Sauce Labs Fleece Jacket          | $49.99 |
      | Sauce Labs Onesie                 | $7.99  |
      | Test.allTheThings() T-Shirt (Red) | $15.99 |




  @regression
  Scenario: Login with invalid password
    When the user logs in with username "standard_user" and password "wrong_password"
    Then the error message should contain "Username and password do not match"

   @regression
  Scenario: Login without username
    When the user logs in with username "" and password "secret_sauce"
    Then the error message should contain "Username is required"


  @regression
  Scenario: Login without password
    When the user logs in with username "standard_user" and password ""
    Then the error message should contain "Password is required"