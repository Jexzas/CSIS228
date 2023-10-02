"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Project 06-01

      Project to validate a form used for setting up a new account
      Author: Jesse Roberts
      Date:   9/29/23

      Filename: project06-01.js
*/

let submitButton = document.querySelector("#submitButton");
let pwd = document.querySelector("#pwd");
let pwd2 = document.querySelector("#pwd2");

console.log(pwd.checkValidity());

submitButton.addEventListener("click", () => {
      if (pwd.checkValidity() == false) {
            pwd.setCustomValidity("Your password must be at least 8 characters with at least one letter and one number.");
      } else {
            pwd.setCustomValidity("");
      }
      if (pwd2.value !== pwd.value) {
            pwd2.setCustomValidity("Your passwords must match.");
      } else {
            pwd2.setCustomValidity("");
      }
})