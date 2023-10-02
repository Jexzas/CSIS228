"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: Jesse Roberts
      Date:   09/29/23

      Filename: js06b.js
 */

let subButton = document.getElementById("subButton");
// validate payment on submit
subButton.addEventListener("click", validateName);
subButton.addEventListener("click", validateCard);
subButton.addEventListener("click", validateNumber);
subButton.addEventListener("click", validateMonth);
subButton.addEventListener("click", validateYear);
subButton.addEventListener("click", validateCVC);
// check if owner's name is entered on the cardfunction

function validateName() {
   let cardName = document.querySelector("#cardName");
   cardName.validity.valueMissing ? cardName.setCustomValidity("Enter your name as it apperas on the card") : cardName.setCustomValidity("");
}

function validateCard() {
   let card = document.forms.payment.elements.credit[0];
   if (card.validity.valueMissing) {
      card.setCustomValidity("Select your credit card");
   } else {
      card.setCustomValidity("");
   }
}

function validateNumber() {
   let cNumber = document.querySelector("#cardNumber");
   if (cNumber.validity.valueMissing) {
      cNumber.setCustomValidity("Enter your card number");
   } else if (cNumber.validity.patternMismatch) {
      cNumber.setCustomValidity("Enter a valid card number");
   } else if (luhn(cNumber.value) === false) {
      cNumber.setCustomValidity("Enter a legitimate card number");
   } else {
      cNumber.setCustomValidity("");
   }
}

function validateMonth() {
   let month = document.getElementById("expMonth");
   if (!month.value) {
      month.setCustomValidity("Pick a month");
   } else {
      month.setCustomValidity("");
   }
}

function validateYear() {
   let year = document.getElementById("expYear");
   if (!year.value) {
      year.setCustomValidity("Pick a year");
   } else {
      year.setCustomValidity("");
   }
}

function validateCVC() {
   let card = document.querySelector('input[name="credit"]:checked').value;
   let cvc = document.getElementById("cvc");

   if (cvc.validity.valueMissing) {
      cvc.setCustomValidity("Enter your CVC number");
   }

   // I didn't know that we'd only have two options when I decided to write a switch

   switch (card) {
      case "amex":
         if (!(/^\d{4}$/.test(cvc.value))) {
            cvc.setCustomValidity("Enter a 4-digit number for American Express");
         } else {
            cvc.setCustomValidity("");
         }
         break;
      case "discover":
      case "master":
      case "visa":
         if (!(/^\d{3}$/.test(cvc.value))) {
            cvc.setCustomValidity("Enter a 3-digit number");
         } else {
            cvc.setCustomValidity("");
         }
      default:
         break;
   }
}

/* ------- Luhn Algorithm used for Validating Credit Card Numbers   ----- */

function luhn(idNum) {
   let string1 = "";
   let string2 = "";
   
   // Retrieve the odd-numbered digits starting from the back
   for (let i = idNum.length - 1; i >= 0; i-= 2) {
      string1 += idNum.charAt(i);
   }
   // Retrieve the even-numbered digits starting from the back and double them
   for (let i = idNum.length - 2; i >= 0; i-= 2) {
      string2 += 2*idNum.charAt(i);
   }
   
   // Return whether the sum of the digits is divisible by 10
   return sumDigits(string1 + string2) % 10 === 0;
   
   function sumDigits(numStr) {
      let digitTotal = 0;
      for (let i = 0; i < numStr.length; i++) {
         digitTotal += parseInt(numStr.charAt(i));
      }
      return digitTotal;
   }
}
   

