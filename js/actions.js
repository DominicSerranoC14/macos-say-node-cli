'use strict';

const { spawn } = require('child_process');
const { errHandler, newLine } = require('./helpers.js');

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

	  spawn('say', ['-v', '?']).stdout.on('data', (data) => {
	    data.toString().split('\n').forEach((each, i) => {
	      if (!each) { return };

	      console.log(`${++i}: ${each}`)
	    });

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
