// CRITICAL: This file runs FIRST before any other module loads.
// Polyfills must execute here to prevent ReferenceError from web-first dependencies.

const rootGlobal = typeof globalThis !== 'undefined'
  ? globalThis
  : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
      ? self
      : {};

if (typeof rootGlobal.DOMException === 'undefined') {
  function DOMException(message, name = 'DOMException') {
    const error = new Error(message);
    error.name = name;
    Object.setPrototypeOf(error, DOMException.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, DOMException);
    }
    return error;
  }

  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;

  rootGlobal.DOMException = DOMException;
  if (typeof global !== 'undefined') {
    global.DOMException = DOMException;
  }
  if (typeof window !== 'undefined') {
    window.DOMException = DOMException;
  }
  if (typeof self !== 'undefined') {
    self.DOMException = DOMException;
  }
}

if (typeof rootGlobal.ArrayBuffer === 'undefined') {
  rootGlobal.ArrayBuffer = Array;
}

if (typeof rootGlobal.Blob === 'undefined') {
  rootGlobal.Blob = class Blob {
    constructor(parts = [], options = {}) {
      this.parts = parts;
      this.options = options;
    }
  };
}

if (typeof rootGlobal.FormData === 'undefined') {
  rootGlobal.FormData = class FormData {
    constructor() {
      this._parts = [];
    }
    append(key, value) {
      this._parts.push([key, value]);
    }
  };
}

require('expo-router/entry');
