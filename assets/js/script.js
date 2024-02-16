// Assignment Code
var generateBtn = document.querySelector("#generate");

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
  document.getElementById("password").innerHTML = generatePassword();
};

function shufflePassword(string) {
  var parts = string.split('');
  for (var i = parts.length; i > 0;) {
      var random = parseInt(Math.random() * i);
      var temp = parts[--i];
      parts[i] = parts[random];
      parts[random] = temp;
  }
  return parts.join('');
};

function pickArray(mainArray) {
  var criteriaSeed = [];
  for (var x = 0; x < mainArray.length; x++) {
     var splitArray = mainArray[x][0].split('');
     criteriaSeed.push(splitArray[Math.floor(Math.random() * splitArray.length)]);
     console.log("this is criteriaSeed:");
     console.log(criteriaSeed);
  };
  return criteriaSeed;
};

function generatePassword() {
  var charSet = [];
  var charUpper = prompt(prompts.upperCase);
  if (charUpper.toLowerCase() !== "y" && charUpper.toLowerCase() !== "n") {
    alert("You must type Y or N to confirm yes or no.");
    return
  }
  else if (charUpper.toLowerCase() === "y") {
    charSet.push(chars.upper);
    alert("Upper case letters will be included");
    var charLower = prompt(prompts.lowerCase);
    console.log(charSet);
  } 
  else {
    alert("Upper case characters will not be included");
    var charLower = prompt(prompts.lowerCase);
    console.log(charSet);
  };
  if (charLower.toLowerCase() !== "y" && charLower.toLowerCase() !== "n") {
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
  if (charNumbers.toLowerCase() !== "y" && charNumbers.toLowerCase() !== "n") {
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
  if (charSymbols.toLowerCase() !== "y" && charSymbols.toLowerCase() !== "n") {
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
  if (charLength >= 8 && charLength <= 128 && charLength !== undefined) {
    passLength = charLength;
    alert("You chose " + passLength + " for your password length.")
  }
  else {
    alert("You must choose a number between: 8-128!");
    return;
  }
  console.log("This final charset:");
  console.log(charSet);
  var criteriaSeed = pickArray(charSet)
  var passwordChars = charSet.flat(1).join('');
  console.log("This is pass characters:" + passwordChars);
  var characterSeed = "";
  var passFun = "";
  while (characterSeed.length < (passLength - criteriaSeed.length)) {
  characterSeed += passwordChars[Math.floor(Math.random() * passwordChars.length)];
};
  var passwordSeed = criteriaSeed.join('');
  passFun += (passwordSeed += characterSeed);
  console.log(password);
  passFun = shufflePassword(passFun);
  return passFun;
};
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
