import { browser, by, element } from 'protractor';

export class NavBarPage {
  clickLogout() {
    browser.driver.sleep(2000);
    return element(by.id('nav-logout')).click();
  }
}
