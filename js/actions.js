'use strict';

const store = require('./store.js');
const { errHandler, newLine } = require('./helpers.js');
const { spawn } = require('child_process');

// Say the users typed selection
const sayUserSelection = {
	action: () => {
	  newLine();
	  console.log('What would you like your robot to say?');

	  require('./prompts').sayUserSelectionPrompt();
	},
	// Identifier used for user selction filter
	key: 1
};

// List all voices available
const displayVoiceList = {
	action: () => {
	  console.log('Select from one of the following voices.')
	  newLine();

		// TODO: move this to helper function so it is not executed each time
	  spawn('say', ['-v', '?']).stdout.on('data', (data) => {
			let voiceDesc;
			data.toString().split('\n').forEach((each, i) => {
	      if (!each) { return }; // Will skip empty options
				voiceDesc = `${++i}: ${each}`;
				store.voiceList.push(voiceDesc);
				console.log(voiceDesc);
	    })
	  })
		// Executing on spawn close to ensure store.voiceList is populated
		.on('close', (code) => {
			newLine();

			require('./prompts').voiceSelectionPrompt();
		});
	},
	// Identifier used for user selction filter
	key: 2,
};

const exitApp = {
	action: () => { process.exit(); },
	key: 3
}


module.exports = { sayUserSelection, displayVoiceList, exitApp };
