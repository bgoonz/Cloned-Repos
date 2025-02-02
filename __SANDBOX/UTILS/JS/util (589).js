"use strict";

exports.__esModule = true;
exports.has = has;
var _Object$prototype = Object.prototype;
const hasOwnProperty = _Object$prototype.hasOwnProperty,
      toString = _Object$prototype.toString;

// Checks if an object has a property.

function has(obj, propName) {
  return hasOwnProperty.call(obj, propName);
}

const isArray = exports.isArray = Array.isArray || (obj => toString.call(obj) === "[object Array]");