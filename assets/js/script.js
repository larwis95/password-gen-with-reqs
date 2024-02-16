// Assignment Code
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copy")
var passLength;

var chars = {
  upper: ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  lower: ["abcdefghijklmnopqrstuvwxyz"],
  numbers: ["0123456789"],
  symbols: ["!@#$%^&*()-_=+"]
};

var prompts = {
  upperCase: "Would you like upper case letters included? Y/N",
  lowerCase: "Would you like lower case letters included? Y/N",
  numbers: "Would you like numbers included? Y/N",
  symbols: "Would you like symbols included? Y/N",
  length: "Enter length of password between 8 and 128 characters.",
};

// Write password to the #password input
function writePassword() {
  document.getElementById("password").value = generatePassword();
};

//copy password to clipboard
function copyPassword() {
  var copyText = document.getElementById("password").value
  navigator.clipboard.writeText(copyText);
  alert("Your password was copied to the clip board!");
return
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
  var criteriaSeed = [];  //defines an array to put our values picked from the mainArray into
  for (var x = 0; x < mainArray.length; x++) { //for loop that runs for the entire length of the array
     var splitArray = mainArray[x][0].split(''); //we need to split each string stored in our multidimensional array for value (x) to get a char set we can randomize, stores those in a new array
     criteriaSeed.push(splitArray[Math.floor(Math.random() * splitArray.length)]); //pushes a random value from the splitArray to our criteriaSeed array, gurantees we have one criteria from each user input
  };
  return criteriaSeed;  //returns the criteria seed back to our generatePassword() func
};

function generatePassword() {
  var charSet = []; //our charset multi-dimensional array, it will hold all the criteria the user chooses
  var charUpper = prompt(prompts.upperCase);
  if (charUpper.toLowerCase() !== "y" && charUpper.toLowerCase() !== "n" || !charUpper) { //checking for valid user input
    alert("You must type Y or N to confirm yes or no.");
    return //ends the program if no valid input
  }
  else if (charUpper.toLowerCase() === "y") {
    charSet.push(chars.upper); //pushes the chars.upper array to our charset array
    alert("Upper case letters will be included");
    var charLower = prompt(prompts.lowerCase); //starts next prompt
    console.log(charSet);
  } 
  else {
    alert("Upper case characters will not be included"); //alerts user criteria will be included
    var charLower = prompt(prompts.lowerCase);
    console.log(charSet);
  };
  if (charLower.toLowerCase() !== "y" && charLower.toLowerCase() !== "n" || !charLower) {
    alert("You must type Y or N to confirm yes or no.");
    return
  }
  else if (charLower.toLowerCase() === "y") {
    charSet.push(chars.lower);
    alert("Lower case letters will be included");
    var charNumbers = prompt(prompts.numbers);
    console.log(charSet);
  } 
  else {
    alert("Lower case characters will not be included");
    var charNumbers = prompt(prompts.numbers);
    console.log(charSet);
  };
  if (charNumbers.toLowerCase() !== "y" && charNumbers.toLowerCase() !== "n" || charNumbers) {
    alert("You must type Y or N to confirm yes or no.");
    return
  }
  else if (charNumbers.toLowerCase() === "y") {
    charSet.push(chars.numbers);
    alert("Numbers will be included");
    var charSymbols = prompt(prompts.symbols); 
    console.log(charSet);
  } 
  else {
    alert("Numbers will not be included");
    var charSymbols = prompt(prompts.symbols);
    console.log(charSet);
  };
  if (charSymbols.toLowerCase() !== "y" && charSymbols.toLowerCase() !== "n" || charSymbols) {
    alert("You must type Y or N to confirm yes or no.");
    return
  }
  else if (charSymbols.toLowerCase() === "y") {
    charSet.push(chars.symbols);
    alert("Symbols will be included");
    var charLength = Number(prompt(prompts.length)); 
    console.log(charSet);
  } 
  else {
    alert("Symbols will not be included");
    var charLength = Number(prompt(prompts.length));
    console.log(charSet);
  };
  if (charLength >= 8 && charLength <= 128 && charLength !== undefined) { //checks for correct password length range
    passLength = charLength;
    alert("You chose " + passLength + " for your password length.") //tells user the password length they selected
  }
  else {
    alert("You must choose a number between: 8-128!");
    return;
  }
  var criteriaSeed = pickArray(charSet) //calls custom function to guarantee user criteria is in the password
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
copyBtn.addEventListener("click", copyPassword);

