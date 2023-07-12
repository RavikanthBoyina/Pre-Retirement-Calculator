Feature: Calculate a persons pre-retirement savings through Retirement-Calculator Website

  Scenario Outline: Calculate a persons pre-retirement savings
    Given User is on Home Page of Retirement-Calculator Website
    When User fills all required fields to submit form with "<testData>" data
    And User Fills Additional Social Security fields and Submits the Form with "<testData>" data
    Then User should be able to submit form with all fields filled in and verify results

  Scenario Outline: Boundary condition validation for mandatory fields
    Given User is on Home Page of Retirement-Calculator Website
    When User fills form without mandatory fields and submits the form with "<testData>" data
    Then User should not be able to submit form and valid error message should be displayed

  Scenario Outline: Negative condition validation for SSN fields
    Given User is on Home Page of Retirement-Calculator Website
    When User fills form without SSN and submits the form with "<testData>" data
    Then User should be able to submit form and and verify results
  
  Scenario : Negative condition validation for SSN fields when SSN is set to No
    Given User is on Home Page of Retirement-Calculator Website
    When  User sets SSN to No
    Then User should not see respective SSN fields


  Examples:
  | testData     |
  |formTestData1 |
  |formTestData2 |
