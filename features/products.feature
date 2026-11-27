Feature: Product Sorting

  Background:
    Given the user is on the login page
    When the user logs in with username "standard_user" and password "secret_sauce"

  @regression
  Scenario: Sort products by price from low to high
    When the user sorts products by price from low to high
    Then the products should be sorted by price from low to high

  @regression
  Scenario: Sort products by price from high to low
    When the user sorts products by price from high to low
    Then the products should be sorted by price from high to low