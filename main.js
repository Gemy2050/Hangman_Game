// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Array Of Letters
let lettersArray = [...letters];

// Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class To Span
  span.className = "letter-box";

  // Append Span To Letters Container
  lettersContainer.appendChild(span);
});


// Object Of Words And Categories
const words = {
  programming: ["javascript", "php", "fortran", "python", "scala", "go", "mysql"],
  countries: ["Egypt", "Syria", "Palestine", "Yemen", "Algeria", "Qatar", "Moroco"],
  people: ["Lionel Messi", "Luis Suarez", "Ronaldinho", "Di Maria", "Abo Treka", "Mohamed Salah"],
}

// Get Random Property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// The Choosen Category
let randomPropName = allKeys[randomPropNumber];

// The Choosen Word
let randomPropValue = words[randomPropName];
let randomValue = randomPropValue[Math.floor(Math.random() * randomPropValue.length)];

// Set Category 
document.querySelector(".category span").innerHTML = randomPropName;


let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Word To Array
let lettersAndSpace = Array.from(randomValue.toLowerCase());

// Create Spans For Word Letters
lettersAndSpace.forEach((letter) => {
  // Create Span
  let emptySpan = document.createElement("span");

  // If Letter is Space
  if(letter == " ") {
    // Add a Specific Class
    emptySpan.className = "with-space";
  }

  // Append Spans To Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans 
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");


// Handle Click on Letters
document.addEventListener("click", (e) => {
  // Set The Status
  let theStatus = false;

  if(e.target.className == "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let clickedLetter = e.target.innerHTML.toLowerCase();

    // The Choosen Word
    let theChoosenWord = [...randomValue.toLowerCase()];

    lettersAndSpace.forEach((wordLetter, wordIndex) => {
      // If Clicked Letter is in The Choosen Word
      if(clickedLetter == wordLetter) {

        // Set Status To True
        theStatus = true;
      
        // Loop on Guess Spans
        guessSpans.forEach((span, spanIndex) => {

          if(wordIndex == spanIndex) {
            span.innerHTML = clickedLetter;
          }

        })

      }
    });

    // Outside Loop

    // if Letter is Wrong
    if(!theStatus) {
      // Increase Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();

      if(wrongAttempts == 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {

  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`Game Over, The Word is: ${randomValue}`);

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = "popup";

  // Append To Body
  document.body.appendChild(div);

}