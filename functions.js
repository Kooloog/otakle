//*************************//
//COOKIE HANDLING FUNCTIONS//
//*************************//

//Sets a new cookie
function setCookie(name, value) {
    var daysToExpire = new Date(2147483647 * 1000).toUTCString();
    document.cookie = name + "=" + value  + '; expires=' + daysToExpire;
}

//Gets a cookie by name
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    if (getCookie(name)) {
        document.cookie = name +'=; Path=/otakle; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

function firstTimeCookies(today) {
    for (var i = 1; i <= 6; i++) setCookie("attempts" + i, 0);
    setCookie("attemptsTotal", 0);
    setCookie("lastDate", today);
}

function updateAttemptCookie(attempts) {
    switch (parseInt(attempts)) {
        case 1: setCookie("attempts1", parseInt(getCookie("attempts1")) + 1); break;
        case 2: setCookie("attempts2", parseInt(getCookie("attempts2")) + 1); break;
        case 3: setCookie("attempts3", parseInt(getCookie("attempts3")) + 1); break;
        case 4: setCookie("attempts4", parseInt(getCookie("attempts4")) + 1); break;
        case 5: setCookie("attempts5", parseInt(getCookie("attempts5")) + 1); break;
        case 6: setCookie("attempts6", parseInt(getCookie("attempts6")) + 1); break;
    }
    setCookie("attemptsTotal", parseInt(getCookie("attemptsTotal")) + 1);
}

//*****************//
//VARIOUS FUNCTIONS//
//*****************//

//Very short animation that plays whenever a key is typed.
function typingAnimation(cell) {
    cell.style.animationName = 'keytype'
    cell.style.animationDuration = '100ms'
    cell.style.animationTimingFunction = 'ease-out'
}

//Animation to color a letter after a guess
function colorAnimation(cell, type, number) {
    cell.style.animationDelay = (number * 300) + 'ms'
    if (type == "0") { cell.style.animationName = 'correct'; }
    if (type == "1") { cell.style.animationName = 'misplaced'; }
    if (type == "2") { cell.style.animationName = 'wrong'; }
    cell.style.animationDuration = '500ms'
    cell.style.animationTimingFunction = 'ease-out'
    cell.style.animationFillMode = 'forwards';
}

//Animation when the word is guessed correctly
function flashAnimation(attempt) {
    for (var i = 0; i < 5; i++) {
        var cell = document.getElementById("grid").rows[attempt].cells[i];
        cell.style.backgroundColor = "#538d4e";
        cell.style.animationDelay = (i * 100) + 'ms'
        cell.style.animationName = 'flashWhite';
        cell.style.animationDuration = '200ms'
        cell.style.animationTimingFunction = 'ease-out'
        cell.style.animationFillMode = 'forwards';
    }
}

function hideMessage() {
    var box = document.getElementById("correct");
    box.style.animationName = 'onlyHide'
    box.style.animationDuration = '1ms'
}

function hideWrongMessage() {
    var box = document.getElementById("invalid");
    box.style.animationName = 'onlyHide'
    box.style.animationDuration = '1ms'
}

//Shows a message when the word is guessed
function showEndingMessage(message) {
    var box = document.getElementById("correct");
    box.innerHTML = message;
    box.style.animationName = 'showAndHide'
    box.style.animationDuration = '2500ms'
    box.style.animationTimingFunction = 'ease-out'
}

function showWrongMessage() {
    var box = document.getElementById("invalid");
    box.style.animationName = 'showAndHide'
    box.style.animationDuration = '1000ms'
    box.style.animationTimingFunction = 'ease-out'
}

let copypaste;
let daysSinceFirst;

function copyToClipboard() {
    navigator.clipboard.writeText(copypaste);
    showEndingMessage("Copied!");
    setTimeout(function () { hideMessage(); }, 1000);
}

function showHelp() {
    var box = document.getElementById("help");
    box.style.animationName = 'onlyShow'
    box.style.animationDuration = '200ms'
    box.style.animationTimingFunction = 'ease-out'
    box.style.animationFillMode = 'forwards';
}

function hideHelp() {
    var box = document.getElementById("help");
    box.style.animationName = 'onlyHide'
    box.style.animationDuration = '200ms'
    box.style.animationTimingFunction = 'ease-out'
    box.style.animationFillMode = 'forwards';
}

function showSettings() {
    var box = document.getElementById("settings");
    box.style.animationName = 'onlyShow'
    box.style.animationDuration = '200ms'
    box.style.animationTimingFunction = 'ease-out'
    box.style.animationFillMode = 'forwards';
}

function hideSettings() {
    var box = document.getElementById("settings");
    box.style.animationName = 'onlyHide'
    box.style.animationDuration = '200ms'
    box.style.animationTimingFunction = 'ease-out'
    box.style.animationFillMode = 'forwards';
}

//Shows the results screen (reads grid to generate emoji content)
function showResults(attempts) {
    var box = document.getElementById("results");
    var grid = document.getElementById("grid");
    var todayAttempts = (attempts + 1);
    if (todayAttempts >= 7) todayAttempts = 'X';
    var message = 'Otakle ' + daysSinceFirst + ' - ' + (todayAttempts) + "/6<br><br>";

    for (var i = 0; i <= attempts; i++) {
        if (i < 6) {
            for (var j = 0; j < 5; j++) {
                var cell = grid.rows[i].cells[j];
                var color = getComputedStyle(cell).backgroundColor;
                if (color.includes('102, 102, 102')) message += "⬛";
                if (color.includes('181, 159, 59')) message += "🟨";
                if (color.includes('83, 141, 78')) message += "🟩";
                if (color.includes('133, 192, 249')) message += "🟦";
                if (color.includes('245, 121, 58')) message += "🟧";
            }
            message += '<br>'
        }
    }

    if (!getCookie("guessed")) updateAttemptCookie(attempts + 1);
    setCookie("guessed", "yes");

    //Updating the bar graph on the results screen
    if (parseInt(getCookie("attemptsTotal")) != 0) {
        var maxValue = 0;
        for (var i = 1; i <= 6; i++) {
            var checking = (parseFloat(getCookie("attempts" + i)) / parseFloat(getCookie("attemptsTotal")))
            if(checking > maxValue) maxValue = checking;
        }
        for (var i = 1; i <= 6; i++) {
            if (parseInt(getCookie("attempts" + i)) < 1) document.getElementById("attempts" + i).style.width = "1%";
            else {
                document.getElementById("attempts" + i).style.width =
                    (((parseFloat(getCookie("attempts" + i)) / parseFloat(getCookie("attemptsTotal"))) / maxValue) * 100.0) + "%";

                if (parseInt(getCookie("attempts" + i)) > 0) {
                    document.getElementById("attempts" + i).textContent = getCookie("attempts" + i);
                    document.getElementById("attempts" + i).style.color = "white";
                }
            }
        }
    }
    else {
        for (var i = 1; i <= 6; i++) {
            document.getElementById("attempts" + i).style.width = "1%";
        }
    }

    message = message.replace(/<br>/g, "\n");
    box.style.animationName = 'onlyShow'
    box.style.animationDuration = '200ms'
    box.style.animationTimingFunction = 'ease-out'
    box.style.animationFillMode = 'forwards';
    message += "\nhttps://kooloog.github.io/otakle/"
    copypaste = message;
}

//Hides the result screen
function hideResults() {
    var box = document.getElementById("results");
    box.style.animationName = 'onlyHide'
    box.style.animationDuration = '200ms'
    box.style.animationTimingFunction = 'ease-out'
    box.style.animationFillMode = 'forwards';
}

//Clears current animation value from any cell
function clearAnimation(cell) {
    cell.style.animationName = ''
    cell.style.animationDuration = ''
    cell.style.animationTimingFunction = ''
}

/*************************/
/*PREPARING ALL VARIABLES*/
/*************************/

//To get both current attempt, and column the user will type on
var canWrite = true;
var currentAttempt = 0;
var currentPosition = 0;

//Getting current date and storing it in DD/MM/YYYY format
var firstDay = new Date('2022-01-27');
var today = new Date();

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

var todayCorrect = new Date(yyyy + '-' + mm + '-' + dd);
var diffTime = Math.abs(todayCorrect - firstDay);
daysSinceFirst = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

if (getCookie("attemptsTotal") == null) firstTimeCookies(today);

//Getting answer to today's word, and storing all info needed
let answerData;
let answerWord;

fetch('answers.txt').then(response => response.text()).then(text => {
    var lines = text.split('\n');
    for (var line = 0; line < lines.length; line++) {
        if (lines[line].startsWith(yyyy + "|" + mm + "|" + dd + "|")) {
            answerData = lines[line].split("|");
            answerWord = answerData[3];
        }
    }
});

//Preparing the character list (valid terms user can input)
let validCharacters = [];

fetch('characterList.txt').then(response => response.text()).then(text => {
    var lines = text.split('\n');
    for (var line = 0; line < lines.length; line++) {
        var character = lines[line].substring(0, 5);
        validCharacters.push(character);
    }
});

function characterInfo() {
    document.getElementById('picture').src = answerData[6];
    document.getElementById('answerinfo').innerHTML =
        "<div style=\"font-size:21px\">" + answerData[4] + "</div><div style=\"font-size:12px\">" + answerData[5] + "</div>";
}

//Inputs a letter in the current row
function inputLetter(cell, pressedKey) {
    cell.innerHTML = pressedKey;
    typingAnimation(cell);
    currentPosition++;
}

//Erases a letter from the current row
function eraseLetter(cell) {
    cell.innerHTML = ' ';
    clearAnimation(cell);
}

//Changes the color of a key in the keyboard
function changeKeyColor(letter, type) {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);

    for (var i = 0; i < 3; i++) {
        var row = document.getElementById("keys").rows[i];

        for (var j = 0; j < row.cells.length; j++) {
            var cell = row.cells[j].getElementsByTagName('input')[0];

            if (cell.value == letter) {
                cell.style.background = '#888888';
            }
        }

        for (var j = 0; j < row.cells.length; j++) {
            var cell = row.cells[j].getElementsByTagName('input')[0];
            var color = cell.style.backgroundColor;

            if (cell.value == letter) {
                if (type == "1") { 
                    cell.style.backgroundColor = rs.getPropertyValue('--misplaced'); 
                }
                if (type == "0") { 
                    if(!color.includes('181, 159, 59') || !color.includes('133, 192, 249')) {
                        cell.style.backgroundColor = rs.getPropertyValue('--correct'); 
                    }
                }
                if (type == "2") { 
                    if((!color.includes('181, 159, 59') || !color.includes('133, 192, 249') ) && 
                        !color.includes('83, 141, 78') || !color.includes('245, 121, 58')) {
                        cell.style.backgroundColor = '#333333'; 
                    }
                }
            }
        }
    }
}

