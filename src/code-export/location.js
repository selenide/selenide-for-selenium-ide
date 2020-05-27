"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emit = emit;
exports.default = void 0;

let _sideUtils = require("@seleniumhq/side-utils");

const emitters = {
  id: emitId,
  name: emitName,
  link: emitLink,
  linkText: emitLink,
  partialLinkText: emitPartialLinkText,
  css: emitCss,
  xpath: emitXpath
};

function emit(location) {
  return _sideUtils.codeExport.emit.location(location, emitters);
}

let _default = {
  emit
};
exports.default = _default;

function emitId(selector) {
  return Promise.resolve(`"#${selector}"`);
}

function emitName(selector) {
  return Promise.resolve(`byName("${selector}")`);
}

function emitLink(selector) {
  return Promise.resolve(`byLinkText("${selector}")`);
}

function emitPartialLinkText(selector) {
  return Promise.resolve(`byPartialLinkText("${selector}")`);
}

function emitCss(selector) {
  return Promise.resolve(`"${selector}"`);
}

function emitXpath(selector) {
  return Promise.resolve(`byXpath("${selector}")`);
}
