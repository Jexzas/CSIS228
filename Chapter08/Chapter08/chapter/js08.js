"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Chapter case   

      Draw Poker Game using Object Oriented Programming
      Author: Jesse Roberts   
      Date: 10/21/23      

      Filename:       js08.js
 */

window.addEventListener("load", playDrawPoker);

function playDrawPoker() {
   // Reference buttons and images within the Poker Game page
   let dealButton = document.getElementById("dealB");
   let drawButton = document.getElementById("drawB");
   let standButton = document.getElementById("standB");
   let resetButton = document.getElementById("resetB");
   let statusBox = document.getElementById("status");
   let betSelection = document.getElementById("bet");
   let bankBox = document.getElementById("bank");
   let cardImages = document.querySelectorAll("img.cardImg");
   // set bank and bet values to default
   pokerGame.currentBank = 500;
   pokerGame.currentBet = 25;
   // create a shuffled deck
   let myDeck = new pokerDeck();
   myDeck.shuffle();
   // Empty hand
   let myHand = new pokerHand(5);
   // set bankbox equal to current bank
   bankBox.value = pokerGame.currentBank;
   // Event listener to change bet
   betSelection.addEventListener("change", (e) => {
      pokerGame.currentBet = parseInt(e.target.value);
   });
   dealButton.addEventListener("click", function() {
      if (pokerGame.currentBank >= pokerGame.currentBet) {
         // Enable the Draw and Stand buttons after the initial deal
         dealButton.disabled = true;        // Turn off the Deal button
         betSelection.disabled = true;      // Turn off the Bet Selection list
         drawButton.disabled = false;       // Turn on the Draw button
         standButton.disabled = false;      // Turn on the Stand Button
         statusBox.textContent = "";        // Erase any status messages
         // Reduce bank by bet
         pokerGame.currentBank = pokerGame.placeBet();
         bankBox.value = pokerGame.currentBank;
         // Get new deck if there are less than ten cards
         if (myDeck.cards.length < 10) {
            myDeck = new pokerDeck();
            myDeck.shuffle();
         }  
         myDeck.dealTo(myHand);
         // Display card images on table 
         for (let i = 0; i < cardImages.length; i++){
            cardImages[i].src = myHand.cards[i].cardImage();
               // flip card
            cardImages[i].addEventListener("click", function() {
               if (this.src.includes("cardback.png")) {
                  //Show front
                  this.src = myHand.cards[i].cardImage();
               } else {
                  //Show back
                  this.src = "cardback.png";
               }
            });
         }  
       } else {
         statusBox.textContent = "InsufficientFunds";
       };
   });
   
   
   drawButton.addEventListener("click", function() {
      // Enable the Deal and Bet options when the player chooses to draw new cards
      dealButton.disabled = false;        // Turn on the Deal button
      betSelection.disabled = false;      // Turn on the Bet Selection list
      drawButton.disabled = true;         // Turn off the Draw button
      standButton.disabled = true;        // Turn off the Stand Button
      // Replace discarded cards
      for (let i = 0; i < cardImages.length; i++) {
         if (cardImages[i].src.includes("cardback.png")) {
            myHand.replaceCard(i, myDeck);
            cardImages[i].src = myHand.cards[i].cardImage();
         }
      }
      // evaluate hand for winnings
      statusBox.textContent = myHand.getHandValue();
      // Update bank value
      bankBox.value = pokerGame.payBet(statusBox.textContent);
   });
   
    
   standButton.addEventListener("click", function() {
      // Enable the Deal and Bet options when the player chooses to stand with their hand 
      dealButton.disabled = false;        // Turn on the Deal button
      betSelection.disabled = false;      // Turn on the Bet Selection list
      drawButton.disabled = true;         // Turn off the Draw button
      standButton.disabled = true;        // Turn off the Stand Button  
      // Evaluate hand 
      statusBox.textContent = myHand.getHandValue();
      bankBox.value = pokerGame.payBet(statusBox.textContent);

   });
   
   
   // Reload the current page when the Reset button is clicked
   resetButton.addEventListener("click", function() {
      location.reload();
   });
}