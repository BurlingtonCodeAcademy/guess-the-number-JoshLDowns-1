//importing game functions and images from resources folder
import { ask, inputSanitizer, isInteger, random } from './resources/usableFunctions.mjs'
import { title, win } from './resources/ascii_images.mjs'

start();//starts the game

async function start() {
    //Initializes game with title, game choice, and range choice
    title()
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
    let playerGuess;
    let guessCount = 1;
    let guessArray = [];

    //If statement to play correct game
    if (gameChoice === '1') {
      compGame(parseInt(maxRange));
    } else playerGame(parseInt(maxRange));
    
    //function for playing the computer guessing game
    async function compGame(max) {
        console.log(`Alright, think of a number in our range... and don't cheat!!!\n`);
        guess(0,max+1); //passes these numbers so range is inclusive
        //Guessing function that can be called recursively
        async function guess(rMin, rMax) {
            compGuess = Math.floor((rMax+rMin)/2);
            //Cheat checker, basically if computer ends up guessing the same number twice the player had to have lied
            if (guessArray.includes(compGuess)) {
                console.log(`HEY, I SAID NO CHEATING!\nIT'S NO FUN IF WE DON'T PLAY FAIR!!\n`);
                console.log(`If we play again ... NO CHEATING!!!!`);
                playAgain();
            }
            //builds array to check for cheating
            guessArray.push(compGuess);
            //sanitizes input and ensures it is valid before checking
            let answer = await ask(`Are you thinking of ${compGuess}?\n`);
            answer = inputSanitizer(answer,'y_or_n');
            while (answer === false) {
                answer = await ask(`Invalid response, please answer yes or no...\n`);
                answer = inputSanitizer(answer, 'y_or_n');
            }
            //determines outcome based on valid input
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
                guess(compGuess, rMax); //recalls function to initiate next guess after correct answer
              } else {
                guessCount+=1;
                guess(rMin, compGuess);  //recalls function to initiate next guess after correct answer
              }
            }
        }
    };

    //function for playing the player guessing game
    async function playerGame(max) {
        console.log(`Alright, I'm thinking of a number in our range, think you can figure it out?\n`);
        let compSecretNum = random(1,max); //determines computers secret number

        guessInt(compSecretNum);
        //guessing function that can be called recursively
        async function guessInt(num) {
            //ensures player input is a valid integer
            playerGuess = await ask(`Please guess a number between 1 and ${max}...\n`);
            playerGuess = isInteger(playerGuess);
            while (playerGuess === false) {
                playerGuess = await ask(`Please enter a whole, positive integer between 1 and ${max}...\n`);
                playerGuess = isInteger(playerGuess);
            };
            //determines output based on valid input
            if(playerGuess === num) {
                win();
                console.log(`\nCongrats! You got it right! You Win!!!!!!\nYou got it in ${guessCount===1?`1 guess!`:`${guessCount} guesses!`}`);
                playAgain();
            } else {
                if(playerGuess>num) {
                    console.log(`Nope! Try guessing a lower number!\n`);
                    guessCount += 1;
                    guessInt(num);  //recalls function after incorrect answer
                } else {
                    console.log(`That's a negatory Ghost Rider, try guessing a higher number!\n`)
                    guessCount += 1;
                    guessInt(num);  //recalls function after incorrect answer
                }
            }

        }
    };
}

//play again function, called at end of game
async function playAgain() {
    let again = await ask(`Would you like to play again?\n`);
    again = inputSanitizer(again, 'y_or_n');
    while (again === false) {
        again = await ask(`Invalid response, please answer yes or no...\n`);
        again = inputSanitizer(again, 'y_or_n');
    }
    if (again === 'y') {
        return start();
    } else process.exit();
}