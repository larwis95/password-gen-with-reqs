// Assignment Code
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copy");

var chars = { //object to hold our criteria
  upper: ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  lower: ["abcdefghijklmnopqrstuvwxyz"],
  numbers: ["0123456789"],
  symbols: ["!@#$%^&*()-_=+"]
};

var charSet = []; //array to hold what criteria gets picked

var failSafe = []; //array to check if all answers were "n" to end script if they are

var prompts = {  //object to hold our prompts text
  upperCase: "Would you like upper case letters included? Y/N",
  lowerCase: "Would you like lower case letters included? Y/N",
  numbers: "Would you like numbers included? Y/N",
  symbols: "Would you like symbols included? Y/N",
  length: "Enter length of password between 8 and 128 characters.",
};

class promptsClass {  //originally had huge if else tree, experimented with classes to reduce it in the generate password function
  constructor (promp, type, characters, charArray) {
    this.promp = prompt(promp);
    this.type = type;
    this.characters = characters;
    this.charArray = charArray;
  };

  validate() {
    if (this.promp === null || this.promp.toLowerCase() !== "y" && this.promp.toLowerCase() !== "n") { //checking for valid user input
      alert("You must type Y or N to confirm yes or no.");    
      return false;
    }
    else if (this.promp.toLowerCase() === "y") {
      this.charArray.push(this.characters); //pushes to our charsetarray
      alert(this.type + " characters will be included");
    } 
    else {
      alert(this.type + " characters will not be included"); //alerts user criteria will not be included
      failSafe.push('n');
    };
  };

};

//set intial text of text box on load
function setText () {
  document.getElementById("password").value = "Generate a password below!";
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (password === undefined) { //if the function returns and undefined sets the pasaword to default text
  document.getElementById("password").value = "Generate a password below!";
  }
  else {
    document.getElementById("password").value = password; //otherwise sets it to what generatepassword() returned
  };
};

//copy password to clipboard
function copyPassword() {
  var copyText = document.getElementById("password").value;
  if (copyText !== "Generate a password below!" && copyText !== "undefined" ) {  //checks to make sure its a valid copy
    navigator.clipboard.writeText(copyText);
    alert("Your password was copied to the clip board!");
  }
  else {
    alert("Generate a password first before copying!") //if its not a valid copy alerts the user to generate a password first
  return;
  };
};

//final shuffle function for more randomness, found on stack overflow credit: Maximilian Lindsey, https://stackoverflow.com/a/34025991
function shufflePassword(string) {
  var parts = string.split(''); //stores each character in the string into an array
  for (var i = parts.length; i > 0;) { //for loop that runs for the entire length of the array
      var rand = parseInt(Math.random() * i); //creates a randoml value to reconstruct the string with
      var temp = parts[--i]; //decreaes the i var decrementally
      parts[i] = parts[rand]; //swaps indexes with a random value
      parts[rand] = temp; 
  }
  return parts.join(''); //reconstructs string after shuffling, and returns it
};

//used to pick at least one of each critieria for the password
function pickArray(mainArray) {
  var criteriaSeed = [];
  if (mainArray.length === 1) {
    var splitArray = mainArray[0][0].split('');
    criteriaSeed.push(splitArray[Math.floor(Math.random() * splitArray.length)]);
  }
  else { //defines an array to put our values picked from the mainArray into
  for (var x = 0; x < mainArray.length; x++) { //for loop that runs for the entire length of the array
     var splitArray = mainArray[x][0].split(''); //we need to split each string stored in our multidimensional array for value (x) to get a char set we can randomize, stores those in a new array
     criteriaSeed.push(splitArray[Math.floor(Math.random() * splitArray.length)]); //pushes a random value from the splitArray to our criteriaSeed array, gurantees we have one criteria from each user input
  };
};
  return criteriaSeed;  //returns the criteria seed back to our generatePassword() func
};

function checkLength(charLength) {
if (charLength >= 8 && charLength <= 128 && charLength !== undefined) { //checks for correct password length range
  
  alert("You chose " + charLength + " for your password length.");
  return charLength; //tells user the password length they selected
}
else {
  alert("You must choose a number between: 8-128!");
  return false; //returns false if password length isn't valid
}
};

function generatePassword() {
  charSet = [] //our charset multi-dimensional array, it will hold all the criteria the user chooses, since these are in global scope, we have to reset it everytime we run the function
  failSafe = [] //failsafe array to check if every input was "n", resets it on function run because its in global scope
  var passLength;
  var charLength = Number(prompt("Choose a password length between 8-128."));
  var passLength = checkLength(charLength); //checks the password length for tbe correct length
  if (passLength === false) {  //if not valid length we end the function
    return;
  };
  var charUpper = new promptsClass(prompts.upperCase, "Upper Case", chars.upper, charSet); //creates our promp object from the promptsClass
  if (charUpper.validate() === false) {  //custom method to validate our prompt answer
    return; //if no valid prompt response ends the function
  }; 
  var charLower = new promptsClass(prompts.lowerCase, "Lower Case", chars.lower, charSet);
  if (charLower.validate() === false) {
    return;
  };
  var charNumbers = new promptsClass(prompts.numbers, "Number", chars.numbers, charSet);
  if (charNumbers.validate() === false) {
    return;
  };
  var charSymbols = new promptsClass(prompts.symbols, "Symbol", chars.symbols, charSet);
  if (charSymbols.validate() === false) {
    return;
  };
  if (failSafe.length == 4) {  //checks the failsafe array
    alert("You must select at least one criteria!");
  return;
  };
  var criteriaSeed = pickArray(charSet); //calls custom function to guarantee user criteria is in the password
  var passwordChars = charSet.flat(1).join(''); //flatens our multi-dimensional array, and combines it into a single string
  var characterSeed = ""; //need to define a empty string for our while loop
  var passFun = ""; //defines the final password variable
  while (characterSeed.length < (passLength - criteriaSeed.length)) {  //a while loop that runs until it hits our user inputed password length - the criteriaSeed length. 
    characterSeed += passwordChars[Math.floor(Math.random() * passwordChars.length)]; //makes our character seed a random string of characters from the passwordChars variable
  };
  var passwordSeed = criteriaSeed.join(''); //joins our criteriaSeed array into a string call passwordSeed
  passFun += (passwordSeed += characterSeed); //adds our passwordSeed string and characterseed together to get the final length the user input
  passFun = shufflePassword(passFun); //calls a custom shufflepassword function to randomize the password even more
  return passFun;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyPassword); //event listener for generate button
document.addEventListener("DOMContentLoaded", setText()); //event listern to settext on page load

