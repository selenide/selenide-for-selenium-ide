import {codeExport as exporter} from '@seleniumhq/side-utils'

const emitters = {
  id: emitId,
  value: emitValue,
  label: emitLabel,
  index: emitIndex,
}

export function emit(location) {
  return exporter.emit.selection(location, emitters)
}

export default {
  emit,
}

function emitId(id) {
  return Promise.resolve(`$(By.cssSelector("#${id}")).click();`)
}

function emitValue(value) {
  return Promise.resolve(`selectOptionByValue("${value}");`)
}

function emitLabel(label) {
  return Promise.resolve(`selectOption("${label}");`)
}

function emitIndex(index) {
  return Promise.resolve(`selectOption(${index});`)
}
