'use strict';

// Schemas used for promptjs validation
const mainMenuSchema = {
	name: 'choice',
	type: 'list',
	message: 'Please enter your selection:',
	choices: [
		'1. Say something!',
		'2. Pick a voice - then say something!',
		'3. Exit',
	],
	// No need to validate because choices are controlled
	filter: (choice) => Number(choice.split('.')[0]),
};

const sayUserSelectionSchema = {
  name: 'phrase',
	type: 'input',
	message: 'What would you like to say? (press enter to submit)',
	validate: (phrase) => (phrase.length > 140) ? "Please keep it short, I don't have all day!" : true,
};

const voiceSelectionSchema = {
  name: 'choice',
	type: 'input',
  message: 'Choose your voice',
	validate: (choice) => (!isNaN(Number(choice))) ? true : 'Please enter numbers only.',
	filter: (choice) => Number(choice),
};

const voiceConfirmationSchema = {
	name: 'choice',
	type: 'confirm',
	message: 'Would you like to keep this voice?',
	// No need to validate because choices are controlled
	// filter: (choice) => Number(choice.split('.')[0]),
};

module.exports = {
	mainMenuSchema,
	sayUserSelectionSchema,
	voiceSelectionSchema,
	voiceConfirmationSchema,
};
