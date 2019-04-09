var card0  = {id: 0, freeze: false, temporaryFreeze: false };
var card1  = {id: 1, freeze: false, temporaryFreeze: false };
var card2  = {id: 2, freeze: false, temporaryFreeze: false };
var card3  = {id: 3, freeze: false, temporaryFreeze: false };
var card4  = {id: 4, freeze: false, temporaryFreeze: false };
var card5  = {id: 5, freeze: false, temporaryFreeze: false };
var card6  = {id: 6, freeze: false, temporaryFreeze: false };
var card7  = {id: 7, freeze: false, temporaryFreeze: false };
var card8  = {id: 8, freeze: false, temporaryFreeze: false };

var card9  = {id: 9, freeze: false, temporaryFreeze: false };
var card10  = {id: 10, freeze: false, temporaryFreeze: false };
var card11  = {id: 11, freeze: false, temporaryFreeze: false };
var card12  = {id: 12, freeze: false, temporaryFreeze: false };
var card13  = {id: 13, freeze: false, temporaryFreeze: false };
var card14  = {id: 14, freeze: false, temporaryFreeze: false };
var card15  = {id: 15, freeze: false, temporaryFreeze: false };
var card16  = {id: 16, freeze: false, temporaryFreeze: false };
var card17  = {id: 17, freeze: false, temporaryFreeze: false };

var cardsArray = [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17 ];

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

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const drawCards = function() {
    cardsArray.forEach(function(element, index) {
    var cardContainer = document.createElement('div')
        cardContainer.className = 'card';

        var cardFront = document.createElement('div')
        cardFront.className = 'card-front';

        var cardBack = document.createElement('div')
        cardBack.className = 'card-back';

        var cardBackObject = document.createElement('div')
        cardBackObject.className = 'card-' + index;

        cardBack.appendChild(cardBackObject);
        cardContainer.appendChild(cardBack);
        cardContainer.appendChild(cardFront);
        document.getElementById("container").appendChild(cardContainer);
    });
};

shuffleCards();
drawCards();









