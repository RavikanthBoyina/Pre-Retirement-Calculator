Feature: Calculate a persons pre-retirement savings through Retirement-Calculator Website

  Scenario Outline: Negative condition validation for SSN fields when SSN is set to No
    Given User is on Home Page of Retirement-Calculator Website
    When  User sets SSN to No
    Then User should not see respective SSN fields



