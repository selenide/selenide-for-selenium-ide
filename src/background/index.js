import browser from 'webextension-polyfill'
import UAParser from 'ua-parser-js'
import pluginManifest from './plugin-manifest.json'
import emitters from '../code-export/index'

const util = require('util')

const parser = new UAParser(window.navigator.userAgent)
const browserName = parser.getBrowser().name
const isChrome = browserName === 'Chrome'
const isFirefox = browserName === 'Firefox'

function getId() {
  if (process.env.SIDE_ID) return process.env.SIDE_ID
  return isChrome
    ? 'mooikfkahbdckldjjndioackbalphokd'
    : isFirefox
      ? '{a6fd85ed-e919-4a43-a5af-8da18bda539f}'
      : ''
}

const seideId = getId()

function startPolling(payload) {
  setInterval(() => {
    browser.runtime
      .sendMessage(seideId, {
        uri: '/health',
        verb: 'get',
      })
      .catch(res => ({error: res.message}))
      .then(res => {
        if (!res) {
          browser.runtime.sendMessage(seideId, {
            uri: '/register',
            verb: 'post',
            payload,
          })
        }
      })
  }, 1000)
}

startPolling(pluginManifest)

browser.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    if (message.action === 'export' && message.entity === 'vendor') {

      const options = message.options;
      const url = options.url;
      const test = options.test;
      const tests = options.tests;
      const suite = options.suite;
      const project = options.project;
      const enableOriginTracing = options.tests.enableOriginTracing;
      const beforeEachOptions = options.tests.beforeEachOptions;
      const enableDescriptionAsComment =
        options.tests.enableDescriptionAsComment;

      if (suite) {
        emitters.emit
          .suite({
            url,
            suite,
            tests,
            project,
            enableOriginTracing,
            beforeEachOptions,
            enableDescriptionAsComment
          })
          .then(suite => {
            sendResponse({
              filename: suite.filename,
              body: suite.body
            });
          });
      } else {
        emitters.emit
          .test({
            url,
            test,
            tests,
            project,
            enableOriginTracing,
            beforeEachOptions,
            enableDescriptionAsComment
          })
          .then(test => {
            sendResponse({
              filename: test.filename,
              body: test.body
            });
          });
      }

      return true
    } else {
      sendResponse(true)
    }
  }
)
