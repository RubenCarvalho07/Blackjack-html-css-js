var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true;

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let Value = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let Type = ["s","h","d","c"]; 
    deck = [];
    for (let i = 0; i < Type.length; i++){
        for (let j = 0; j < Value.length; j++) {
            deck.push(Value[j]+"-"+Type[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random(0) * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame(){
    document.getElementById("Dealer-Cards").innerHTML = '<img id="hidden" src="Sources//back.png"\>'
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "Sources//"+card+".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("Dealer-Cards").append(cardImg);
    }
    for (let i = 0; i < 2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "Sources//"+card+".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("Your-Cards").append(cardImg);
        yourSum = reduceAce(yourSum, yourAceCount);
        document.getElementById("you").innerText = " You: "+ yourSum
    }
}

function getValue(card){
    let data = card.split("-");
    let value = data[0];
    if(isNaN(value)){
        if (value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card){
    if (card[0] == "A"){
        return 1;
    }
    return 0;
}

function hit(){
    if (!canHit){
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "Sources//"+card+".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("Your-Cards").append(cardImg);
    if (reduceAce(yourSum, yourAceCount) > 21){
        canHit = false;
    }
    yourSum = reduceAce(yourSum, yourAceCount);
    document.getElementById("you").innerText = " You: "+ yourSum
}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);
    canHit = false;
    let message = "";
    if (yourSum > 21){
        message = "Bust, You Lost!";
    }else if (dealerSum > 21){
        message = "You Won!"
    }else if (yourSum == dealerSum){
        message = "Draw!";
    }else if (yourSum > dealerSum){
        message = "You Won!";
    }else if (yourSum < dealerSum){
        message = "You Lost!";
    }
    if (yourSum <= 21){
        document.getElementById("hidden").src = "Sources//"+hidden+".png";
        document.getElementById("dealer").innerText = "Dealer: "+dealerSum
    }
    document.getElementById("you").innerText = " You: "+yourSum
    document.getElementById("results").innerText = message
    document.getElementById("restart").innerHTML = "<button onclick='location.reload()'>Restart</button>"
}

function reduceAce(playerSum, playerAceCount){
    while(playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}