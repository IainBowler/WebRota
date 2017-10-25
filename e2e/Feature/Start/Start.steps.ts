import { browser, by, element } from 'protractor';
import { expect } from 'chai';

var {defineSupportCode} = require('cucumber');

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

defineSupportCode(function({Given, Then, When}) {

  Given(/^I am not the owner or part of an organisation$/, () => {
    //Don't have to do anything.
    return true;
    
  });
    
  Then(/^I should be prompted to join or create an organisation$/, () => {

    return Promise.resolve('pending');

  });
});