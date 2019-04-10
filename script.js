//config
let chanceToShuffleOnFlip = 0.8; //20% of the times on flip it shuffles
let chanceToShuffleOnMatch = 0.6; //40% of the times on matches it shuffles
let musicVolume = 0.5; //0.1 should be standard
let soundVolume = 0.4;
let matchConstant = 0 //0 is standard, 22 if you want to debug
//config end
//---------------------------------------------

//var
var muteSound = false;
var cardsArray = [];
var lockBoard = false;
var hasFlippedCard = false;
var firstCard  = {};
var secondCard  = {};

var firstCardFlipSound = new Audio('sound/flipper.wav');
var secondCardFlipSound = new Audio('sound/flipper2.wav');
var matchSound = new Audio('sound/match.wav');
var winnerSound = new Audio('sound/winner.wav');
var click = new Audio('sound/click.wav');
var music = new Audio('sound/music2.mp3');
music.loop = true;
music.volume = musicVolume;
const resetBoard = function() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = {};
    secondCard = {};
};

var timerDisplay = document.querySelector('#timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = false;
var running = false;
var currentTime;

//var end
//---------------------------------------------

//functions
const resetCardArray = function() {
    var card0  = {id: "card-0", type: "star", freeze: false, temporaryFreeze: false };
    var card1  = {id: "card-1", type: "box", freeze: false, temporaryFreeze: false };
    var card2  = {id: "card-2", type: "leaf", freeze: false, temporaryFreeze: false };
    var card3  = {id: "card-3", type: "chest", freeze: false, temporaryFreeze: false };
    var card4  = {id: "card-4", type: "coin", freeze: false, temporaryFreeze: false };
    var card5  = {id: "card-5", type: "flower", freeze: false, temporaryFreeze: false };
    var card6  = {id: "card-6", type: "frog", freeze: false, temporaryFreeze: false };
    var card7  = {id: "card-7", type: "mushroom", freeze: false, temporaryFreeze: false };
    var card8  = {id: "card-8", type: "music", freeze: false, temporaryFreeze: false };

    var card9  = {id: "card-9", type: "star", freeze: false, temporaryFreeze: false };
    var card10  = {id: "card-10", type: "box", freeze: false, temporaryFreeze: false };
    var card11  = {id: "card-11", type: "leaf", freeze: false, temporaryFreeze: false };
    var card12  = {id: "card-12", type: "chest", freeze: false, temporaryFreeze: false };
    var card13  = {id: "card-13", type: "coin", freeze: false, temporaryFreeze: false };
    var card14  = {id: "card-14", type: "flower", freeze: false, temporaryFreeze: false };
    var card15  = {id: "card-15", type: "frog", freeze: false, temporaryFreeze: false };
    var card16  = {id: "card-16", type: "mushroom", freeze: false, temporaryFreeze: false };
    var card17  = {id: "card-17", type: "music", freeze: false, temporaryFreeze: false };

    var card18  = {id: "card-18", type: "wing", freeze: false, temporaryFreeze: false };
    var card19  = {id: "card-19", type: "wing", freeze: false, temporaryFreeze: false };

    var card20  = {id: "card-20", type: "hammer", freeze: false, temporaryFreeze: false };
    var card21  = {id: "card-21", type: "hammer", freeze: false, temporaryFreeze: false };

    var card22  = {id: "card-22", type: "skull", freeze: false, temporaryFreeze: false };
    var card23  = {id: "card-23", type: "skull", freeze: false, temporaryFreeze: false };

    cardsArray = [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17, card18, card19, card20, card21, card22, card23 ];
};

const shuffleCards = function() {
    var tempArray = [];
    cardsArray.forEach(function(element) {
        if ( !element.freeze && !element.temporaryFreeze ) {
            tempArray.push(element);
        }
    });
    shuffleArray(tempArray);
    cardsArray.forEach(function(element, index) {
        if ( element.freeze || element.temporaryFreeze ) {
            tempArray.splice(index, 0, element);
        }
    });
    cardsArray = tempArray;
};

const shuffleArray = function(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
};

const flipCard = function() {
    if (lockBoard) return;
    var currentCard = getCardObjectFromDom(this);

    if (currentCard.id === firstCard.id) return;
    this.classList.add('action-flip-card');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = currentCard;
        currentCard.temporaryFreeze = true;
        firstCardFlipSound.play();
        if (Math.random() > chanceToShuffleOnFlip) { //The value should be 0.7 30% of the first flips it will shuffle all available cards
            lockBoard = true;
            setTimeout(() => {
                shuffleCards(); // After every succesfull turn, it will shuffle the remaining of the cards
                drawCards(); //Redraw all cards
                lockBoard = false;
            }, 200);
        }
        return;
    }

    // second click
    secondCard = currentCard;
    currentCard.temporaryFreeze = true;
    secondCardFlipSound.play();
    checkForMatch();
    return;
};

