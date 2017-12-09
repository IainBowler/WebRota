import { browser, by, element } from 'protractor';
import { expect } from 'chai';
import { AuthHelper } from "../Authorisation/AuthHelper";
import { Auth0Page } from "./Auth0.po";

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

export class AppPage {

  private authHelper = new AuthHelper();
  private auth0Page = new Auth0Page();

  private welcomeText = element(by.id('welcome-title'));
  private loginButton = element(by.id('nav-login'));
  private logoutButton = element(by.id('nav-logout'));
  
  navigateTo() {
    return browser.get('/');
  }

  checkOnWelcomePage() {
    return expect(this.welcomeText.getText()).to.eventually.equal('Welcome to WebRota');
  }

  LogoutLogin(email:string, password:string) {
    this.authHelper.logout();
    return this.Login(email, password);
  }

  Register(email:string, password:string) {
    browser.ignoreSynchronization = true;

    this.loginButton.click();
    
    browser.sleep(3000);
    
    this.checkToNegatePreviousLogin();

    this.auth0Page.SignUpTab.click();

    this.addUserNameAndPassword(email, password);
    
    this.auth0Page.SubmitButton.click();

    return this.allowApp();
  }

  Login(email:string, password:string) {
    browser.ignoreSynchronization = true;

    this.loginButton.click();

    browser.sleep(3000);
    
    this.checkToNegatePreviousLogin();

    this.auth0Page.LogInTab.click();
    
    this.addUserNameAndPassword(email, password);

    this.auth0Page.SubmitButton.click();

    return this.allowApp();    
  }

  private addUserNameAndPassword(email:string, password:string) {
    this.auth0Page.emailTextBox.sendKeys(email);

    this.auth0Page.passwordTextBox.sendKeys(password);
  }

  private checkToNegatePreviousLogin() {
    let text = this.auth0Page.alternativeAccountLink.getText();
    
    while(text.isPending){
      browser.driver.sleep(200);
    }

    text.then( (t) =>{
      if(t === 'Not your account?'){
        this.auth0Page.alternativeAccountLink.click();
        browser.driver.sleep(2000);
      }
    });    
  }

  private allowApp() {
    browser.sleep(2000);

    this.auth0Page.allowAppButton.isPresent().then( (isPresent) => {
      if(isPresent) {
        this.auth0Page.allowAppButton.click();
      }
    });
    
    return browser.sleep(2000);
  }
}
