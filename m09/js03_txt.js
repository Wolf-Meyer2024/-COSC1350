/*
    Tipton Turbines
    Program to display games results in a web table
    Author: Wolfgang Meyer
    Date: 10/21/2024

    Filename: js03.js
*/

let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

window.addEventListener("load", addWeekDays);

function addWeekDays() {
    let i = 0; // initializes the count

    let headingCells = document.getElementsByTagName("th");

    while (i < 7) {
        headingCells[i].innerHTML = weekDays[i];

        i++;
    }
}

window.addEventListener("load", showGames);

function showGames(){
    for (let i = 0; i < gameDates.length; i ++) {
        let gameInfo = ""

           // Open the paragraph with the appropriate class based on game result
           switch (gameResults[i]) {
            case "W":
                gameInfo += '<p class="win">';
                break;
            case "L":
                gameInfo += '<p class="lose">';
                break;
            case "S":
                gameInfo += '<p class="suspended">';
                break;
            case "P":
                gameInfo += '<p class="postponed">';
                break;
            default:
                gameInfo += '<p>';
                break;
        }


        gameInfo += "<p>";

        gameInfo += gameOpponents[i] + "<br>";

        gameInfo += gameResults[i] + ": (" + runsScored[i] + " - " + runsAllowed[i] + ")";

        if (gameInnings[i]< 5 ) {
            gameInfo += "["+ gameInnings[i] + "] **** ";
        }
        
        else if (gameInnings[i] < 9 ) {
            gameInfo += "["+ gameInnings[i] + "] * ";
        }
        
        else if (gameInnings[i] > 9 ) {
            gameInfo += "["+ gameInnings[i] + "] ";
        }

        gameInfo += "</p>";

        let tableCell = document.getElementById(gameDates[i]);
        tableCell.insertAdjacentHTML("beforeend", gameInfo)


    }
}
