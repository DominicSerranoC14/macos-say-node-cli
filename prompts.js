'use strict';

const { mainMenuSchema, sayUserSelectionSchema, voiceSelectionSchema } = require('./schemas');
const { errHandler, newLine } = require('./helpers.js');
const actions = require('./actions.js');
const store = require('./store.js');
const { spawn } = require('child_process');
const prompt = require('prompt');

const mainMenuPrompt = () => {
	newLine();
	console.log('1. Say something!');
	console.log('2. Pick a voice - then say something!');
	console.log('3. Exit');
	newLine();

  prompt.get(mainMenuSchema, (err, { Selection }) => {
    if (err) {  return console.log(`Oops! Something went wrong: ${err}`) };

		const sel = Selection;
		const action = Object.values(actions).filter(a => a.key === sel);

		// Check if user selection an existing selection
		if (!action.length) {
			newLine();
			console.log(`Sorry, that selection doesn't exist.`);
			mainMenuPrompt();
			return;
		};

		// Using the users selection, execute a specified action
		action[0].action();

  });
};

const sayUserSelectionPrompt = () => {
	newLine();

  prompt.get(sayUserSelectionSchema, (err, { Phrase }) => {

    if (err) {  return console.log(`Oops! Something went wrong: ${err}`) };

		//Store current users selection for later use
		store.input.push({ input: Phrase, timeStamp: new Date().toLocaleTimeString() });

		// Using spawn process, execute say command with the user's input
		// TODO: would be cool to print out text as say is saying it
    const s = spawn('say', [ Phrase ])
			.on('close', (code) => mainMenuPrompt());


  });
};

const voiceSelectionPrompt = () => {
	newLine();

  prompt.get(voiceSelectionSchema, (err, result) => {

    if (err) {  return console.log(`Oops! Something went wrong: ${err}`) };

    console.log('voiceSelection', result);

  });
};


module.exports = { sayUserSelectionPrompt, voiceSelectionPrompt, mainMenuPrompt };
