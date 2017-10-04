import { browser, by, element } from 'protractor';
import { expect } from 'chai';
import { AuthHelper } from "../Authorisation/AuthHelper";

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

export class Auth0Page {

  SignUpTab = element(by.css('.auth0-lock-tabs')).element(by.linkText('Sign Up'));

  SubmitButton = element(by.css('.auth0-lock-submit'));

  LogInTab = element(by.css('.auth0-lock-tabs')).element(by.linkText('Log In'));

  emailTextBox = element(by.name('email'));

  passwordTextBox = element(by.name('password'));

  alternativeAccountLink = element(by.css('.auth0-lock-alternative-link'));

  allowAppButton = element(by.id('allow'));
}