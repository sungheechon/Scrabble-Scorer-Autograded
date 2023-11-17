// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }
      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!\n");
   let wordForScoring = input.question("Enter a word to score: ");

//// Validation: If the use enters NUMBERS or nothing, they will be prompted to enter again.

   while (wordForScoring.length === 0 || !isNaN(wordForScoring)) {
      wordForScoring = input.question("Invalid word. Enter a word to score: ");
   }
   return wordForScoring
};


//// 0 - Simple Score option
let simpleScorer = function (word) {
   let letterPoints = 0;
   return letterPoints = word.length;
};

//// Saparating vowels if the user selects Vowel Score option.
function findVowel(wordsCheck) {
   wordsCheck = wordsCheck.toLowerCase();
   let vowels = ["a", "e", "i", "o", "u"];
   let wordVowels = [];
   for (let i = 0; i < wordsCheck.length; i++) {
      if (vowels.includes(wordsCheck[i])) {
         wordVowels.push(wordsCheck[i]);
      }
   }
   return wordVowels.join("").toLowerCase();
}

//// 1 - Vowel Score option. Using 'findVowel' function to separate the vowels from the word.
let vowelBonusScorer = function (word) {
   let checkVowels = findVowel(word);
   let letterPoints = 0;
   let sumCheckVowels = checkVowels.length * 3;
   let sumConsonants = word.length - checkVowels.length;
   return letterPoints = sumCheckVowels + sumConsonants;
};

//// Using the new and improved point structure.
let newPointStructure = transform(oldPointStructure);


/// 2 - Scrabble Score option using the new point structure, 'newPointStructure'.
let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      for (const pointValue in newPointStructure) {

         if (pointValue == word[i]) {
            letterPoints += newPointStructure[pointValue]
         }
      }
   }
   return letterPoints;
}
//// convert old and inefficent 'oldPointStructure' to 'newPointSture'.
function transform(param) {
   let newStructure = {};
   for (let oldType in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[oldType].length; i++) {
         let newKey = oldPointStructure[oldType][i].toLowerCase();
         let newValue = Number(oldType);
         newStructure[newKey] = newValue;
      }
   }
   return newStructure;
};

/// An array of Objects of different scoring options and execute the function based on the user select.
const scoringAlgorithms = [
   {
      name: "0 - Simple: ",
      description: "One point per character",
      scorerFunction: simpleScorer
   },
   {
      name: "1 - Vowel Bonus: ",
      description: "Vowels are worth 3 points",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "2 - Scrabble: ",
      description: "Uses scrabble point system",
      scorerFunction: scrabbleScorer
   }
];


//// Asking users to pick a number for which scoring method to use.
function scorerPrompt() {

   console.log("Which scoring algorithm would you like to use?")

   let scoringAlgorithmsOptions = "";
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      scoringAlgorithmsOptions += "\n" + (scoringAlgorithms[i].name + scoringAlgorithms[i].description);
   } console.log(scoringAlgorithmsOptions);

   let selectedScoringAlgorithm = input.question("Enter 0, 1, or 2: ");

   while (selectedScoringAlgorithm < 0 || selectedScoringAlgorithm > 2 || isNaN(selectedScoringAlgorithm) || selectedScoringAlgorithm.length === 0) {
      selectedScoringAlgorithm = input.question("Please, choose 0, 1, or 2: ");
   } return Number(selectedScoringAlgorithm);
}

//// This is where all actions happen.
function runProgram() {


   let userWordToScore = initialPrompt();
   let userNumToScore = scorerPrompt();

   let calculatedScore = scoringAlgorithms[userNumToScore].scorerFunction(userWordToScore);

   console.log(`Score for '${userWordToScore}': ${calculatedScore}`);

}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
