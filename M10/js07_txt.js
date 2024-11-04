"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Chapter case   

      Word Cloud Generator
      Author: Wolfgang Meyer
      Date: 10-29-24       

      Filename:       js07.js
 */

document.getElementById("getFile").onchange = function() {
    let userFile = this.files[0];
    try {
        let isText = userFile.type.startsWith("text");
        if (!isText) {
            throw userFile.name + " is not a text file";
        }

        let fr = new FileReader();

        fr.onload = function() {
            let sourceDoc = document.getElementById("wc_document");
            sourceDoc.innerHTML = fr.result;
            let sourceText = sourceDoc.textContent;
            wordCloud(sourceText);
        };

        fr.readAsText(userFile);
    } catch (error) {
        // Handle the error by displaying it in an HTML element or alert
        alert(error);
    }

    function wordCloud(sourceText) {
        sourceText = sourceText.toLowerCase();
        sourceText = sourceText.trim();
        let alphaRegx = /[^a-zA-Z\s]/g;
        sourceText = sourceText.replace(alphaRegx, " ");

        // Define the stop words array
        let stopWords = [
            "a", "about", "above", "across", "after", "afterwards", "again", "against", "ago",
            "all", "almost", "alone", "along", "already", "also", "although", "always", "am",
            "among", "amongst", "amount", "an", "and", "another", "any", "anyhow", "anyone",
            "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became",
            "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind",
            "being", "below", "beside", "besides", "between", "beyond", "both", "but", "by",
            "can", "cannot", "could", "did", "do", "does", "doing", "done", "down", "each", "eg",
            "either", "else", "elsewhere", "enough", "etc", "even", "ever", "every", "everyone",
            "everything", "everywhere", "except", "few", "for", "former", "formerly", "from",
            "further", "had", "has", "have", "having", "he", "hence", "her", "here", "hereafter",
            "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how",
            "however", "i", "if", "in", "inc", "indeed", "into", "is", "it", "its", "itself", "just",
            "keep", "last", "latter", "latterly", "least", "less", "made", "make", "many", "may",
            "me", "meanwhile", "might", "more", "moreover", "most", "mostly", "much", "must", "my",
            "myself", "namely", "neither", "never", "nevertheless", "next", "no", "nobody", "none",
            "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once",
            "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves",
            "out", "over", "own", "part", "per", "perhaps", "please", "put", "rather", "re", "same",
            "see", "seem", "seemed", "seeming", "seems", "several", "she", "should", "since", "so",
            "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still",
            "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "thence",
            "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they",
            "this", "those", "though", "through", "throughout", "thru", "thus", "to", "together",
            "too", "toward", "towards", "under", "until", "up", "upon", "us", "very", "was", "we",
            "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter",
            "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while",
            "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within",
            "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves"
        ];

        // Remove stop words from the source text
        for (let i = 0; i < stopWords.length; i++) {
            let stopRegx = new RegExp("\\b" + stopWords[i] + "\\b", "g");
            sourceText = sourceText.replace(stopRegx, "");
        }

        // Split the source text into an array of words
        let words = sourceText.split(/\s+/);

        // Sort the words array
        words.sort();

        // Create the unique multidimensional array
        let unique = [];
        for (let i = 0; i < words.length; i++) {
            if (i === 0 || words[i] !== words[i - 1]) {
                unique.push([words[i], 1]);
            } else {
                unique[unique.length - 1][1]++;
            }
        }

        console.log(unique);
        unique.sort(byDuplicate);

        function byDuplicate(a, b) {
            return b[1] - a[1];
        }

        // Keep the Top 100 words
        unique = unique.slice(0, 100);

        // Find the duplicates of the most-repeated word
        let maxCount = unique[0][1];

        // Sort the word list in alphabetic order
        unique.sort();

        // Reference the word cloud box
        let cloudBox = document.getElementById("wc_cloud");
        cloudBox.innerHTML = "";

        // Size each word based on its usage
        for (let i = 0; i < unique.length; i++) {
            let word = document.createElement("span");
            word.textContent = unique[i][0];
            word.style.fontSize = (unique[i][1] / maxCount) + "em";
            cloudBox.appendChild(word);
        }
    }
};
