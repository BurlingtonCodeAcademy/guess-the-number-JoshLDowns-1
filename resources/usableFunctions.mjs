//imports readline and defines ask function for input
import readline from 'readline';
const rl = readline.createInterface(process.stdin, process.stdout);

export function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//sanitizes string and determines valid response
export function inputSanitizer(string, responseType) {
  //possible valid input arrays
  let possibleYes = ['y', 'yes', 'yeah', 'yup', 'yar', 'yupper', 'yuppers'];
  let possibleNo = ['n', 'no', 'nay', 'negatory', 'nope', 'no way'];
  let possibleHigh = ['h', 'high', 'hi', 'higher'];
  let possibleLow = ['l', 'low', 'lower', 'lo'];

  //checks type of response the game is looking for, and determines if input is valid for that response
  if (responseType === 'y_or_n') {
      if (possibleYes.includes(string.trim().toLowerCase())) {
          return 'y';
      } else if (possibleNo.includes(string.trim().toLowerCase())) {
          return 'n';
      } else return false;
  } else if (responseType === 'h_or_l') {
      if (possibleHigh.includes(string.trim().toLowerCase())) {
        return 'h';
      } else if (possibleLow.includes(string.trim().toLowerCase())) {
        return 'l';
      } else return false;
  } else return false; //emergency catch
}

//determines if input is a valid integer
export function isInteger(numString, max) {
  let num = parseFloat(numString);
  if (num%Math.floor(num)!==0) {
    return false;
  } else if (num<0) {
    return false;
  } else if (max && num>max) {
    return false;
  } else return num;
}

//random number generator
export function random(min, max) {
  return Math.floor(min + (Math.random() * (max - min + 1)));
}
