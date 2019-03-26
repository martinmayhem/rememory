const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('action-flip-card');
    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        firstCard.classList.add('frozen');
        if (Math.random() > 0.7) { //30% of the first flips it will shuffle all available cards
            shuffle();
        }
        return;
    }

    // second click
    secondCard = this;
    secondCard.classList.add('frozen');

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('frozen');
    secondCard.classList.add('frozen');
    resetBoard();
    shuffle(); // After every succesfull turn, it will shuffle the remaining of the cards
}

function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('action-flip-card');
      secondCard.classList.remove('action-flip-card');
      firstCard.classList.remove('frozen');
      secondCard.classList.remove('frozen');
      resetBoard();
    }, 1000);
}
  
function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function shuffle() {

    let shuffledCards = document.querySelectorAll('.frozen');
    const shuffledCardsArray = Array.from(shuffledCards)
    let flag = false;
    cards.forEach(card => {
        if (!shuffledCardsArray.includes(card)) {

            do {
                let randomPos = Math.floor(Math.random() * 18);

                if (shuffledCardsArray.length == 0){
                    break;
                }

                shuffledCardsArray.forEach(shuffleCard => { //TODO: Fel sätt att få order
                    shuffleCard.style.order != randomPos ? flag = true : flag = false;
                    //TODO: när man inte har en position
                })
                if (flag) {
                    break;
                }
            } while(false);

            card.style.order = randomPos;
            shuffledCardsArray.add(card);
        }
    });

    /*
    cards.forEach(card => {
        if (!card.classList.contains('frozen') || !card.classList.contains('frozenTemporary')) {
            while(true) {
                let randomPos = Math.floor(Math.random() * 18);
                if (!frozenCards.includes(randomPos)) { //PROBLEM: Jämnför med positioner
                    break;
                }
            }
            //PROBLEM: Detta borde inte funka, jag måste lägga in dessa i frozenCards, eller döpa om till shuffledCards
            card.style.order = randomPos;
            shuffledCards.add(card);
        }
    });
    */
    
    //shuffledCards = null;
  }


cards.forEach(card => card.addEventListener('click', flipCard));
shuffle(); // Shuffle in the beginning