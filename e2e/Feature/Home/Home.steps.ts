import { HomePage } from './Home.po';
import { browser, by, element } from 'protractor';
import { expect } from 'chai';

var {defineSupportCode} = require('cucumber');

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

defineSupportCode(function({Given, Then, When}) {

  var page = new HomePage();

  Given(/^I am on my home page$/, {timeout: 20 * 1000}, () => {

    return page.navigateTo();

  });

  Given(/^I am not the owner or part of an organisation$/, () => {
    //Don't have to do anything.
    return true;
    
  });
    
  Then(/^Page should display welcome message$/, () => {
    
    return page.checkThisIsUsersHomePage('existinguser@jokedb.net')
    
  });
        

  Then(/^Page should prompt me to join or create an organisation$/, () => {

    return Promise.resolve('pending');

  });
});