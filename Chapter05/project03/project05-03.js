"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-03

      Project to create a table of headings from an article
      Author: Jesse Roberts
      Date:   9/21/23

      Filename: project05-03.js
*/

let sourceDoc = document.querySelector("#source_doc");
let toc = document.getElementById("toc");
let headingCount = 1;
const heading = "H2";

// create array for counting the number of h2s 
let numHeadings = document.getElementsByTagName("h2");

for (let i = 0; i < numHeadings.length; i++) {
      if (numHeadings[i].nodeName == heading) {
            let anchor = document.createElement("a");
            anchor.name = "doclink" + headingCount;
            let parent = numHeadings[i].parentNode;
            parent.insertBefore(anchor, numHeadings[i]);
            let listItem = document.createElement("li")
            let link = document.createElement("a");
            listItem.appendChild(link);
            link.textContent = numHeadings[i].textContent;
            link.href = `#doclink${headingCount}`;
            toc.appendChild(listItem);
            headingCount++;    
      }
}
