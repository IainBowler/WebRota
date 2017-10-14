import { AppPage } from '../App/App.po';
import { AuthHelper } from "./AuthHelper";

var {defineSupportCode} = require('cucumber');

defineSupportCode(function({After, Before, registerHandler}) {

  var authHelper = new AuthHelper();
  var appPage = new AppPage();

  registerHandler('BeforeFeatures', () => {
    return authHelper.addUser('existinguser@jokedb.net', 'existinguser');
  });
    
  After({tags: "@newuser"}, () => {
    // This hook will be executed after scenarios tagged with @newuser
    return authHelper.deleteUser('newuser@jokedb.net');
  });  

  Before({tags: "@loggedOn"}, () => {
    // This hook will be executed before scenarios tagged with @loggedOn
    return appPage.LogoutLogin('existinguser@jokedb.net', 'existinguser');
  });  

  registerHandler('AfterFeatures', () => {
    return authHelper.deleteUser('existinguser@jokedb.net');
  });
});