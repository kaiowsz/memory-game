const techs = ['bootstrap', 'css', 'electron', 'firebase', 'html', 'javascript', 'jquery', 'mongo', 'node', 'react']

startGame()



function startGame() {
    let firstShuffle = [...techs]
    firstShuffle = shuffle(firstShuffle)
    
    let secondShuffle = [...firstShuffle]
    secondShuffle = shuffle(secondShuffle)
    
    createCard(firstShuffle)
    createCard(secondShuffle)
}

function shuffle(cards) {
    let index = cards.length
    let randomIndex = 0;
    while (index !== 0) {
        randomIndex = Math.floor(Math.random() * index)

        index--
        [cards[randomIndex], cards[index]] = [cards[index], cards[randomIndex]]
    }

    return cards
}



function createCard(cards) {

    cards.forEach(card => {
        const board = document.getElementById('board')

        const cardHTML = document.createElement('div')
        cardHTML.classList.add('card')
        
        const cardInner = `<div class="card-front">
        <img src="images/bootstrap.png" alt="bootstrap image">
        </div>
        <div class="card-back">
        &lt;/&gt;
        </div>`
        cardHTML.innerHTML = cardInner

        cardHTML.querySelector('.card-front img').src = `./images/${card}.png`

        cardHTML.querySelector('.card-front img').alt = card

        cardHTML.onclick = () => {
            inspectCard(cardHTML)


            cardHTML.classList.add('flip')
        }

        board.append(cardHTML)
    })
}

// game logic

let cardOne
let cardTwo
let numberClickeds = 0
let cardOneElement
let cardTwoElement
let cardsOpen = 0;


function inspectCard(event) {
    if (event.classList.length == 1) {
        numberClickeds++
        if (numberClickeds == 1) {
            cardOneElement = event
            cardOne = event.querySelector('.card-front img').alt
        } 
        
        if (numberClickeds == 2) {
            cardTwoElement = event
            cardTwo = event.querySelector('.card-front img').alt
        }
    }
    if (event.classList.length > 1) {
        console.log('Card already clicked.')
    }

    if (cardOne == undefined || cardTwo == undefined) {
        return
    }

    if (cardOne == cardTwo) {
        cardOne = undefined
        cardTwo = undefined
        cardOneElement = undefined
        cardTwoElement = undefined
        numberClickeds = 0
        cardsOpen++

        // cardsOpen == 10 -> 10 matches of cards. winner.

        if (cardsOpen == 10) {
            cardsOpen = 0;
            openModal()
        }
    }

    if (cardOne != cardTwo) {
        comebackCards(cardOneElement, cardTwoElement)
        cardOne = undefined
        cardTwo = undefined
        cardOneElement = undefined
        cardTwoElement = undefined
        numberClickeds = 0
    }
}

function comebackCards(cardOneElement, cardTwoElement) {

    setTimeout(() => {    
        cardOneElement.classList.remove('flip')
        cardTwoElement.classList.remove('flip')
    }, 1000);


}

function openModal() {
    let modal = document.querySelector('.modal')
    let button = document.querySelector('.restart')

    button.addEventListener('click', restartGame)

    setTimeout(() => {
        modal.classList.remove('off')
    }, 100);
}


function clearCards() {
    const board = document.querySelector('#board')

    board.querySelectorAll('.card').forEach(card => {
        card.remove()
    })
}

function closeModal() {
    let modal = document.querySelector('.modal')
    modal.classList.add('off')
}

function restartGame() {
    clearCards()
    startGame()
    closeModal()
}