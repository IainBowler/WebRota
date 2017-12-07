import { browser, by, element } from 'protractor';
import { expect } from 'chai';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

export class OrganisationPage {

  navigateTo(organisationId: number) {
    return browser.get('/Organisation/' + organisationId);
  }

  onPage() {
    browser.driver.sleep(2000);
    return expect(browser.getCurrentUrl()).to.eventually.contain('/Organisation/');
  }
}
