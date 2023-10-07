"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Project 07-01

      Project to validate a form used for setting up a new account
      Author: Jesse Roberts
      Date: 10/7/23   

      Filename: project07-01.js
*/

let signupForm = document.getElementById("signup");

signupForm.addEventListener("submit", function(e) { 
      let pwd = document.getElementById("pwd").value;
      let feedback = document.getElementById("feedback");
      let regex1 = new RegExp("[A-Z]");
      let regex2 = new RegExp("[0-9]");
      let regex3 = new RegExp("[#\$!%]");

      if (pwd.length < 8) {
            e.preventDefault();
            feedback.textContent = "Your password must be at least 8 characters.";
      } else if (!regex1.test(pwd)) {
            e.preventDefault();
            feedback.textContent = "Your password must include an uppercase letter.";
      } else if (!regex2.test(pwd)) {
            e.preventDefault();
            feedback.textContent = "Your password must include a number.";
      } else if (!regex3.test(pwd)) {
            e.preventDefault();
            feedback.textContent = "Your password must include one of the following: !$#%";
      } else {
            signupForm.submit();
      }
}
);