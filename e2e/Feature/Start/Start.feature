Feature: Start Page

@loggedOn
Scenario: Start page should prompt user to join or create a new 
            organisation if they don't have an organisation or are not
            part of one.
    Given I am not the owner or part of an organisation
    Then I should be prompted to join or create an organisation

@loggedOn
Scenario: When I create a new organisation from the start page
            I should be redirected to new organisations page
    Given I am not the owner or part of an organisation
    When I create a new organisation
    Then I should be redirected to the new organisations home page

@loggedOn
Scenario: When I join an organisation from the start page
            I should be redirected to the MyRota page
    Given I am not the owner or part of an organisation
    When I join an organisation
    Then I should be redirected to the MyRota page
