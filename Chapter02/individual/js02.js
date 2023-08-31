/*    JavaScript 7th Edition
      Chapter 2
      Chapter case

      Fan Trick Fine Art Photography
      Variables and functions
      Author: Jesse Roberts
      Date:   8/30/23

      Filename: js02.js
 */

// declare constants

const EMP_COST = 100; // cost of photographers per hour
const BOOK_COST = 350; // cost of memory book
const REPRO_COST = 1250; // cost of reproduction rights for the images
const TRAVEL_COST = 2; // cost per mile travel

// initial setup of form
// using variable syntax for no particular reason other than to show I'm engaging with the material lol

const setupForm = () => {
      document.getElementById("photoNum").value = 1;
      document.getElementById("photoHrs").value = 2;
      document.getElementById("makeBook").checked = false;
      document.getElementById("photoRights").checked = false;
      document.getElementById("photoDist").value = 0;
      getEstimate();
}

// estimate the total cost of the service

const getEstimate = () => {
      let totalCost = 0;
      let photographers = document.getElementById("photoNum").value;
      let hours = document.getElementById("photoHrs").value;
      let distance = document.getElementById("photoDist").value;

      // cost of photographers by hours
      totalCost+= photographers * hours * EMP_COST;
      // cost of distance per photographer per mile
      totalCost+= photographers * distance * TRAVEL_COST;
      // cost of memory book
      let buyBook = document.getElementById("makeBook").checked;
      if (buyBook) {
            totalCost+= BOOK_COST;
      }
      // cost of photo rights
      let photoRights = document.getElementById("photoRights").checked;
      photoRights ? totalCost+= REPRO_COST : 0;

      // display the total cost estimate
      document.getElementById("estimate").innerHTML = `$${totalCost}`;
}

// load the setup function when the page loads completely

window.addEventListener("load", setupForm);

// load the estimate function when change 

document.addEventListener("change", getEstimate);