function countGreens(array) {
    var hits = 0;
    for (var i = 0; i < 5; i++) {
        if (array[i] == 0) hits++;
    }
    return hits;
}

function checkWord() {

    var wordToCheck = '';
    for (let i = 0; i < 5; i++) {
        wordToCheck = wordToCheck + document.getElementById("grid").rows[currentAttempt].cells[i].innerHTML;
    }

    if (validCharacters.includes(wordToCheck)) {
        var positionScore = new Array(5).fill(2);
        canWrite = false;

        //Checking which letters are in the correct position
        for (let i = 0; i < 5; i++) {
            var cell = document.getElementById("grid").rows[currentAttempt].cells[i];
            if (answerWord.charAt(i) == cell.innerHTML) {
                positionScore[i] = 0;
            }
        }

        //Checking which letters are in the wrong position
        for (let i = 0; i < 5; i++) {
            var cell = document.getElementById("grid").rows[currentAttempt].cells[i];
            if (answerWord.charAt(i) != cell.innerHTML && answerWord.includes(cell.innerHTML)) {

                var timesInWord = 0;
                var timesInGreen = 0;
                var timesInYellow = 0;

                for (let j = 0; j < 5; j++) {
                    var auxCell = document.getElementById("grid").rows[currentAttempt].cells[j];
                    if (positionScore[j] == 0 && auxCell.innerHTML == cell.innerHTML) timesInGreen++;
                    if (positionScore[j] == 1 && auxCell.innerHTML == cell.innerHTML) timesInYellow++;
                    if (answerWord.charAt(j) == cell.innerHTML) timesInWord++;
                }

                if ((timesInGreen + timesInYellow) < timesInWord) {
                    positionScore[i] = 1;
                }
            }
        }

        //Assigning each cell a new color
        for (let i = 0; i < 5; i++) {
            var cell = document.getElementById("grid").rows[currentAttempt].cells[i];
            colorAnimation(cell, positionScore[i], i);
            changeKeyColor(cell.innerHTML, positionScore[i]);
        }

        setCookie("row" + (currentAttempt + 1), wordToCheck);

        //If the word has been guessed...
        if (countGreens(positionScore) >= 5) {
            switch (currentAttempt) {
                case 0: message = "Perfect!"; break;
                case 1: message = "Genius!"; break;
                case 2: message = "Amazing!"; break;
                case 3: message = "Great!"; break;
                case 4: message = "Good job!"; break;
                case 5: message = "Nice!"; break;
            }

            characterInfo();
            setTimeout(function () { showEndingMessage(message); }, 1500);
            setTimeout(function () { flashAnimation(currentAttempt); }, 1555);
            setTimeout(function () { showResults(currentAttempt); }, 4000);
            setTimeout(function () { hideMessage(); }, 4100);
        }
        else {
            currentPosition = 0;
            currentAttempt++;

            if (currentAttempt >= 6) {
                characterInfo();
                setTimeout(function () { showEndingMessage("Unlucky"); }, 1500);
                setTimeout(function () { showResults(currentAttempt); }, 4000);
                setTimeout(function () { hideMessage(); }, 4100);
            }
            else setTimeout(function () { canWrite = true; }, 1400);
        }
    }
    else {
        showWrongMessage();
        setTimeout(function () { hideWrongMessage(); }, 1000);
    }
}

