"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Chapter case
      
      Eating Well in Season 
      Author: Jesse Roberts
      Date: 10/29/23
      
      Filename: js09b.js
 */

// Get the query ??? 
let qString = location.search.slice(1);
// decode the query
qString = qString.replace(/\+/g, " ");
qString = decodeURIComponent(qString);

// create individual components from the key value pairs in the url
let formData = qString.split(/&/g);
for (let items of formData) {
      // get names and values
      let fieldValuePair = items.split(/=/);
      let fieldName = fieldValuePair[0];
      let fieldValue = fieldValuePair[1];
      // Create label for field names
      let fieldLabel = document.createElement("label");
      fieldLabel.textContent = fieldName;
      document.getElementById("contactInfo").appendChild(fieldLabel);
      // Disabled input box with the field value
      let inputBox = document.createElement("input");
      inputBox.id = fieldName;
      inputBox.name = fieldName;
      inputBox.value = fieldValue;
      inputBox.disabled = true;
      document.getElementById("contactInfo").appendChild(inputBox);
}

// Store data to local storage when the user signs up
document.getElementById("signupBtn").addEventListener("click", () => {
      // save data to local storage
      let formFields = document.querySelectorAll("#contactInfo input, input[type=radio], textarea");
      for (let fields of formFields) {
            localStorage.setItem(fields.name, fields.value);
      }
})
console.log(localStorage);