Feature: Start Page

@loggedOn
Scenario: Start page should prompt user to join or create a new 
            organisation if they don't have an organisation or are not
            part of one.
    Given I am not the owner or part of an organisation
    Then I should be prompted to join or create an organisation