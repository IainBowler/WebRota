import { browser, by, element } from 'protractor';
import { expect } from 'chai';
import { CreateOrganisationPage } from '../create-organisiation/create-organisation.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

export class StartPage {

  private startText = element(by.id('start-text'));
  private createOrgPage = new CreateOrganisationPage();

  navigateTo() {
    return browser.get('/Start');
  }

  createOrganisation(organistionName: string) {
    return this.createOrgPage.createOrganisation(organistionName);
  }

  onStartPage() {
    return expect(browser.getCurrentUrl()).to.eventually.contain('/Start');
  }

  containsPromptToCreateOrJoin() {
    return expect(this.startText.getText()).to.eventually.contain('create a new organisation or join');
  }
}
