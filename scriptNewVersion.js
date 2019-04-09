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
let firstCardId, secondCardId, firstCardType, secondCardType;

const resetBoard = function() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCardId = null;
    secondCardId = null;
    firstCardType = null;
    secondCardType = null;
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
    var currentCard = this.firstElementChild.firstElementChild.className;
    if (currentCard === firstCardId) return;
    this.classList.add('action-flip-card')
    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCardId = currentCard;
        var foundIndex = cardsArray.findIndex(x => x.id == currentCard);
        cardsArray[foundIndex].temporaryFreeze = true;
        firstCardType = cardsArray[foundIndex].type;
        /*if (Math.random() > 0.7) { //30% of the first flips it will shuffle all available cards
            shuffle();
        }*/
        console.log(firstCardType);
        return;
    }

    // second click
    secondCardId = currentCard;
    var foundIndex = cardsArray.findIndex(x => x.id == currentCard);
    cardsArray[foundIndex].temporaryFreeze = true;
    secondCardType = cardsArray[foundIndex].type;
    console.log(secondCardType);
    checkForMatch();
    return;
};

const disableCards = function() {
    console.log("it was a match");

    var foundIndexFirstCard = cardsArray.findIndex(x => x.id == firstCardId);
    cardsArray[foundIndexFirstCard].freeze = true;
    cardsArray[foundIndexFirstCard].temporaryFreeze = false;

    var foundIndexSecondCard = cardsArray.findIndex(x => x.id == secondCardId);
    cardsArray[foundIndexSecondCard].freeze = true;
    cardsArray[foundIndexSecondCard].temporaryFreeze = false;

    //firstCard.removeEventListener('click', flipCard);
    //secondCard.removeEventListener('click', flipCard);

    resetBoard(); //Reset all variables
    shuffleCards(); // After every succesfull turn, it will shuffle the remaining of the cards
    drawCards(); //Redraw them to the new order
}

const unflipCards = function() {
    console.log("unflipCards");

    var foundIndexFirstCard = cardsArray.findIndex(x => x.id == firstCardId);
    cardsArray[foundIndexFirstCard].temporaryFreeze = false;

    var foundIndexSecondCard = cardsArray.findIndex(x => x.id == secondCardId);
    cardsArray[foundIndexSecondCard].temporaryFreeze = false;
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
    let isMatch = firstCardType == secondCardType;
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

shuffleCards();
drawCards();









