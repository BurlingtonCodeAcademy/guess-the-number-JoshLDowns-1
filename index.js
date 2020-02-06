const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
    //Initializes game with title, game choice, and range choice
    console.log(`
        ____  __ __    ___  _____ _____  
       /    ||  |  |  /  _]/ ___// ___/  
      |   __||  |  | /  [_(   \\_(   \\_   
      |  |  ||  |  ||    _]\\__  |\\__  |  
      |  |_ ||  :  ||   [_ /  \\ |/  \\ |  
      |     ||     ||     |\\    |\\    |  
      |___,_| \\__,_||_____| \\___| \\___|  
                                         
      __    __  __ __   ____  ______  _____ 
     |  |__|  ||  |  | /    ||      |/     |
     |  |  |  ||  |  ||  o  ||      ||  Y  |
     |  |  |  ||  _  ||     ||_|  |_||__|  |
     |  '  '  ||  |  ||  _  |  |  |     |__|
      \\      / |  |  ||  |  |  |  |      __ 
       \\_/\\_/  |__|__||__|__|  |__|     |__|
                                    `);
    console.log(`Hey! Wanna play a guessing game?`);
    let gameChoice = await ask(`Press (1) if you want me to guess a number you think of.\nPress (2) if you want to guess a number I think of.\n`);
    //ensures player enters correct game option
    while(gameChoice !== '1' && gameChoice !== '2') {
        gameChoice = await ask(`Please answer (1) or (2)...\n`);
    }
    //determines max range to play
    let maxRange = await ask(`Awesome! Let's try to guess a number between 1 and ....\n(enter a number, try 100, or even 1000 if you want it to be hard!)\n`);
    
    //ensures valid integer on input
    maxRange = isInteger(maxRange);
    while(maxRange === false) {
        maxRange = await ask(`Please enter a whole, positive integer...\n`);
        maxRange = isInteger(maxRange);
    }
    console.log(`Awesome! We are guessing a number between 1 and ${maxRange}!\n\nLet's Play Guess What!!!\n`);
    
    //Global variable declaration
    let compGuess;
    let guessCount = 1;

    if (gameChoice === '1') {
      compGame(parseInt(maxRange));
    } else playerGame(parseInt(maxRange));

    async function compGame(max) {
        console.log(`Alright, think of a number in our range... and don't cheat!!!\n`);
        guess(1,max);
        async function guess(rMin, rMax) {
            compGuess = Math.floor((rMax+rMin)/2);
            let answer = await ask(`Are you thinking of ${compGuess}?\n`);
            answer = inputSanitizer(answer,'y_or_n');
            while (answer === false) {
                answer = await ask(`Invalid response, please answer yes or no...\n`);
                answer = inputSanitizer(answer, 'y_or_n');
            }
            if (answer === 'y') {
              console.log(`Awesome, I win!!!!`);
              console.log(`It took me ${guessCount===1?`1 guess!`:`${guessCount} guesses!`}`);
              playAgain();
            } else {
              let hiLow = await ask(`Is it higher or lower?\n`);
              hiLow = inputSanitizer(hiLow, 'h_or_l');
              while (hiLow === false) {
                hiLow = await ask(`Invalid response, please answer higher or lower...\n`);
                hiLow = inputSanitizer(hiLow, 'h_or_l');
              }
              if (hiLow === 'h') {
                guessCount+=1;
                guess(compGuess, rMax);
              } else {
                guessCount+=1;
                guess(rMin, compGuess);
              }
            }
        }
    };

    async function playerGame(max) {
        //finish this code
    };
}

//sanitizes string and determines valid response
function inputSanitizer(string, responseType) {
    let possibleYes = ['y', 'yes', 'yeah', 'yup', 'yar', 'yupper', 'yuppers'];
    let possibleNo = ['n', 'no', 'nay', 'negatory', 'nope', 'no way'];
    let possibleHigh = ['h', 'high', 'hi', 'higher'];
    let possibleLow = ['l', 'low', 'lower', 'lo'];

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
function isInteger(numString) {
    //finish this code
    let num = parseFloat(numString);
    if (num%Math.floor(num)!==0) {
      return false;
    } else if (num<0) {
      return false;
    } else return num;
}

function cheatDetector (playerInput) {
    //finish this code
}

//random number generator
function random(min, max) {
    return Math.floor(min + (Math.random() * (max - min + 1)));
}

//play again function, called at end of game
async function playAgain() {
  
  process.exit();

}