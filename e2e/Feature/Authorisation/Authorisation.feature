Feature: Authorisation

@newuser
Scenario: New User should be able to register
    Given I am not logged on
    When I register as a new user
    Then I should then be directed to the Start page

Scenario: Existing user should be able to logon
    Given I am not logged on
    When I log on as an existing user
    Then I should then be directed to the Start page

Scenario: Logged on user should be able to logoff
    Given I am logged on
    When I click the logoff button
    Then I should then be directed to the Welcome page