//Detects when a key is pressed on a physical keyboard (PC)
window.addEventListener("keydown", (e) => {

    //If the pressed key is BACKSPACE, then a letter from the current word is erased.
    if (e.key === "Backspace" || e.key === "Delete") {
        if (currentPosition > 0 && canWrite) {
            currentPosition--;
            var cell = document.getElementById("grid").rows[currentAttempt].cells[currentPosition];
            eraseLetter(cell);
        }
    }

    if (e.key === "Enter") {
        if (currentPosition == 5) {
            checkWord();
        }
    }

    //If a key is pressed, then this key is added to the word, if it fits.
    else {
        var pressedKey = e.key.toUpperCase();
        if (/[A-Z]/.test(pressedKey) && pressedKey.length < 2) {
            if (currentPosition < 5 && canWrite) {
                var cell = document.getElementById("grid").rows[currentAttempt].cells[currentPosition];
                inputLetter(cell, pressedKey);
            }
        }
    }
});

//Detects when a key is pressed on the virtual keyboard
function keyboardKey(key) {
    key.blur();
    var pressedKey = key.value;

    if (pressedKey == "ENTER") {
        if (currentPosition == 5 && canWrite) {
            checkWord();
        }
    }
    else if (pressedKey == "BACK") {
        if (currentPosition > 0 && canWrite) {
            currentPosition--;
            var cell = document.getElementById("grid").rows[currentAttempt].cells[currentPosition];
            eraseLetter(cell);
        }
    }
    else {
        if (currentPosition < 5 && canWrite) {
            var cell = document.getElementById("grid").rows[currentAttempt].cells[currentPosition];
            inputLetter(cell, pressedKey);
        }
    }
}

