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
        if (Math.random() > 0.7) { //30% of the first flips it will shuffle all available cards
            shuffle();
        }
        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('anti-shuffle');
    secondCard.classList.add('anti-shuffle');
    shuffle(); // After every succesfull turn, it will shuffle the remaining of the cards
}

function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('action-flip-card');
      secondCard.classList.remove('action-flip-card');
  
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
    cards.forEach(card => {
        if (!card.classList.contains('anti-shuffle')) {
            let randomPos = Math.floor(Math.random() * 18);
            card.style.order = randomPos;
        }
      
    });
  }


cards.forEach(card => card.addEventListener('click', flipCard));
shuffle(); // Shuffle in the beginning