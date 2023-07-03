
import testData from "../testData/testData.json" assert { type: "json" };

class HomePage {

    get homePageText () {
        return $("//h2[normalize-space()='Pre-retirement calculator']");
    }
   
    get currentAgeTextBox () {
        return $("#current-age");
    }
    get retirementAgeTextBox () {
        return $("#retirement-age");
    }
    get currentAnnualIncomeTextBox () {
        return $("#current-income");
    }
    get spouseAnnualIncomeTextBox () {
        return $("#spouse-income");
    }
    get currentRetirementSavingsTextBox () {
        return $("#current-total-savings");
    }
    get currentRetirementContributionTextBox () {
        return $("#current-annual-savings");
    }
    get savingsRateIncreseTextBox () {
        return $("#savings-increase-rate");
    }

    get socialSecurityBenefitsYesRadioBtn () {
        return $("label[for='yes-social-benefits']");
    }
    get maritalStatusText () {
        return $("#marital-status-label");
    }
    get maritalStatusMarrienRadioBtn () {
        return $("label[for='married']");
    }
    get socailSecurityOverrideAmountTextBox () {
        return $("//input[@id='social-security-override']");
    }
    get calculateBtn () {
        return $("//button[normalize-space()='Calculate']");
    }
    get resultsPageText () {
        return $("//h3[normalize-space()='Results']");
    }
    get resultMessage () {
        return $("//p[@id='result-message']");
    }

    get adjustDeafultValues () {
        return $("ul[role='presentation'] a[role='button']");
    }
    get adjustDeafultValuesModalText () {
        return $("#default-values-modal-title");
    }
    get additionalIncomeTextBox () {
        return $("//input[@id='additional-income']");
    }
    get retirementDuration () {
        return $("//input[@id='retirement-duration']");
    }
    get includeInflationRadioBtn () {
        return $("//label[@for='include-inflation']");
    }
    get expectedInflationRate () {
        return $("//input[@id='expected-inflation-rate']");
    }
    get retirementAnnualIncome () {
        return $("//input[@id='retirement-annual-income']");
    }
    get preRetirementRoi () {
        return $("//input[@id='pre-retirement-roi']");
    }
    get postRetirementRoi () {
        return $("//input[@id='post-retirement-roi']");
    }
    get saveChangesBtn () {
        return $("//button[normalize-space()='Save changes']");
    }
    get requiredFieldErrorMessage () {
        return $("#calculator-input-alert-desc");
    }
    get invalidFieldError () {
        return $$("//span[@class='invalid-error']");
    }
  
    
    
   
    async navigateToHomePage () {
        console.log(testData.base_url)
        await browser.url(testData.base_url)
        await browser.maximizeWindow();
        return browser.getTitle();
    }

    
    async fillAllRequiredFields (testDataName) {
        await this.homePageText.waitForDisplayed();
        await this.currentAgeTextBox.setValue(testData[testDataName].CurrentAge);
        await this.retirementAgeTextBox.setValue(testData[testDataName].RetirementAge);
        await this.currentAnnualIncomeTextBox.click();
        await this.currentAnnualIncomeTextBox.setValue(testData[testDataName].CurrentAnnualIncome);
        await this.spouseAnnualIncomeTextBox.click();
        await this.spouseAnnualIncomeTextBox.setValue(testData[testDataName].SpousesAnnualIncome);
        await this.currentRetirementSavingsTextBox.click();
        await this.currentRetirementSavingsTextBox.setValue(testData[testDataName].CurrentRetirementSavings);
        await this.currentRetirementContributionTextBox.click();
        await this.currentRetirementContributionTextBox.setValue(testData[testDataName].CurrentRetirementContribution);
        await this.savingsRateIncreseTextBox.click();
        await this.savingsRateIncreseTextBox.setValue(testData[testDataName].AnnualRetirementContributionIncrease);
    }

    async fillAdditionalSocialSecurityFields (testDataName) {
        await this.socialSecurityBenefitsYesRadioBtn.click();
        await browser.pause(3000)
        await this.maritalStatusMarrienRadioBtn.waitForDisplayed();
        await this.maritalStatusMarrienRadioBtn.click();
        await this.socailSecurityOverrideAmountTextBox.click();
        await this.socailSecurityOverrideAmountTextBox.setValue(testData[testDataName].SocialSecurityOverride);
    }

    async fillDefaultCalculatorValues(testDataName){
        await this.adjustDeafultValues.click();
        await this.adjustDeafultValuesModalText.waitForDisplayed();
        await this.additionalIncomeTextBox.setValue(testData[testDataName].AdditionalOtherIncome);
        await this.retirementDuration.setValue(testData[testDataName].NumberOfYearsRetirementNeedsToLast);
        await this.includeInflationRadioBtn.click();
        await this.expectedInflationRate.waitForDisplayed();
        await this.expectedInflationRate.click();
        await this.expectedInflationRate.setValue(testData[testDataName].PostRetirementIncomeIncreaseWithInflation);
        await this.retirementAnnualIncome.click();
        await this.retirementAnnualIncome.setValue(testData[testDataName].PreRetirementInvestmentReturn);
        await this.preRetirementRoi.click();
        await this.preRetirementRoi.setValue(testData[testDataName].PostRetirementInvestmentReturn);
        await this.postRetirementRoi.click();
        await this.postRetirementRoi.setValue(testData[testDataName].PostRetirementInvestmentReturn);
        await this.saveChangesBtn.click();
        await this.adjustDeafultValues.waitForDisplayed();
       
    }


    async submitAndVerifyResults(){
        await this.calculateBtn.click();
        await this.resultsPageText.waitForDisplayed();
        let resultsPageText = await this.resultsPageText.getText();
        await this.resultMessage.waitForDisplayed();
        let resultMessage = await this.resultMessage.getText();
        return [resultsPageText,resultMessage]
    }


    async fillFormWithoutMandatoryFieldsAndSubmit(testDataName){
        await this.currentAnnualIncomeTextBox.click();
        await this.currentAnnualIncomeTextBox.setValue(testData[testDataName].CurrentAnnualIncome);
        await this.spouseAnnualIncomeTextBox.click();
        await this.spouseAnnualIncomeTextBox.setValue(testData[testDataName].SpousesAnnualIncome);
        await this.currentRetirementSavingsTextBox.click();
        await this.currentRetirementSavingsTextBox.setValue(testData[testDataName].CurrentRetirementSavings);
        await this.currentRetirementContributionTextBox.click();
        await this.currentRetirementContributionTextBox.setValue(testData[testDataName].CurrentRetirementContribution);
        await this.savingsRateIncreseTextBox.click();
        await this.savingsRateIncreseTextBox.setValue(testData[testDataName].AnnualRetirementContributionIncrease);

        await this.calculateBtn.click();
    }

    async validateRequiredFieldsErrorMessage(){
        await this.requiredFieldErrorMessage.waitForDisplayed();
        let requiredFieldMandatoryFieldMessage = await this.requiredFieldErrorMessage.getText();
        let invalidFieldErrorArr = [];
        await this.invalidFieldError.map(async function(element){
           await invalidFieldErrorArr.push(await element.getText());
        })
        return [requiredFieldMandatoryFieldMessage, invalidFieldErrorArr]
    }




}

export default new HomePage();
