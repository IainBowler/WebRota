import { browser, by, element } from 'protractor';
import { expect } from 'chai';

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  checkThisIsUsersHomePage(userName: string) {
    browser.driver.sleep(3000);
    return expect(element(by.id('WelcomeText')).getText()).to.eventually.include(userName);
  }
}
