/*global document: false */
var activeCard1 = null;
var activeCard2 = null;
var clock = document.querySelector(".clock");
var timePlayed;
var second = 0;
var seconds = 0;
var minutes = 0;
var moveTracker = document.querySelector(".moves");
var moveCount = 0;
var moveS = "Moves";
var starCount = 5;
var starColor = "goldenrod";
var numMatches = 4;
var modal = document.querySelector("#myModal");
var xOut = document.querySelector(".close");



var logosLong = ["fa fa-anchor",
        "fa fa-diamond",
        "fa fa-leaf",
        "fa fa-bomb",
        "fa fa-bolt",
        "fa fa-bicycle",
        "fa fa-paper-plane-o",
        "fa fa-cube",
        "fa fa-automobile",
        "fa fa-balance-scale",
        "fa fa-bank",
        "fa fa-bell",
        "fa fa-birthday-cake",
        "fa fa-book",
        "fa fa-bug",
        "fa fa-camera-retro",
        "fa fa-coffee",
        "fa fa-compass",
        "fa fa-cloud",
        "fa fa-envelope-open-o",
        "fa fa-eye",
        "fa fa-female",
        "fa fa-flag-checkered",
        "fa fa-futbol-o",
        "fa fa-gavel",
        "fa fa-glass",
        "fa fa-globe",
        "fa fa-headphones",
        "fa fa-magnet",
        "fa fa-microchip",
        "fa fa-money",
        "fa fa-newspaper-o",
        "fa fa-moon-o",
        "fa fa-paper-plane-o",
        "fa fa-paw",
        "fa fa-puzzle-piece",
        "fa fa-ship",
        "fa fa-thermometer",
        "fa fa-trash",
        "fa fa-wrench"
];

//modal.style.display = "block";
xOut.onclick = function() {
   modal.style.display = "none";
};
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
};
document.querySelector(".final-stars").innerHTML = document.querySelector(".stars").innerHTML;
document.querySelector(".final-moves").innerHTML = document.querySelector(".moves").innerHTML;
document.querySelector(".final-clock").innerHTML = document.querySelector(".clock").innerHTML;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
   var currentIndex = array.length,
      temporaryValue, randomIndex;

   while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }

   return array;
}

function setCards() {
   modal.style.display = "none";

   document.querySelector("#input_matches2").value = 4;

   moveCount = -1;
   moveChange();
   var deckOfCards = document.querySelector("#demo");
   var deckMaxWidth = 185 * (parseFloat(numMatches) + 1) - 10;

   deckOfCards.style.maxWidth = (185 * (parseFloat(numMatches) + 1) - 10) + "px";

   while (deckOfCards.firstChild) {
      deckOfCards.removeChild(deckOfCards.firstChild);
   }
   stopClock();
   //timePlayed = null;
   second = 0;
   clock.innerHTML = "0:00.0";



   //shorten the array to the number designated by the # of matches choice at the beginning and double up each then shuffle
   var logosShort = shuffle(logosLong.slice(0, numMatches).concat(logosLong.slice(0, numMatches)));
   //reset text to ""
   var text = "";
   //create elements which will be the cards
   for (var i = 0; i < logosShort.length; i++) {
      var newLI = document.createElement("li");
      //newLI.innerHTML = logosShort[i];
      newLI.setAttribute("class", "card");
      newLI.onclick = function() {
         activateCard(this);
      };
      var newI = document.createElement("i");
      newI.setAttribute("class", logosShort[i]);
      deckOfCards = document.querySelector("#demo");
      deckOfCards.appendChild(newLI);
      newLI.appendChild(newI);
   }

   var refresher = document.querySelectorAll(".restart");
   refresher[0].onclick = function() {
      numMatches = document.querySelector("#input_matches").value;
      setCards();
   };
   refresher[1].onclick = function() {
      numMatches = document.querySelector("#input_matches2").value;
      setCards();
   };



}

