"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-01

      Project to create a timer object
      Author: Jesse Roberts
      Date:   10/21/23

      Filename: project08-01.js
*/

/*--------------- Object Code --------------------*/
function timer(min, sec) {
      this.minutes = min;
      this.seconds = sec;
      this.timeID = null;
}

timer.prototype.runPause = function(minBox, secBox) {
      if (this.timeID != null) {
            window.clearInterval(this.timeID);
            this.timeID = null;
      } else {
            this.timeID = window.setInterval(() => this.countDown(minBox, secBox), 1000);
      }
}

timer.prototype.countDown = function(minBox, secBox) {
      if (this.seconds > 0) {
            this.seconds--;
      } else if (this.minutes > 0) {
            this.minutes--;
            this.seconds = 59;
      } else {
            window.clearInterval(this.timeID);
            this.timeID = null;
      }
      minBox.value = this.minutes;
      secBox.value = this.seconds;

}

/*---------------Interface Code -----------------*/

/* Interface Objects */
let minBox = document.getElementById("minutesBox");
let secBox = document.getElementById("secondsBox");
let runPauseTimer = document.getElementById("runPauseButton");

let myTimer = new timer(parseInt(minBox.value), parseInt(secBox.value));

minBox.addEventListener("change", function () {
      myTimer.minutes = minBox.value;
});

secBox.addEventListener("change", function () {
      myTimer.seconds = secBox.value;
})

runPauseTimer.addEventListener("click", function () {
      myTimer.runPause( minBox, secBox);
})