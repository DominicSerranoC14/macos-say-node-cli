'use strict';

const errHandler = (err) => { if (err) {  return console.log(`Oops! Something went wrong: ${err}`) }};

// New line helper func for spacing in the terminal
const newLine = () => console.log(``);


module.exports = { errHandler, newLine };