function activateCard(thisElement) {
   if (second == 0) {
      startClock();
   }
   if (document.querySelectorAll(".show").length < 2) {
      thisElement.className = "card show";
      if (document.querySelectorAll(".show").length == 2) {
         matchCheck();
      } else {
         moveChange();
      }
   }
}
//change move number up
function moveChange() {
   moveCount++;

   if (moveCount == 1) {
      moveS = "move";
   } else {
      moveS = "moves";
   }
   moveTracker.innerHTML = moveCount + " " + moveS
   starCountChange();
   starColorChange();
}

// Start and Stop Clock functions

function startClock() {
   timePlayed = setInterval(function() {
      //alert(timePlayed);
      second = second + 0.1;
		minutes = ((second - (second % 60)) / 60);
		seconds = second - minutes * 60;
      if ((second % 60) < 10) {
         seconds = "0" + (Math.round(seconds * 10) / 10).toFixed(1)
      } else {
         seconds = (Math.round(seconds * 10) / 10).toFixed(1);
      }

      clock.innerHTML = minutes + ":" + seconds;

   }, 100);
}

function stopClock() {
   //alert(timePlayed);
   clearInterval(timePlayed);
   clearInterval(timePlayed);
   clearInterval(timePlayed);
}



function starColorChange() {
   //remove let starCount after change system to defined starCount
   let starCount = document.querySelectorAll(".stars .fa-star").length

   if (starCount === 5) {
      starColor = "goldenrod";
   } else if (starCount === 4) {
      starColor = "silver";
   } else if (starCount === 3) {
      starColor = "#cd5832";
   } else if (starCount === 2) {
      starColor = "black";
   } else {
      starColor = "red";
   }
   for (i = 0; i < document.querySelectorAll(".fa-star").length; i++) {
      document.querySelectorAll(".fa-star")[i].style.color = starColor;
      //document.querySelectorAll(".final-stars")[i].style.color = starColor;
   }
}

function starCountChange() {
   if (moveCount <= (Math.ceil(numMatches * 3 / 2) - 1)) {
      starCount = 5;
   } else if (moveCount == (Math.ceil(numMatches * 3 / 2))) {
      starCount = 4;
   } else if (moveCount == (Math.ceil(numMatches * 3 / 2) + 1)) {
      starCount = 3;
   } else if (moveCount == (Math.ceil(numMatches * 3 / 2) + 2)) {
      starCount = 2;
   } else {
      starCount = 1;
   }
   let starsElem = document.querySelector(".stars")
   while (starsElem.firstChild) {
      starsElem.removeChild(starsElem.firstChild);
   }

   for (i = 0; i < starCount; i++) {
      var newLI = document.createElement("li");
      var newI = document.createElement("i");
      newI.setAttribute("class", "fa fa-star");
      newLI.appendChild(newI);
      starsElem.appendChild(newLI);
   }

}

function matchCheck() {
   if (document.querySelectorAll(".show")[0].firstChild.className == document.querySelectorAll(".show")[1].firstChild.className) {
      document.querySelector(".show").setAttribute("class", "card match");
      document.querySelector(".show").setAttribute("class", "card match");
      victoryCheck();
   } else {
      setTimeout(function() {
         document.querySelector(".show").setAttribute("class", "card");
         document.querySelector(".show").setAttribute("class", "card");
      }, (1 * 1000));
   }
}

function victoryCheck() {
   if (document.querySelectorAll(".match").length >= 2 * numMatches) {
      stopClock();
      //alert("victory - " + clock.innerHTML);
      //modalDialog.className = "modalDialog";
      document.querySelector(".final-stars").innerHTML = document.querySelector(".stars").innerHTML;
      document.querySelector(".final-moves").innerHTML = document.querySelector(".moves").innerHTML;
      document.querySelector(".final-clock").innerHTML = document.querySelector(".clock").innerHTML;
      modal.style.display = "block";
   }
}

setCards();
