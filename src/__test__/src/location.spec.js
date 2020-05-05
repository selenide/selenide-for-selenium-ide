import {emit} from '../../code-export/location'

describe('location code emitter', () => {
  it('should fail to emit empty string', () => {
    return expect(() => {
      emit('')
    }).toThrow("Locator can't be empty")
  })
  it('should fail to emit unknown locator', () => {
    return expect(() => {
      emit('notExists=element')
    }).toThrow('Unknown locator notExists')
  })
  it('should emit id locator', () => {
    const type = 'id'
    const selector = 'someId'
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `Selectors.byId("${selector}")`
    )
  })
  it('should emit link locator', () => {
    const type = 'link'
    const selector = 'someLink'
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `Selectors.byLinkText("${selector}")`
    )
  })
  it('should emit linkText locator', () => {
    const type = 'linkText'
    const selector = 'someLink'
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `Selectors.byLinkText("${selector}")`
    )
  })
  it('should emit partialLinkText locator', () => {
    const type = 'partialLinkText'
    const selector = 'someLink'
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `Selectors.byPartialLinkText("${selector}")`
    )
  })
  it('should emit css locator', () => {
    const type = 'css'
    const selector = 'someCss'
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `"${selector}"`
    )
  })
  it('should emit css locator with `=` sign', () => {
    const type = 'css'
    const selector = 'a[title=JScript]'
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `"${selector}"`
    )
  })
  it('should escape quotes in locator strings', () => {
    const type = 'css'
    const selector = 'a[title="escaped"]'
    return expect(emit(`${type}=${selector}`)).resolves.toMatchSnapshot()
  })
  it('should emit xpath locator', () => {
    const type = 'xpath'
    const selector = 'someXpath'
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `Selectors.byXpath("${selector}")`
    )
  })
  it('should emit implicit xpath locator', () => {
    const selector = '//test=xpath'
    return expect(emit(selector)).resolves.toBe(`Selectors.byXpath("${selector}")`)
  })
  it('should emit name locator', () => {
    const type = 'name'
    const selector = 'someName'
    return expect(emit(`${type}=${selector}`)).resolves.toBe(
      `Selectors.byName("${selector}")`
    )
  })
})