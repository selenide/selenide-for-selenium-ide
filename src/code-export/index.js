import {codeExport as exporter} from '@seleniumhq/side-utils';
import emitter from './command';
import location from './location';
import {generateHooks} from './hook';

// Define language options
export const displayName = 'Java Selenide';

export let opts = {};
opts.emitter = emitter;
opts.hooks = generateHooks();
opts.fileExtension = '.java';
opts.commandPrefixPadding = '  ';
opts.terminatingKeyword = '}';
opts.commentPrefix = '//';
opts.generateMethodDeclaration = generateMethodDeclaration;

// Create generators for dynamic string creation of primary entities (e.g., filename, methods, test, and suite)
function generateTestDeclaration(name) {
  return `@Test\npublic void ${exporter.parsers.uncapitalize(
    exporter.parsers.sanitizeName(name)
  )}() {`;
}

function generateMethodDeclaration(name) {
  return `public void ${exporter.parsers.sanitizeName(name)}() {`;
}

function generateSuiteDeclaration(name) {
  return `public class ${exporter.parsers.capitalize(
    exporter.parsers.sanitizeName(name)
  )}Test {`;
}

function generateFilename(name) {
  return `${exporter.parsers.capitalize(
    exporter.parsers.sanitizeName(name)
  )}Test${opts.fileExtension}`;
}

// Emit an individual test, wrapped in a suite (using the test name as the suite name)
export async function emitTest({
  baseUrl,
  test,
  tests,
  project,
  enableOriginTracing,
  beforeEachOptions,
  enableDescriptionAsComment
}) {
  global.baseUrl = baseUrl;
  const testDeclaration = generateTestDeclaration(test.name);
  const result = await exporter.emit.test(test, tests, {
    ...opts,
    testDeclaration,
    enableOriginTracing,
    enableDescriptionAsComment,
    project
  });
  const suiteName = test.name;
  const suiteDeclaration = generateSuiteDeclaration(suiteName);
  const _suite = await exporter.emit.suite(result, tests, {
    ...opts,
    suiteDeclaration,
    suiteName,
    project,
    beforeEachOptions
  });
  return {
    filename: generateFilename(test.name),
    body: exporter.emit.orderedSuite(_suite)
  };
}

// Emit a suite with all of its tests
export async function emitSuite({
  baseUrl,
  suite,
  tests,
  project,
  enableOriginTracing,
  beforeEachOptions,
  enableDescriptionAsComment
}) {
  global.baseUrl = baseUrl;
  const result = await exporter.emit.testsFromSuite(tests, suite, opts, {
    enableOriginTracing,
    enableDescriptionAsComment,
    generateTestDeclaration,
    project
  });
  const suiteDeclaration = generateSuiteDeclaration(suite.name);
  const _suite = await exporter.emit.suite(result, tests, {
    ...opts,
    suiteDeclaration,
    suite,
    project,
    beforeEachOptions
  });
  return {
    filename: generateFilename(suite.name),
    body: exporter.emit.orderedSuite(_suite)
  };
}

export default {
  emit: {
    test: emitTest,
    suite: emitSuite,
    locator: location.emit
  },
  register: {
    command: emitter.register,
    dependency: opts.hooks.declareDependencies.register,
    inEachBegin: opts.hooks.inEachBegin.register,
    inEachEnd: opts.hooks.inEachEnd.register
  }
};
