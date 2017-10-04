import { browser, by, element } from 'protractor';
import { expect } from 'chai';
import { NavBarPage } from "./navBar.po";
import { AppPage } from "../App/App.po";
import { AuthHelper } from "./AuthHelper";
import { HomePage } from "../Home/Home.po";

var {defineSupportCode} = require('cucumber');

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

defineSupportCode(function({Given, Then, When}) {

  var appPage = new AppPage()
  var navBar = new NavBarPage();
  var homePage = new HomePage();
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

  Then(/^I should then be directed to users (.*) home page$/, {timeout: 20 * 1000}, (username) => {

    return homePage.checkThisIsUsersHomePage(username);

  });

  Then(/^I should then be directed logon page$/, () => {

    return appPage.checkOnWelcomePage();

  });
});