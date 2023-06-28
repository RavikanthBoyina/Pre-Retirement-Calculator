import { expect } from "chai";
import HomePage from "../pageobjects/pre-retirement.page.js";
import testData from "../testData/testData.json" assert { type: "json" };
import { Given,When,Then } from "@wdio/cucumber-framework";


Given('User is on Home Page of Retirement-Calculator Website', async () => {
    //This code will navigate to homepage and verify if title of page is as expected
    let HomepageTitle = await HomePage.navigateToHomePage();
    expect(HomepageTitle).to.be.equal(testData.homePageTitle)
})

When('User fills all required fields to submit form with {string} data',async (testDataName) => {
 //This code will fill all mandatory and non mandatory fields in form
 await HomePage.fillAllRequiredFields(testDataName);
})

Then('User Fills Additional Social Security fields and Submits the Form with {string} data',async (testDataName) => {
    //This code will fill ADSSFields and deafualt calculatore values in form
    await HomePage.fillAdditionalSocialSecurityFields(testDataName);
    await HomePage.fillDefaultCalculatorValues(testDataName);
 })


Then('User should be able to submit form with all fields filled in and verify results',async () => {
    //THis code will submit the form and verify if user can see results as expected
    let [resultsPageText,resultMessage] = await HomePage.submitAndVerifyResults();
    await expect(resultsPageText).to.be.equal('Results')
    await console.log(resultMessage)
})

Then('User should not be able to submit form and valid error message should be displayed',async () => {
    // THis code will verify if we get error messages as expected for negative form fill scenarios
  let [requiredFieldMandatoryFieldMessage, invalidFieldErrorArr] = await HomePage.validateRequiredFieldsErrorMessage();
  expect(requiredFieldMandatoryFieldMessage).to.be.equal(testData.requiredFieldErrorMsg);
  expect(invalidFieldErrorArr.length).to.be.equal(2);
  for (let i = 0; i < invalidFieldErrorArr.length; i++) {
    expect(invalidFieldErrorArr[i]).to.be.equal(testData.invalidErrorMessage);
    
  }
  console.log(requiredFieldMandatoryFieldMessage,invalidFieldErrorArr)
})

When('User fills form without mandatory fields and submits the form with {string} data',async (testDataName) => {
    //This code covers negative scenario for filling the form without mandatory fields and submitting the form
    await HomePage.fillFormWithoutMandatoryFieldsAndSubmit(testDataName);
})

When('User fills form without SSN and submits the form with {string} data',async (testDataName) => {
  // THis code fills the form without SSN fields
  await HomePage.fillAllRequiredFields(testDataName);


})

Then('User should be able to submit form and and verify results',async () => {
  // This code submits the form without SSN Fields and verify results as shown as expectec
  let [resultsPageText,resultMessage] = await HomePage.submitAndVerifyResults();
  await expect(resultsPageText).to.be.equal('Results')
  await console.log(resultMessage)
})



