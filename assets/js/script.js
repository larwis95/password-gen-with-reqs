// Assignment Code
var generateBtn = document.querySelector("#generate");
var chars = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+"
};

var temp = chars.upper.split('')
console.log(temp)

var prompts = {
  upperCase: "Would you like upper cases letters included? Y/N",
  lowerCase: "Would you like lower case letters included? Y/N",
  numbers: "Would you like numbers included? Y/N",
  symbols: "Would you like symbols included? Y/N",
  length: "Enter length of password between 8 and 128 characters.",
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  var charSet = []
  var charUpper = prompt(prompts.upperCase);
    if (charUpper.toLowerCase() !== "y" && charUpper.toLowerCase() !== "n") {
      alert("You must type Y or N to confirm yes or no.");
      return
    }
    else if (charUpper.toLowerCase() === "y") {
        charSet.push(chars.upper);
        alert("Upper case letters will be included");
        var charLower = prompt(prompts.lowerCase); 
      } else {
        alert("Upper case characters will not be included");
        var charLower = prompt(prompts.lowerCase);
      };
    if (charLower.toLowerCase() !== "y" && charLower.toLowerCase() !== "n") {
        alert("You must type Y or N to confirm yes or no.");
        return
    }
      else if (charLower.toLowerCase() === "y") {
          charSet.push(chars.lower);
          alert("Lower case letters will be included");
          charLower = prompt(prompts.numbers); 
        } else {
          alert("Lower case characters will not be included");
          charLower = prompt(prompts.numbers);
        };
      console.log(charSet);
  passwordText.value = password;

}

function generatePassword() {

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
