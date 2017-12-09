import { AppPage } from '../App/App.po';
import { OrgHelper } from './orgHelper';
import { Organisation } from '../../../src/app/Data/organisation';

const {defineSupportCode} = require('cucumber');

defineSupportCode(function({After, Before, registerHandler}) {

  const orgHelper = new OrgHelper();
  const appPage = new AppPage();

  After({tags: '@CreatedOrg'}, () => {
    // This hook will be executed after scenarios tagged with @newuser
    return orgHelper.deleteByName(orgHelper.createOrgName);
  });

  Before({tags: '@BasicOrg&LoggedOn'}, () => {
    // This hook will be executed before scenarios tagged with @loggedOn
    orgHelper.create(new Organisation(orgHelper.basicOrgName, '1234', [], 0));
    return appPage.LogoutLogin('existinguser@jokedb.net', 'existinguser');
  });

  After({tags: '@BasicOrg&LoggedOn'}, () => {
    return orgHelper.deleteByName(orgHelper.basicOrgName);
  });
});
