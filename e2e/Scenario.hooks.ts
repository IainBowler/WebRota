import { CucumberReportExtension } from "./CucumberReportExtension"

var {defineSupportCode} = require('cucumber');

defineSupportCode( ({ registerListener }) => {

    var ext = new CucumberReportExtension();
    registerListener(ext.JsonFormatter);

});