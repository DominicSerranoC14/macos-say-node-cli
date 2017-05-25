'use strict';

// To execute in dev mode run `NODE_ENV=dev node say.js`

require('./exitProcess.js');
const { mainMenuPrompt } = require('./prompts.js');
const schemas = require('./schemas.js');
const { errHandler, newLine } = require('./helpers.js');
const { spawn } = require('child_process');
const prompt = require('prompt');
prompt.message = '';
prompt.delimiter = ' ';


// Start App
newLine();
console.log('Welcome to Say 2.0! What would you like to do?');
mainMenuPrompt();
