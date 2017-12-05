import { browser, by, element } from 'protractor';
import { expect } from 'chai';
import { StartPage } from './Start.po';

const {defineSupportCode} = require('cucumber');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

defineSupportCode(function({Given, Then, When}) {

  const startPage = new StartPage();

  Given(/^I am not the owner or part of an organisation$/, () => {
    // Don't have to do anything.
    return true;
  });

  Then(/^I should be prompted to join or create an organisation$/, {timeout: 20 * 1000}, () => {

    return startPage.containsPromptToCreateOrJoin();

  });
});
