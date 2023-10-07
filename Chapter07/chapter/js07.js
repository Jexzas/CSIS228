"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Chapter case   

      Word Cloud   Generator
      Author: Jesse Roberts
      Date:       10/7/23

      Filename:       js07.js
 */

document.querySelector("#getFile").onchange = function ()  {
      // Get file information
      let userFile = this.files[0];
      // Is text??
      try {
            let isText = userFile.type.startsWith("text");
            if (!isText) {
                  throw `${userFile.name} is not a text file`;
            }
      } catch (e) {
            window.alert(e);
      }

      function wordCloud(sourceText) {
            // Convert to lowercase and remove whitespace
            sourceText = sourceText.toLowerCase();
            sourceText = sourceText.trim();
            // alphabet and whitespace only regexp
            let alphaRegx = /[^a-zA-Z\s]/g;
            sourceText = sourceText.replace(alphaRegx, "");
            // remove stopwords
            for (let i = 0; i < stopWords.length; i++) {
                  let stopRegx = new RegExp("\\b"+stopWords[i]+"\\b", "g");
                  sourceText = sourceText.replace(stopRegx, "");
            }
            // make an array of the words
            let words = sourceText.split(/\s+/g);
            // sort words alphabetically
            words.sort();
            // 2d array containing duplicate counts
            let unique = [ [words[0], 1]];
            let uniqueIndex = 0;
            for (let i = 0; i < words.length; i++) {
                  if (words[i] === words[i-1]) {
                        // Increase duplicate count by 1
                  unique[uniqueIndex][1]++;
                  } else {
                        // Add to unique array
                        uniqueIndex++;
                        unique[uniqueIndex] = [words[i], 1];
                  }
            }

            // Sort desc duplicates
            unique.sort(byDuplicate);
            function byDuplicate(a, b) {
                  return b[1]-a[1];
            }

            // Keep top 100 words
            unique = unique.slice(0, 100);

            // find duplicates of most repeated word
            let maxCount = unique[0][1];
            // Sort alphabetically
            unique.sort();

            // Word cloud box
            let cloudBox = document.getElementById("wc_cloud");
            cloudBox.innerHTML = "";

            // Change word size based on how frequently it's used

            for (let i = 0; i < unique.length; i++) {
                  let word = document.createElement("span");
                  word.textContent = unique[i][0];
                  word.style.fontSize = unique[i][1]/maxCount + "em";
                  cloudBox.appendChild(word);
            }
      }

      
      // Read the selected file
      let fr = new FileReader();
      fr.readAsText(userFile);

      // If loaded, display file
      let sourceDoc = document.querySelector("#wc_document");
      fr.addEventListener("load", function() {
            sourceDoc.innerHTML = fr.result;
            let sourceText = sourceDoc.textContent;
            // word cloud time
            wordCloud(sourceText);
      })
}


























/*--- ----------------------------------------------*/
/* Array of words to NOT include in the word cloud */
/*-------------------------------------------------*/

let stopWords = ["a", "about", "above", "across", "after", "afterwards", "again", "against", 
                 "ago", "all", "almost", "alone", "along", "already", "also", "although", 
                 "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", 
                 "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", 
                 "are", "around", "as", "at", "back", "be", "became", "because", "become", 
                 "becomes", "becoming", "been", "before", "beforehand", "behind", "being", 
                 "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", 
                 "but", "by", "call", "came", "can", "cannot", "cant", "case","cases","cause", 
                 "co", "computer", "con", "could", "couldnt", "cry", "de", "describe", "detail", 
                 "do", "does", "doing", "done", "down", "due", "during", "each", "eg", "eight", 
                 "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", 
                 "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fie",
                 "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", 
                 "formerly", "forty", "found", "four", "from", "front", "full", "further", 
                 "get", "give", "go", "had", "has", "hasnt", "have", "he", "held", "having", 
                 "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", 
                 "herself", "him", "himself", "his", "how", "however", "hundred", "i", "ie", 
                 "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", 
                 "keep", "know", "knows", "knew", "last", "latter", "latterly", "least", "less", 
                 "let", "ltd", "made", "make","many", "may", "me", "meanwhile", "might", "mill", 
                 "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", 
                 "myself", "name", "namely", "neither", "never", "nevertheless", "next", 
                 "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", 
                 "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", 
                 "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", 
                 "own", "part", "per", "perhaps", "plainly", "please", "precisely", "put", 
                 "rather", "re", "same", "said", "say", "says", "see", "seem", "seemed", 
                 "seeming", "seems", "serious", "several", "shall", "she", "should", "show", 
                 "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", 
                 "something", "sometime", "sometimes", "somewhere", "st", "sts", "still", "such", 
                 "system", "take", "ten", "th", "ths", "thx", "than", "that", "the", "their", 
                 "them", "themselves", "then", "thence", "there", "thereafter", "thereby", 
                 "therefore", "therein", "thereupon", "these", "they", "thick", "thin", 
                 "third", "this", "those", "though", "three", "through", "throughout", 
                 "thru", "thus", "to", "together", "too", "top", "toward", "towards", 
                 "twelve", "twenty", "two", "un", "unless", "under", "until", "up", 
                 "upon", "us", "very", "via", "was", "we", "well", "were", "weve", "what", 
                 "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", 
                 "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", 
                 "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", 
                 "with", "within", "without", "would", "year", "years", "yet", "you", 
                 "your", "yours", "yourself", "yourselves"];
                 