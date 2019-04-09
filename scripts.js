const cards = Array.from(document.querySelectorAll('.card'))

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
        /*if (Math.random() > 0.7) { //30% of the first flips it will shuffle all available cards
            shuffle();
        }*/
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
    var usedNumbers = new Array(17).fill(false);
    cards.forEach(card => {
        if (card.classList.contains('frozen') || card.classList.contains('frozenTemporary')) {
            return false;
        }
        while (true) {
            let randomPos = Math.floor(Math.random() * 18);
            if(!cards[randomPos].classList.contains('frozen') || !cards[randomPos].classList.contains('frozenTemporary') || !usedNumbers[randomPos]) {
                var currentOrder = card.style.order;

                cards[randomPos].style.order = card.style.order; 
                card.style.order = currentOrder;

                card.classList.add('frozenTemporary');
                cards[randomPos].classList.add('frozenTemporary');

                usedNumbers[randomPos] = true;
                break;
            }
        }
    });
    cards.forEach(card => card.classList.remove('frozenTemporary'));
  }

  function shuffleFirstTime() {
    var usedNumbers = new Array(17).fill(false);
    cards.forEach(card => {
        while (true) {
            let randomPos = Math.floor(Math.random() * 18);
            if(!usedNumbers[randomPos]) {
                card.style.order = randomPos;
                usedNumbers[randomPos] = true;
                break;
            }
        }
    });
  }


cards.forEach(card => card.addEventListener('click', flipCard));
shuffleFirstTime(); // Shuffle in the beginning