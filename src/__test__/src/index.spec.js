import fs from 'fs';
import path from 'path';
import {emitSuite, emitTest} from '../../code-export';
import {project as projectProcessor} from '@seleniumhq/side-utils';

function readFile(filename) {
  return JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        '..',
        'test-files',
        filename
      )
    )
  );
}

describe('Code Export Java Selenide', () => {
  it('should export a test', async () => {
    const project = readFile('single-test.side');
    const results = await emitTest({
      baseUrl: project.url,
      test: project.tests[0],
      tests: project.tests
    });
    expect(results.body).toBeDefined();
    expect(results.body).toMatchSnapshot();
  });
  it('should export a test with a grid configuration', async () => {
    const project = readFile('single-test.side');
    const results = await emitTest({
      baseUrl: project.url,
      test: project.tests[0],
      tests: project.tests,
      beforeEachOptions: {
        browserName: 'Firefox',
        gridUrl: 'http://localhost:4444/wd/hub'
      }
    });
    expect(results.body).toBeDefined();
    expect(results.body).toMatchSnapshot();
  });
  it('should export a suite', async () => {
    const project = normalizeProject(readFile('single-suite.side'));
    const results = await emitSuite({
      baseUrl: project.url,
      suite: project.suites[0],
      tests: project.tests
    });
    expect(results.body).toBeDefined();
    expect(results.body).toMatchSnapshot();
  });
  it('should export a test with a reused test method', async () => {
    const project = normalizeProject(readFile('test-case-reuse.side'));
    const results = await emitTest({
      baseUrl: project.url,
      test: project.tests[1],
      tests: project.tests
    });
    expect(results.body).toBeDefined();
    expect(results.body).toMatchSnapshot();
  });
  it('should export a test with commands that open a new window', async () => {
    const project = normalizeProject(readFile('select-window.side'));
    const results = await emitTest({
      baseUrl: project.url,
      test: project.tests[0],
      tests: project.tests
    });
    expect(results.body).toBeDefined();
    expect(results.body).toMatchSnapshot();
  });
  it('should export a suite with a reused test method', async () => {
    const project = normalizeProject(readFile('test-case-reuse.side'));
    const results = await emitSuite({
      baseUrl: project.url,
      suite: project.suites[0],
      tests: project.tests
    });
    expect(results.body).toBeDefined();
    expect(results.body).toMatchSnapshot();
  });
  it('should export a suite that uses control flow commands', async () => {
    const project = normalizeProject(readFile('control-flow-suite.side'));
    const results = await emitSuite({
      baseUrl: project.url,
      suite: project.suites[0],
      tests: project.tests
    });
    expect(results.body).toBeDefined();
    expect(results.body).toMatchSnapshot();
  });
  it('should export a suite with commands that open a new window inside of a reused test method', async () => {
    const project = normalizeProject(readFile('nested-select-window.side'));
    const results = await emitSuite({
      baseUrl: project.url,
      suite: project.suites[0],
      tests: project.tests
    });
    expect(results.body).toBeDefined();
    expect(results.body).toMatchSnapshot();
  });
  it('should export a suite with just one new window util method when there are multiple commands that open a new window', async () => {
    const project = normalizeProject(readFile('nested-select-window-v2.side'));
    const results = await emitSuite({
      baseUrl: project.url,
      suite: project.suites[0],
      tests: project.tests
    });
    expect(results.body).toBeDefined();
    expect(results.body).toMatchSnapshot();
  });
});

function normalizeProject(project) {
  let _project = {...project};
  _project.suites.forEach(suite => {
    projectProcessor.normalizeTestsInSuite({suite, tests: _project.tests});
  });
  return _project;
}
