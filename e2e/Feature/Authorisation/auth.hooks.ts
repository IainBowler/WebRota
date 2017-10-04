import { AuthHelper } from "./AuthHelper";

var {defineSupportCode} = require('cucumber');

defineSupportCode(function({After, Before, registerHandler}) {

  var authHelper = new AuthHelper();

  registerHandler('BeforeFeatures', () => {
    return authHelper.addUser('existinguser@jokedb.net', 'existinguser');
  });
    
  After({tags: "@newuser"}, () => {
    // This hook will be executed after scenarios tagged with @newuser
    return authHelper.deleteUser('newuser@jokedb.net');
  });  

  registerHandler('AfterFeatures', () => {
    return authHelper.deleteUser('existinguser@jokedb.net');
  });
});