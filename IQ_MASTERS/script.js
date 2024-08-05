let cardsArray = [
    {
        'name': 'CSS',
        'img': 'image/css.png',
    },
    {
        'name': 'HTML',
        'img': 'image/html.jpg',
    },
    {
        'name': 'boostrap',
        'img': 'image/bootstrap.png',
    },
    {
        'name': 'JS',
        'img': 'image/javascript.png',
    },
    {
        'name': 'react.js',
        'img': 'image/react.png',
    },
    {
        'name': 'Python',
        'img': 'image/python.png',
    },
    {
        'name': 'angular',
        'img': 'image/angular.png',
    },
    {
        'name': 'java',
        'img': 'image/java.png',
    },
];

const CreateDiv = document.querySelector("#card_selection");

// Combine two arrays to make pairs
const game_card = cardsArray.concat(cardsArray);

// Shuffle cards
const shuffle_card = Array.from(game_card).sort(() => 0.5 - Math.random());

let clickCount = 0;
let firstCard = "";
let secondCard = "";

// Function to mark matched cards
const card_matches = () => {
    let card_selected = document.querySelectorAll('.card_selected');
    card_selected.forEach((Element) => {
        Element.classList.add('card_match');
        
        // *Change #1:* Disable the divs of matched cards
        Element.style.pointerEvents = 'none'; // Disable click on matched cards
    });
}

// Function to reset the game logic for unmatched cards
const resetgame = () => {
    firstCard = "";
    secondCard = "";
    clickCount = 0;

    let card_selected = document.querySelectorAll('.card_selected');
    card_selected.forEach((Element) => {
        Element.classList.remove('card_selected');
    });
}

// Event listener for card clicks
CreateDiv.addEventListener('click', (evt) => {
    let curCard = evt.target;

    // Prevent clicks on the main container
    if (curCard.id === "card_selection") { return false; }

    clickCount++;
    if (clickCount < 3) {

        if (clickCount === 1) {
            // Store the name of the first card
            firstCard = curCard.parentNode.dataset.name;
            curCard.parentNode.classList.add('card_selected');

        } else {
            // Store the name of the second card
            secondCard = curCard.parentNode.dataset.name;
            curCard.parentNode.classList.add('card_selected');
        }
        if (firstCard !== "" && secondCard !== "") {

            if (firstCard === secondCard) {
                setTimeout(() => {
                    card_matches();  // Mark cards as matched and disable them
                    resetgame();     // Reset game state
                }, 1000);
            } else {
                setTimeout(() => {
                    resetgame();     // Just reset if cards don't match
                }, 1000);
            }
        }
    }
});

// Create cards and add them to the DOM
for (let i = 0; i < shuffle_card.length; i++) {
    const childDiv = document.createElement('div');
    childDiv.classList.add('card');
    childDiv.dataset.name = shuffle_card[i].name;

    const front_div = document.createElement('div');
    front_div.classList.add('front-card');

    const back_div = document.createElement('div');
    back_div.classList.add('back-card');
    back_div.style.backgroundImage = `URL(${shuffle_card[i].img})`;

    CreateDiv.appendChild(childDiv);
    childDiv.appendChild(front_div);
    childDiv.appendChild(back_div);
}