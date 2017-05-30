'use strict';

const { mainMenuSchema, sayUserSelectionSchema, voiceSelectionSchema, voiceConfirmationSchema } = require('./schemas');
const { errHandler, newLine } = require('./helpers.js');
const actions = require('./actions.js');
const store = require('./store.js');
const { spawn } = require('child_process');
const INQ = require('inquirer');


const mainMenuPrompt = () => {
	newLine();

  INQ.prompt(mainMenuSchema)
	.then(({ choice }) => {

		const action = Object.values(actions).filter(a => a.key === choice);

		// Check if user selection an existing selection
		if (!action.length) {
			newLine();
			console.log(`Sorry, that selection doesn't exist.`);
			mainMenuPrompt();
			return;
		};

		// Using the users selection, execute a specified action
		action[0].action();
  })
	.catch(console.log);
};


const sayUserSelectionPrompt = () => {
	newLine();

	INQ.prompt(sayUserSelectionSchema)
	.then(({ phrase }) => {

		//Store current users selection for later use
		store.input.push({ input: phrase, timeStamp: new Date().toLocaleTimeString() });

		if (store.voice) {
			return spawn('say', [ '-v', store.voice, phrase ])
				.on('close', (code) => mainMenuPrompt());
		}
		// Using spawn process, execute say command with the user's input
		// TODO: would be cool to print out text as say is saying it
    const s = spawn('say', [ phrase ])
			.on('close', (code) => mainMenuPrompt());
	})
	.catch(console.log);
};


const voiceSelectionPrompt = () => {
	newLine();

  INQ.prompt(voiceSelectionSchema)
	.then(({ choice }) => {
		store.voice = store.voiceList[--choice].split(' ')[1];

		// Test users chosen voice with test phrase
		return spawn('say', [ '-v', store.voice, 'What is up?' ])
  })
	// On completion of spawn process, fire next prompt
	.then((s) => s.on('close', (code) => voiceConfirmationPrompt()))
	.catch(console.log);
};


const voiceConfirmationPrompt = () => {
	newLine();

	INQ.prompt(voiceConfirmationSchema)
	.then(({ choice }) => {
		// If user selects voice
		if (choice) {
			sayUserSelectionPrompt();
			return;
		};

		store.voice = '';
		voiceSelectionPrompt();
	})
	.catch(console.log);
};


module.exports = { sayUserSelectionPrompt, voiceSelectionPrompt, mainMenuPrompt };
