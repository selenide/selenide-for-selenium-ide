import {codeExport as exporter} from '@seleniumhq/side-utils';

const emitters = {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  declareDependencies,
  declareMethods: empty,
  declareVariables,
  inEachBegin: empty,
  inEachEnd: empty
};

function generate(hookName) {
  return new exporter.hook(emitters[hookName]());
}

export function generateHooks() {
  let result = {};
  Object.keys(emitters).forEach(hookName => {
    result[hookName] = generate(hookName);
  });
  return result;
}

function afterAll() {
  const params = {
    startingSyntax: {
      commands: [
        {level: 0, statement: '@AfterAll'},
        {level: 0, statement: 'public static void finalTearDown() {'}
      ]
    },
    endingSyntax: {
      commands: [{level: 0, statement: '}'}]
    },
    registrationLevel: 1
  };
  return params;
}

function afterEach() {
  const params = {
    startingSyntax: {
      commands: [
        {level: 0, statement: '@AfterEach'},
        {level: 0, statement: 'public void tearDown() {'}
      ]
    },
    endingSyntax: {
      commands: [{level: 0, statement: '}'}]
    }
  };
  return params;
}

function beforeAll() {
  return {
    startingSyntax: {
      commands: [
        {level: 0, statement: '@BeforeAll'},
        {level: 0, statement: 'public static void initialSetUp() {'}
      ]
    },
    endingSyntax: {
      commands: [{level: 0, statement: '}'}]
    },
    registrationLevel: 1
  };
}

function beforeEach() {
  return {
    startingSyntax: ({browserName, gridUrl} = {}) => ({
      commands: [
        {level: 0, statement: '@BeforeEach'},
        {
          level: 0,
          statement: `public void setUp() {`
        },
        {
          level: 1,
          statement: gridUrl
            ? `Configuration.browser = "${browserName ? browserName.toLowerCase() : 'chrome'}";\n    Configuration.remote = "${gridUrl}";`
            : `Configuration.browser = "${browserName ? browserName.toLowerCase() : 'chrome'}";`
        },
        {level: 1, statement: 'vars = new HashMap<>();'}
      ]
    }),
    endingSyntax: {
      commands: [{level: 0, statement: '}'}]
    }
  };
}

function declareDependencies() {
  const params = {
    startingSyntax: {
      commands: [
        {level: 0, statement: 'import org.junit.jupiter.api.Test;'},
        {level: 0, statement: 'import org.junit.jupiter.api.BeforeAll;'},
        {level: 0, statement: 'import org.junit.jupiter.api.BeforeEach;'},
        {level: 0, statement: 'import org.junit.jupiter.api.AfterAll;'},
        {level: 0, statement: 'import org.junit.jupiter.api.AfterEach;'},
        {level: 0, statement: 'import com.codeborne.selenide.Configuration;'},
        {level: 0, statement: 'import com.codeborne.selenide.WebDriverRunner;'},
        {level: 0, statement: 'import static com.codeborne.selenide.Selectors.*;'},
        {level: 0, statement: 'import static com.codeborne.selenide.Condition.*;'},
        {level: 0, statement: 'import static com.codeborne.selenide.Selenide.*;'},
        {level: 0, statement: 'import static org.junit.jupiter.api.Assertions.*;'},
        {level: 0, statement: 'import org.openqa.selenium.Dimension;'},
        {level: 0, statement: 'import org.openqa.selenium.Keys;'},
        {level: 0, statement: 'import java.util.*;'}
      ]
    }
  };
  return params;
}

function declareVariables() {
  const params = {
    startingSyntax: {
      commands: [
        {
          level: 0,
          statement: 'private Map<String, Object> vars;'
        }
      ]
    }
  };
  return params;
}

function empty() {
  return {};
}
