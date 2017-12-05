import { browser, by, element } from 'protractor';
import { expect } from 'chai';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

export class StartPage {

  private startText = element(by.id('start-text'));

  navigateTo() {
    return browser.get('/Start');
  }

  onStartPage() {
    return expect(browser.getCurrentUrl()).to.eventually.contain('/Start');
  }

  containsPromptToCreateOrJoin() {
    return expect(this.startText.getText()).to.eventually.contain('create a new organisation or join');
  }
}
