import { CucumberReportExtension } from './CucumberReportExtension';

const {defineSupportCode} = require('cucumber');

defineSupportCode( ({ registerListener }) => {

    const ext = new CucumberReportExtension();
    registerListener(ext.JsonFormatter);

});

defineSupportCode(function({setDefaultTimeout}) {
  setDefaultTimeout(20 * 1000);
});
