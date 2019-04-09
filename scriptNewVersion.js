var card0  = {id: "card-0", type: "star", freeze: false, temporaryFreeze: false };
var card1  = {id: "card-1", type: "box", freeze: false, temporaryFreeze: false };
var card2  = {id: "card-2", type: "brain", freeze: false, temporaryFreeze: false };
var card3  = {id: "card-3", type: "chest", freeze: false, temporaryFreeze: false };
var card4  = {id: "card-4", type: "coin", freeze: false, temporaryFreeze: false };
var card5  = {id: "card-5", type: "flower", freeze: false, temporaryFreeze: false };
var card6  = {id: "card-6", type: "frog", freeze: false, temporaryFreeze: false };
var card7  = {id: "card-7", type: "mushroom", freeze: false, temporaryFreeze: false };
var card8  = {id: "card-8", type: "music", freeze: false, temporaryFreeze: false };

var card9  = {id: "card-9", type: "star", freeze: false, temporaryFreeze: false };
var card10  = {id: "card-10", type: "box", freeze: false, temporaryFreeze: false };
var card11  = {id: "card-11", type: "brain", freeze: false, temporaryFreeze: false };
var card12  = {id: "card-12", type: "chest", freeze: false, temporaryFreeze: false };
var card13  = {id: "card-13", type: "coin", freeze: false, temporaryFreeze: false };
var card14  = {id: "card-14", type: "flower", freeze: false, temporaryFreeze: false };
var card15  = {id: "card-15", type: "frog", freeze: false, temporaryFreeze: false };
var card16  = {id: "card-16", type: "mushroom", freeze: false, temporaryFreeze: false };
var card17  = {id: "card-17", type: "music", freeze: false, temporaryFreeze: false };

var cardsArray = [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17 ];

let lockBoard = false;
let hasFlippedCard = false;
var firstCard  = {};
var secondCard  = {};

const resetBoard = function() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = {};
    secondCard = {};
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
}

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
        /*if (Math.random() > 0.7) { //30% of the first flips it will shuffle all available cards
            shuffle();
        }*/
        console.log(firstCard.type);
        return;
    }

    // second click
    secondCard = currentCard;
    currentCard.temporaryFreeze = true;
    console.log(secondCard.type);
    checkForMatch();
    return;
};

const disableCards = function() {
    console.log("it was a match!");

    firstCard.freeze = true;
    firstCard.temporaryFreeze = false;

    secondCard.freeze = true;
    secondCard.temporaryFreeze = false;

    //firstCard.removeEventListener('click', flipCard);
    //secondCard.removeEventListener('click', flipCard);

    resetBoard(); //Reset all variables
    shuffleCards(); // After every succesfull turn, it will shuffle the remaining of the cards
    drawCards(); //Redraw all cards
}

const getCardObjectFromDom = function(element) {
    var currentCard = element.firstElementChild.firstElementChild.className;
    var foundIndex = cardsArray.findIndex(x => x.id == currentCard);
    return cardsArray[foundIndex];
}

const unflipCards = function() {
    console.log("no pair!");

    firstCard.temporaryFreeze = false;
    secondCard.temporaryFreeze = false;
    //lockBoard = true;

    //setTimeout(() => {
    //  firstCard.classList.remove('action-flip-card');
    //  secondCard.classList.remove('action-flip-card');
    //  firstCard.classList.remove('frozen');
    //  secondCard.classList.remove('frozen');
    //  resetBoard();
    //}, 1000);
    resetBoard(); //Reset all variables
}

const checkIfDone = function(){
    //TODO:check if match is done.
}

const checkForMatch = function() {
    let isMatch = firstCard.type == secondCard.type;
    isMatch ? disableCards() : unflipCards();
    checkIfDone();
}

const drawCards = function() {
    var allCurrentCardsInDom = document.getElementsByClassName('card');
    while(allCurrentCardsInDom[0]) {
        allCurrentCardsInDom[0].parentNode.removeChild(allCurrentCardsInDom[0]);
    };
    cardsArray.forEach(function(element) {
    var cardContainer = document.createElement('div')
        cardContainer.className = 'card';

        var cardFront = document.createElement('div')
        cardFront.className = 'card-front';

        var cardBack = document.createElement('div')
        cardBack.className = 'card-back';

        var cardBackObject = document.createElement('div')
        cardBackObject.className = element.id;

        cardBack.appendChild(cardBackObject);
        cardContainer.appendChild(cardBack);
        cardContainer.appendChild(cardFront);
        cardContainer.addEventListener('click', flipCard);
        document.getElementById("card-container").appendChild(cardContainer);
    });
};

shuffleCards(); //Shuffle all cards in the beginning
drawCards(); //Redraw all the cards









