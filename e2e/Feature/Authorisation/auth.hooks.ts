import { AppPage } from '../App/App.po';
import { AuthHelper } from './AuthHelper';
import { browser } from 'protractor';

const {defineSupportCode} = require('cucumber');

defineSupportCode(function({After, Before, registerHandler}) {

  const authHelper = new AuthHelper();
  const appPage = new AppPage();

  registerHandler('BeforeFeatures', () => {
    authHelper.addUser('existinguser@jokedb.net', 'existinguser');
    return browser.driver.sleep(2000);
  });

  After({tags: '@newuser'}, () => {
    // This hook will be executed after scenarios tagged with @newuser
    return authHelper.deleteUser('newuser@jokedb.net');
  });

  Before({tags: '@loggedOn'}, () => {
    // This hook will be executed before scenarios tagged with @loggedOn
    return appPage.LogoutLogin('existinguser@jokedb.net', 'existinguser');
  });

  registerHandler('AfterFeatures', () => {
    return authHelper.deleteUser('existinguser@jokedb.net');
  });
});
