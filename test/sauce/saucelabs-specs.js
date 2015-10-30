var wd = require('wd');
require('colors');

var _ = require('lodash');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

var url = 'http://localhost:3000/';

if (process.env.APP_NAME && process.env.APP_NAME !== '') {
  url = 'http://' + process.env.APP_NAME + '-test.mybluemix.net/';
}

var assert = require('assert');
var testEventTS = new Date().getTime();
var testEventDesc = 'Sauce Test Event TS: ' + testEventTS;

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// checking sauce credential
if (process.env.SAUCE_USERNAME == '' || process.env.SAUCE_ACCESS_KEY == '') {
  console.warn(
    '\nPlease configure your sauce credential:\n\n' +
    'export SAUCE_USERNAME=<SAUCE_USERNAME>\n' +
    'export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>\n\n'
  );
  throw new Error('Missing Sauce Labs Credentials!');
}

// http configuration, not needed for simple runs
wd.configureHttp({
  timeout: 600000,
  retryDelay: 15000,
  retries: 5,
});

var desired = JSON.parse(process.env.DESIRED || '{browserName: "chrome"}');
desired.name = 'example with ' + desired.browserName;
desired.tags = ['tutorial'];

describe('tutorial (' + desired.browserName + ')', function() {
  var browser;
  var allPassed = true;

  before(function(done) {
    var username = process.env.SAUCE_USERNAME;
    var accessKey = process.env.SAUCE_ACCESS_KEY;

    browser = wd.promiseChainRemote('ondemand.saucelabs.com', 80, username, accessKey);

    if (process.env.VERBOSE) {

      // optional logging
      browser.on('status', function(info) {
        console.log(info.cyan);
      });

      browser.on('command', function(meth, path, data) {
        console.log(' > ' + meth.yellow, path.grey, data || '');
      });
    }

    browser
      .init(desired)
      .nodeify(done);
  });

  afterEach(function(done) {
    allPassed = allPassed && (this.currentTest.state === 'passed');
    done();
  });

  after(function(done) {
    browser
      .quit()
      .sauceJobStatus(allPassed)
      .nodeify(done);
  });

  it('Should get the landing page', function(done) {
    browser
      .get(url)
      .title()
      .should.become('DevOps Tutorial App')
      .nodeify(done);
  });

  _.times(2, function(i) { // repeat twice

    it('Verify the page content has correct application name', function(done) {
      browser
        .elementById("app-title")
        .text()
        .should.become('DevOps Tutorial App')
        .nodeify(done);
    });

    it('Verify the page content has correct api link', function(done) {
      browser
        .elementById("api-url")
        .getAttribute("href")
        .should.become(url + 'docs')
        .nodeify(done);
    });

  });

});
