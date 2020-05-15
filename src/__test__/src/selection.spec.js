import {emit} from '../../code-export/selection';

describe('selection location code emitter', () => {
  it('should fail to emit unknown selection locator', () => {
    return expect(() => {
      emit('notExists=element');
    }).toThrow('Unknown selection locator notExists');
  });
  it('should assume when no selector is given that it is the label locator', () => {
    return expect(emit('label')).resolves.toBe(
      `selectOption("label");`
    );
  });
  it('should emit label locator', () => {
    const type = 'label';
    const selector = 'a label';
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `selectOption("${selector}");`
    );
  });
  it('should emit id locator', () => {
    const type = 'id';
    const selector = 'someId';
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `$("#${selector}").click();`
    );
  });
  it('should emit value locator', () => {
    const type = 'value';
    const selector = 'someValue';
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `selectOptionByValue("${selector}");`
    );
  });
  it('should emit index locator', () => {
    const type = 'index';
    const selector = '2';
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `selectOption(${selector});`
    );
  });
});
