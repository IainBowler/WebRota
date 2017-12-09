import { browser, by, element } from 'protractor';
import { expect } from 'chai';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

export class MyRotaPage {

  navigateTo() {
    return browser.get('/MyRota');
  }

  onPage() {
    browser.driver.sleep(2000);
    return expect(browser.getCurrentUrl()).to.eventually.contain('/MyRota');
  }
}
