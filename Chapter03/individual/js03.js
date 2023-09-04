/*    JavaScript 7th Edition
     Chapter 3
     Chapter case

     Tipton Turbines
     Program to display games results in a web table
     Author: Jesse Roberts
     Date:   9/4/23
     Please don't dock me points for string interpolation lol

     Filename: js03.js
 */

// days of the week
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Add Weekdays names to calendar
const addWeekdays = () => {
    let i = 0; // counter value

    // collect the headings
    let headingCells = document.getElementsByTagName("th");

    while (i < 7) {
        headingCells[i].innerHTML = weekdays[i];

        i++;
    }
}

// write games to calendar

function showGames() {
    for (let i = 0; i < gameDates.length; i++) {
        let gameInfo = "";

        switch(gameResults[i]) {
            case "W":
                gameInfo += "<p class='win'>";
                break;
            case "L":
                gameInfo += "<p class='lose'>";
                break;
            case "S":
                gameInfo += "<p class='suspended'>";
                break;
            case "P":
                gameInfo += "<p class='postponed'>";
                break;
            default:
                break;
        }

        // open paragraph
        gameInfo += "<p>";

        // game location
        if (gameLocations[i] === "h") {
            gameInfo += "vs. ";
        } else if (gameLocations[i] === "a") {
            gameInfo += "@ ";
        }

        // opponent
        gameInfo += `${gameOpponents[i]} <br>`;
        // results and score
        gameInfo += `${gameResults[i]}: (${runsScored[i]} - ${runsAllowed[i]})`;

        // display innings for suspended, shortened, overtime games
        if (gameInnings[i] < 5) {
            gameInfo += ` [${gameInnings[i]}]***`; 
        } else if(gameInnings[i] < 9) {
            gameInfo += ` [${gameInnings[i]}*]`;
        } else if(gameInnings[i] > 9) {
            gameInfo += ` [${gameInnings[i]}]`;
        } 

        // close paragraph
        gameInfo += "</p>";

        // write info to cells
        let tableCell = document.getElementById(gameDates[i]);
        tableCell.insertAdjacentHTML("beforeend", gameInfo);
    }
}



// event listeners after initializing functions or it'll give you an error
window.addEventListener("load", addWeekdays);
window.addEventListener("load", showGames);