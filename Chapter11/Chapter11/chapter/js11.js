"use strict";
/*
   JavaScript 7th Edition
   Chapter 11
   Chapter Case

   Author:   Jesse Roberts 
   Date:     11/6/23 

   Filename: js11.js


*/

window.addEventListener("load", init);

function init() {
   // Page Objects
   let stories = document.getElementById("stories");
   let news = document.getElementById("news");
   let sInput = document.getElementById("sInput");
   let sButton = document.getElementById("sButton"); 
   let suggestBox = document.getElementById("suggestBox");    
   // Create a request object
   const xhr = new XMLHttpRequest();
   // open request and send it
   xhr.open("get", "commentary.html");
   xhr.send(null);
   // Retrieve archived articles from the web server
   sButton.addEventListener("click", () => {
      fetch("archives.pl?skey=" + encodeURIComponent(sInput.value))
       .then(response => {
         if (response.ok) {
            console.log(response);
            return response.text();
         } else {
            return "Unable to retrieve commentary";
         }
       })
       .then(comtext => stories.innerHTML = comtext)
       .then(() => {
         let topic = sInput.value.toLowerCase();
         getGIF(topic);
       })
       .catch(stories.innerHTML = "Network Failure");
   })
   // Fetch current headlines
   fetch("headlines.xml")
      .then (response => response.text())
      .then (str => new DOMParser().parseFromString(str, "text/xml"))
      // Write the xml content to the html
      .then (dom => {
         let items = dom.querySelectorAll("item");
         // loop
         for (let story of items) {
            // append story to page
            let headline = story.children[0].textContent;
            let link = story.children[1].textContent;
            let summary = story.children[2].textContent;
            let htmlCode = `<article><h2><a href="${link}">${headline}</h2>
            <p>${summary}</p></article>`;
            news.insertAdjacentHTML("beforeend", htmlCode);
         }
      })
      //suggest keywords as text is entered
      sInput.onkeyup = () => {
         if (sInput.value === "") {
            suggestBox.style.display = "none";
         } else {
            // Retrieve list of matching keywords
            fetch("keywords.pl?suggest=" + encodeURIComponent(sInput.value))
               .then (response => response.json())
               .then (keywords => {
                  suggestBox.innerHTML = "";
                  if (keywords.matches.length === 0) {
                     // no suggestions
                     suggestBox.style.display = "none";
                  } else {
                     // Display suggestions
                     suggestBox.style.display = "block";
                     // create suggestions
                     for (let word of keywords.matches) {
                        let suggestion = document.createElement("div");
                        suggestion.textContent = word;
                        suggestBox.appendChild(suggestion);
                        // Add suggestion when clicked
                        suggestion.onclick = () => {
                           sInput.value = word;
                           suggestBox.style.display = "none";
                           sButton.click();
                        }
                     }
                  }
               })
         }
      }
   // Handle the changing request state
   xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
         if (xhr.status >= 200 && xhr.status < 300) {
            //manage the response
            stories.innerHTML = xhr.responseText;
            console.log("proof");
         } else {
            console.log("Request failed: " + xhr.statusText);
         }
      }
   }
 
}

// fetch gif 
async function getGIF(topic) {
   const url = "https://api.giphy.com/v1/gifs/random";
   const key = "VE4YB6nnb9RPEFQ8u7d7MqkbAlXT13US";
   await fetch(`${url}?api_key=${key}&tag=${topic}&limit=1&rating=pg`)
      .then(response => response.json())
      .then(obj => {
         let newImg = document.createElement("img");
         newImg.src = obj.data.images.fixed_height.url;
         stories.appendChild(newImg)
      })

}