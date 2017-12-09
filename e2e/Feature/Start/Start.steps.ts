import { browser, by, element } from 'protractor';
import { expect } from 'chai';
import { StartPage } from './Start.po';
import { OrganisationPage } from '../Organisation/organisation.po';
import { MyRotaPage } from '../MyRota/myRota.po';
import { OrgHelper } from '../Organisation/orgHelper';

const {defineSupportCode} = require('cucumber');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

defineSupportCode(function({Given, Then, When}) {

  const startPage = new StartPage();
  const orgPage = new OrganisationPage();
  const myRotaPage = new MyRotaPage();
  const orgHelper = new OrgHelper();

  Given(/^I am not the owner or part of an organisation$/, () => {
    // Don't have to do anything.
    return true;
  });

  When(/^I create a new organisation$/, {timeout: 20 * 1000}, () => {

    return startPage.createOrganisation(orgHelper.createOrgName);
  });

  When(/^I join an organisation$/, {timeout: 20 * 1000}, () => {

    return startPage.joinOrganisation(orgHelper.basicOrgName);
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
