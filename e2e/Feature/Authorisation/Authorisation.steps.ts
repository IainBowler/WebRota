import { StartPage } from '../Start/Start.po';
import { browser, by, element } from 'protractor';
import { expect } from 'chai';
import { NavBarPage } from "./navBar.po";
import { AppPage } from "../App/App.po";
import { AuthHelper } from "./AuthHelper";

var {defineSupportCode} = require('cucumber');

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

defineSupportCode(function({Given, Then, When}) {

  var appPage = new AppPage()
  var navBar = new NavBarPage();
  var startPage = new StartPage();
  var authHelper = new AuthHelper();
  
  Given(/^I am not logged on$/, () => {
    authHelper.logout();
  });

  Given(/^I am logged on$/, {timeout: 20 * 1000}, () => {

    return appPage.LogoutLogin('existinguser@jokedb.net', 'existinguser');

  });

  When(/^I register as a new user$/, {timeout: 20 * 1000},  () => {

    return appPage.Register('newuser@jokedb.net', 'newuser');

  });

  When(/^I log on as an existing user$/, {timeout: 20 * 1000}, () => {

    return appPage.Login('existinguser@jokedb.net', 'existinguser');

  });
        
  When(/^I click the logoff button$/, {timeout: 20 * 1000}, () => {

    return navBar.clickLogout();

  });

  Then(/^I should then be directed to the Start page$/, {timeout: 20 * 1000}, () => {

    return startPage.onStartPage();

  });

  Then(/^I should then be directed to the Welcome page$/, () => {

    return appPage.checkOnWelcomePage();

  });
});