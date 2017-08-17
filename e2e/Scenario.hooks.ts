import { CucumberReportExtension } from "./CucumberReportExtension"

var myHooks = function () {

    var ext = new CucumberReportExtension();
    this.registerListener(ext.JsonFormatter);
};

module.exports = myHooks;