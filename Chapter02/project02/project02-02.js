/*    JavaScript 7th Edition
      Chapter 2
      Project 02-02

      Application to test for completed form
      Author: Jesse Roberts
      Date:   8/30/23

      Filename: project02-02.js
 */
 
// function to verify form fields are filled
const verifyForm = () => {
      // using different methods to get the id 
      let name = document.querySelector("#name").value;
      let email = document.getElementById("email").value; 
      let phone = document.querySelector("#phone").value;
      name && email && phone ? window.alert("Thank you!") : window.alert("Please fill in all fields");
}

// attach verification to the submit button
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", verifyForm);