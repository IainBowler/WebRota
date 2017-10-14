Feature: Home Page

@loggedOn
Scenario: Home page should welcome user
    Given I am on my home page
    Then Page should display welcome message

@loggedOn
Scenario: Home page should prompt user to join or create a new 
            organisation if they don't have an organisation or are not
            part of one.
    Given I am on my home page
    Given I am not the owner or part of an organisation
    Then Page should prompt me to join or create an organisation