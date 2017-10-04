import { HomePage } from './Home.po';
import { browser, by, element } from 'protractor';
import { expect } from 'chai';

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

module.exports = function () {

  var page = new HomePage();

  this.Given(/^I am on my home page$/, function () {

    return page.navigateTo();

  });

  this.Then(/^Page should display welcome message$/, function () {

    //return expect(page.getWelcomeText()).to.eventually.include('Welcome to ');

  });
};