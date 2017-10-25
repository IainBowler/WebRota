import { browser, by, element } from 'protractor';
import { expect } from 'chai';

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

export class StartPage {

  private startText = element(by.id('start.text'));

  navigateTo() {
    return browser.get('/Start');
  }

  onStartPage() {
    return expect(this.startText.getText()).to.eventually.equal('start works!');
  }
}
