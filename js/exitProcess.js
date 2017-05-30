'use strict';

const fs = require('fs');
const { errHandler, newLine } = require('./helpers.js');
const { spawn } = require('child_process');

// If user tries to exit while prompt open this will log the uncaught exception and restart program
// I think this comes from the readline.js module / or prompt.js from an uncaughtException
process.on('uncaughtException', (err) => {
	newLine();
	newLine();
	console.log(`Oops... Something went wrong, please restart the program`);
	// Dev mode logging
	if (process.env.NODE_ENV === 'dev') {
		newLine();
		console.log(`Dev mode -> Error:`);
		console.log(err);
		newLine();
		console.log('Restarting...');
		require('./prompts').mainMenuPrompt();
	}
});

// On any exit process (process.exit) log a user message and exit code for dev mode
process.on('exit', (code) => {
	newLine();
	console.log(`About to exit, goodbye!`);
	const s = spawn('say', [ 'Good bye!' ]);

	// Dev mode logging
	if (process.env.NODE_ENV === 'dev') {
		newLine();
		console.log(`Dev mode -> exiting with code: ${code}`);
		newLine();
	} else {
		newLine();
	}
});
