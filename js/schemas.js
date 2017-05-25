'use strict';

// Schemas used for promptjs validation
const mainMenuSchema = {
	name: 'Selection',
	message: 'Sorry, numbers only',
	type: 'integer',
};

const sayUserSelectionSchema = {
  name: 'Phrase',
  message: "Please keep it short, I don't have all day!",
  description: 'What would you like to say?',
  type: 'string',
  maxLength: 140,
};

const voiceSelectionSchema = {
  name: 'Selection',
  message: 'Please enter a number only',
  description: 'Choose your voice (number only)',
  type: 'integer',
};


module.exports = {
	mainMenuSchema,
	sayUserSelectionSchema,
	voiceSelectionSchema
};