const disableCards = function() {
    //We have a MATCH!!!
    matchSound.play();

    firstCard.freeze = true;
    firstCard.temporaryFreeze = false;

    secondCard.freeze = true;
    secondCard.temporaryFreeze = false;
    lockBoard = true;

    setTimeout(() => {
        resetBoard(); //Reset all variables
        if (Math.random() > chanceToShuffleOnMatch) { //Maybe shuffle
            shuffleCards();
        }
        drawCards(); //Redraw all cards
    }, 200);
};

const getCardObjectFromDom = function(element) {
    var currentCard = element.firstElementChild.classList[0];
    var foundIndex = cardsArray.findIndex(x => x.id == currentCard);
    return cardsArray[foundIndex];
};

const flipCardBack = function(card) {
    var cardDom = document.getElementsByClassName(card.id)[0].parentNode;
    cardDom.classList.remove('action-flip-card');
};

const unflipCards = function() {
    //NO Match!
    firstCard.temporaryFreeze = false;
    secondCard.temporaryFreeze = false;
    lockBoard = true;

    setTimeout(() => {
        flipCardBack(firstCard);
        flipCardBack(secondCard);
        resetBoard(); //Reset all variables
    }, 800);
};

const checkIfDone = function(){
    var f = cardsArray.filter((f) => f.freeze == false);
    if (f.length == matchConstant) {
        //WE HAVE A WINNER!!!!
        pauseTimer();
        document.getElementById("modal").style.visibility = "visible" ;
        document.getElementById("modal").style.opacity = 1 ;
        document.getElementById("modal-text").innerHTML = currentTime;
        music.pause();
        setTimeout(() => {
            removeCardsFromDom();
            winnerSound.play();
        }, 800);
    }
};

const checkForMatch = function() {
    let isMatch = firstCard.type == secondCard.type;
    isMatch ? disableCards() : unflipCards();
    checkIfDone();
};

const removeCardsFromDom = function() {
    var allCurrentCardsInDom = document.getElementsByClassName('card');
    while(allCurrentCardsInDom[0]) {
        allCurrentCardsInDom[0].parentNode.removeChild(allCurrentCardsInDom[0]);
    };
};

const drawCards = function() {
    removeCardsFromDom();
    cardsArray.forEach(function(element) {
        var cardContainer = document.createElement('div')
        cardContainer.className = 'card';

        var cardFront = document.createElement('div')
        cardFront.className = 'card-front';

        var cardBack = document.createElement('div')
        cardBack.classList.add(element.id);
        cardBack.classList.add("card-back");

        cardContainer.appendChild(cardBack);
        cardContainer.appendChild(cardFront);
        cardContainer.addEventListener('click', flipCard);

        if (element.freeze || element.temporaryFreeze) {
            cardContainer.classList.add("action-flip-card");
        }

        document.getElementById("card-container").appendChild(cardContainer);
    });
};

const formSubmit = function(){
    click.play();
    document.getElementById("input-button").disabled = true; //To prevent people for spamming the button
    var currentName = document.getElementById("input-name").value;
    var currentEmail = document.getElementById("input-email").value;

    var objects = JSON.parse(localStorage.getItem("savedData"));
    var newEntry = {
        "name": currentName,
        "time": currentTime,
        "email": currentEmail
    };
    objects.push(newEntry);
    localStorage.setItem("savedData", JSON.stringify(objects));

    //Hide modal
    document.getElementById("modal").style.visibility = "hidden" ;
    document.getElementById("modal").style.opacity = 0 ;
    setTimeout(() => {
        document.getElementById("input-button").disabled = false; //Make the button avaiable again
    }, 1000);
    resetTimer();
    showHighscore();
    removeCardsFromDom();
    document.getElementById("input-name").value = ""; //Clear input field
    document.getElementById("input-email").value = ""; //Clear email field
};

const showHighscore = function() {
    document.getElementById("highscore-container").style.visibility = "visible" ;
    document.getElementById("highscore-container").style.opacity = 1 ;

    var objects = JSON.parse(localStorage.getItem("savedData"));

    //Sort highscore list
    objects.sort(function(a,b) {
        if (a.time > b.time) {
            return 1;
        } else if(a.time < b.time) {
            return -1;
        } else {
            return 0;
        }
    });

    objects.forEach(function(element, index){
        var realIndex = index+1;
        var highscoreItem = "<div class='highscore-item'>" + realIndex + ". " +
        "<span class='highscore-name'>" + element.name + "</span>" +
        "<span class='highscore-time'>" + element.time + "</span>" +
        "</div>";
        document.getElementById("highscore-list").innerHTML += highscoreItem;
    });
};

