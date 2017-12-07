import { browser, by, element } from 'protractor';
import { expect } from 'chai';
import { StartPage } from './Start.po';
import { OrganisationPage } from '../Organisation/organisation.po';
import { MyRotaPage } from '../MyRota/myRota.po';

const {defineSupportCode} = require('cucumber');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

defineSupportCode(function({Given, Then, When}) {

  const startPage = new StartPage();
  const orgPage = new OrganisationPage();
  const myRotaPage = new MyRotaPage();

  Given(/^I am not the owner or part of an organisation$/, () => {
    // Don't have to do anything.
    return true;
  });

  When(/^I create a new organisation$/, {timeout: 20 * 1000}, () => {

    return startPage.createOrganisation('New Organisation temporary');
  });

  When(/^I join an organisation$/, () => {

    return 'pending';
  });

  Then(/^I should be prompted to join or create an organisation$/, {timeout: 20 * 1000}, () => {

    return startPage.containsPromptToCreateOrJoin();
  });

  Then(/^I should be redirected to the new organisations home page$/, {timeout: 20 * 1000}, () => {

    return orgPage.onPage();
  });

  Then(/^I should be redirected to the MyRota page$/, {timeout: 20 * 1000}, () => {

    return myRotaPage.onPage();
  });
});
