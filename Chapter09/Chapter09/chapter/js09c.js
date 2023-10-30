"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Chapter case
      
      Eating Well in Season Retrieving Data from Local Storage
      Author: Jesse Roberts 
      Date:   10/29/23
      
      Filename: js09c.js
 */

// Preference keys
let keys = ["name", "email", "phone", "address", "city", "state", "zip", "allergies", "frequency", "size"]
for (let item of keys) {
      let newRow = document.createElement("tr");
      // display storage key
      let keyCell = document.createElement("td");
      keyCell.textContent = item;
      newRow.appendChild(keyCell);
      // display key value
      let keyValue = document.createElement("td");
      keyValue.textContent = localStorage.getItem(item);
      newRow.appendChild(keyValue);
      //Append key value pairs
      document.getElementById("prefTable").appendChild(newRow);
}

// Removing all keys when remove preference is clicked
document.getElementById("removePrefBtn").addEventListener("click", () => {
      for (let i of keys) {
            localStorage.removeItem(i);
      }
})