//*****************//
//SETTING FUNCTIONS//
//*****************//

function changeColors() {
    var variables = document.querySelector(':root');
    var colorblindEnable = document.getElementById("colorblind");

    if(colorblindEnable.checked) {
        variables.style.setProperty('--correct', '#f5793a');
        variables.style.setProperty('--misplaced', '#85c0f9');
        setCookie("colorblind", "1");

        for (var i = 0; i < 3; i++) {
            var row = document.getElementById("keys").rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                var cell = row.cells[j].getElementsByTagName('input')[0];
                var color = getComputedStyle(cell).backgroundColor;
    
                if (color.includes('181, 159, 59')) cell.style.background = '#85c0f9';          
                if (color.includes('83, 141, 78')) cell.style.background = '#f5793a';            
            }
        }
    }
    else {
        variables.style.setProperty('--misplaced', '#b59f3b');
        variables.style.setProperty('--correct', '#538d4e');

        for (var i = 0; i < 3; i++) {
            var row = document.getElementById("keys").rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                var cell = row.cells[j].getElementsByTagName('input')[0];
                var color = getComputedStyle(cell).backgroundColor;
    
                if (color.includes('133, 192, 249')) cell.style.background = '#b59f3b';          
                if (color.includes('245, 121, 58')) cell.style.background = '#538d4e';            
            }
        }

        deleteCookie("colorblind");
    }
}

