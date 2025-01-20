'use strict';

const libs = require('..');
const assert = require('assert').strict;

assert.strictEqual(libs(), 'Hello from libs');
console.info('libs tests passed');
