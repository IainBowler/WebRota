import { browser, by, element } from 'protractor';
import { expect } from 'chai';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

export class JoinOrganisationPage {

  private joinOrgList = element(by.id('join-organisation-orgList'));
  private joinButton = element(by.id('join-organisation-joinButton'));

  joinOrganisation(organisationName: string) {

    element(by.cssContainingText('option', organisationName)).click();
    return this.joinButton.click();
  }
}
