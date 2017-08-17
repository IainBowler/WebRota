Feature: Home Page

Scenario: Home page should welcome user
    Given I am on my home page
    Then Page should display welcome message

Scenario: I should be able to navigate to Tour of Heroes page from the Home page
    Given I am on my home page
    When I click on the Tour of Heroes Link
    Then I should navigate to the Tour of Heroes page