const animateCurtainDown = function() {
    document.getElementById("curtain-container").classList.add("translate-down");
    document.getElementById("curtain-container").classList.remove("translate-up");
};

const animateCurtainUp = function() {
    document.getElementById("curtain-container").classList.add("translate-up");
    document.getElementById("curtain-container").classList.remove("translate-down");
};


const startGame = function() {
    click.play();
    animateCurtainDown();

    lockBoard = true;
    resetCardArray();
    shuffleCards(); //Shuffle all cards in the beginning
    drawCards(); //Redraw all the cards
    setTimeout(() => {
        document.getElementById("container").style.visibility = "visible";
        music.play();
        startTimer();
        animateCurtainUp();
        document.getElementById("startscreen-container").style.visibility = "hidden" ;
        document.getElementById("startscreen-container").style.opacity = 0;
        lockBoard = false;
    }, 3000);
};

const restartGame = function() {
    click.play();
    animateCurtainDown();
    setTimeout(() => {
        document.getElementById("startscreen-container").style.visibility = "visible";
        document.getElementById("startscreen-container").style.opacity = 1;
        document.getElementById("highscore-container").style.visibility = "hidden" ;
        document.getElementById("highscore-container").style.opacity = 0;

        resetTimer();
        resetBoard();
        resetCardArray();
        shuffleCards();
        drawCards();
        animateCurtainUp();
    }, 3000);
};



function startTimer(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
// change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.
paused = false;
running = true;
}
};

function resetTimer(){
  clearInterval(tInterval);
  savedTime = false;
  difference = false;
  paused = false;
  running = false;
};

function pauseTimer(){
  if (!difference){
    // if timer never started, don't allow pause button to do anything
} else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = true;
    running = false;
} else {
    // if the timer was already paused, when they click pause again, start the timer again
    startTimer();
}
};

function getShowTime(){
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime;
} else {
    difference =  updatedTime - startTime;
}
  // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((difference % (1000 * 60)) / 100);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  currentTime = hours + ':' + minutes + ':' + seconds;
  timerDisplay.innerHTML = currentTime;

};

const muteSounds = function(flag) {
    if (flag) {
        document.getElementById("mute-button").classList.remove("mute-button-not-pressed");
        document.getElementById("mute-button").classList.add("mute-button-pressed");
        firstCardFlipSound.volume = 0;
        secondCardFlipSound.volume = 0;
        matchSound.volume = 0;
        winnerSound.volume = 0;
        click.volume = 0;
        music.volume = 0;
    } else {
        document.getElementById("mute-button").classList.add("mute-button-not-pressed");
        document.getElementById("mute-button").classList.remove("mute-button-pressed");
        firstCardFlipSound.volume = soundVolume;
        secondCardFlipSound.volume = soundVolume;
        matchSound.volume = soundVolume;
        winnerSound.volume = soundVolume;
        click.volume = soundVolume;
        music.volume = musicVolume;
    }
};

const clearHighscore = function(flag) {
    if (flag) {
        localStorage.setItem("savedData", JSON.stringify([]));
        console.log("The highscore is now cleared!")
    } else {
        console.log("You need to provide the argument true if you want to clear the highscore");
    }

}

const showHighscoreInConsole = function() {
    var objects = JSON.parse(localStorage.getItem("savedData"));

    //Sort highscore list
    objects.sort(function(a,b) {
        if (a.time > b.time) {
            return 1;
        } else if(a.time < b.time) {
            return -1;
        } else {
            return 0;
        }
    });

    objects.forEach(function(element, index){
        var realIndex = index+1;
        console.log(realIndex + ". " + element.name + " | " + element.email + " | " + element.time);
    });
};

//function end
//---------------------------------------------

//init
if (JSON.parse(localStorage.getItem("savedData")) == null) {
    console.log("No data found in localStorage!");
    localStorage.setItem("savedData", JSON.stringify([]));
}

setTimeout(() => {
    animateCurtainUp();
}, 2000);

document.getElementById("mute-button").addEventListener("click", function(){
    muteSound = !muteSound;
    muteSound ? muteSounds(true) : muteSounds(false);
});

muteSounds(false);

//init end
//---------------------------------------------
