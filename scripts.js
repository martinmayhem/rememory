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
    resetBoard();
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
    shuffle();
}

function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  }


cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();