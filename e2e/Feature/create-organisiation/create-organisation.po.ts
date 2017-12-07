import { browser, by, element } from 'protractor';
import { expect } from 'chai';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

export class CreateOrganisationPage {

  private newOrgNameText = element(by.id('create-organisation-organisationName'));
  private createButton = element(by.id('create-organisation-createButton'));

  createOrganisation(organisationName: string) {

    this.newOrgNameText.sendKeys(organisationName);
    return this.createButton.click();
}
}
