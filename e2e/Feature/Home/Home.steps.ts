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

    return expect(page.getParagraphText()).to.eventually.include('Welcome to ');

  });

  this.When(/^I click on the Tour of Heroes Link$/, function () {

    return page.clickTourOfHeroesLink();
       
  });

  this.Then(/^I should navigate to the Tour of Heroes page$/, function () {

    return expect(browser.getCurrentUrl()).to.eventually.equal('https://angular.io/tutorial');

  });
};