function changeToArial() {
    document.getElementById("maintitle").style.fontFamily = "arial";
    document.getElementById("subtitle").style.fontFamily = "arial";
    document.getElementById("answerinfo").style.fontFamily = "arial";

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 5; j++) {
            var cell = document.getElementById("grid").rows[i].cells[j];
            cell.style.fontFamily = "Arial";
        }
    }

    for(var i = 0; i < 5; i++) {
        document.getElementById("example1").rows[0].cells[i].style.fontFamily = "arial";
        document.getElementById("example2").rows[0].cells[i].style.fontFamily = "arial";
        document.getElementById("example3").rows[0].cells[i].style.fontFamily = "arial";
    }
}

function changeFont() {
    var fontEnable = document.getElementById("basicFont");

    if(fontEnable.checked) {
        changeToArial();
        setCookie("fonts", "1");
    }
    else {
        document.getElementById("maintitle").style.fontFamily = "anime";
        document.getElementById("subtitle").style.fontFamily = "anime";
        document.getElementById("answerinfo").style.fontFamily = "anime";

        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 5; j++) {
                var cell = document.getElementById("grid").rows[i].cells[j];
                cell.style.fontFamily = "anime";
            }
        }

        for(var i = 0; i < 5; i++) {
            document.getElementById("example1").rows[0].cells[i].style.fontFamily = "anime";
            document.getElementById("example2").rows[0].cells[i].style.fontFamily = "anime";
            document.getElementById("example3").rows[0].cells[i].style.fontFamily = "anime";
        }

        deleteCookie("fonts");
    }
}

//*********************//
//INITIAL COOKIE CHECKS//
//*********************//

if(getCookie("colorblind")) {
    var variables = document.querySelector(':root');
    variables.style.setProperty('--correct', '#f5793a');
    variables.style.setProperty('--misplaced', '#85c0f9');
    document.getElementById("colorblind").checked = true;
}

if(getCookie("fonts")) {
    changeToArial();
    document.getElementById("basicFont").checked = true;
}

if (today != getCookie("lastDate")) {
    for (var i = 1; i <= 6; i++) deleteCookie("row" + i);
    deleteCookie("guessed");
    setCookie("lastDate", today);
}
else {
    for (var i = 1; i <= 6; i++) {
        if (getCookie("row" + i)) {
            for (var j = 0; j < 5; j++) {
                var cell = document.getElementById("grid").rows[i - 1].cells[j];
                var pressedKey = getCookie("row" + i).charAt(j);
                inputLetter(cell, pressedKey);
            }
            setTimeout(function () { checkWord(); }, 500);
        }
    }
}
