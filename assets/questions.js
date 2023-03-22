var score = 0;
var currentQuestion = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var quizQuestions = document.querySelector("#quizQuestions");
// the box the quiz questions sit in
var wrapper = document.querySelector("#wrapper");

// total seconds at the start of the quiz
var secondsLeft = 76;
var holdInterval = 0;
// seconds reduced if user makes a mistake
var userMistake = 10;
// creates new list for user choices made
var choicesMade = document.createElement("ul");


// questions user will see once "start quiz" happens;
var questions = [
    {
        title: "How do you access the console.log on a webpage?",
        choices: [
            "Right click then inspect",
            "Right click then print",
            "Right click then view page source",
            "Right click then reload"],

        answer: "Right click then inspect"
    },
    {
        title: "What does HTML stand for?",
        choices: [
            "Hypertext Markup Language",
            "Hyper Marking Listener",
            "Hypertext Markdown Length",
            "Hyper Masking Language"],

        answer: "Hypertext Markup Language"
    },
    {
        title: "What is CSS used for?",
        choices: [
            "describes how CSS elements are displayed",
            "describes how HTML elements are displayed",
            "displayed the text of a webpage",
            "none of the above"],

        answer: "describes how HTML elements are displayed"
    },
    {
        title: "What does Javascript do for a webpage?",
        choices: [
            "creates the structure to webpages",
            "creates the styles to webpages",
            "creates interactive elements to webpages",
            "all of the above"],

        answer: "creates interactive elements to webpages"
    },
    {
        title: "What is a debugging tool for deployed webpages?",
        choices: [
            "Javascript",
            "terminal",
            "CSS",
            "console.log"],

        answer: "console.log"
    },

];


// timer event listener
timer.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time Remaining: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                endGame();
                currentTime.textContent = "Time is up";
            }
        }, 1000);
    }
    render(currentQuestion);
});

// displays current question for user 
function render(currentQuestion) {

    quizQuestions.innerHTML = "";
    choicesMade.innerHTML = "";

    // loops through the questions
    for (var i = 0; i < questions.length; i++) {

        var userQuestion = questions[currentQuestion].title;
        var userChoices = questions[currentQuestion].choices;
        quizQuestions.textContent = userQuestion;
    }

    // answer choices for user to pick from 
    userChoices.forEach(function (newItem) {

        var questionList = document.createElement("li");
        questionList.setAttribute("id", "questionChoices")

        questionList.textContent = newItem;
        quizQuestions.appendChild(choicesMade);
        choicesMade.appendChild(questionList);

        questionList.addEventListener("click", (compare));
    })
}

// function to check user's choice to correct answer
function compare(event) {
    var answerCheck = event.target;

    if (answerCheck.matches("li")) {

        var answerNotify = document.createElement("div");
        answerNotify.setAttribute("id", "answerNotify");
        // if user choices the correct answer
        if (answerCheck.textContent == questions[currentQuestion].answer) {
            score++;
            answerNotify.textContent = "😎 Correct! The answer is:  " + questions[currentQuestion].answer + " 😎";
        } else {
            // if user choices the wrong answer
            secondsLeft = secondsLeft - userMistake;
            answerNotify.textContent = "❌ That is incorrect. The correct answer is:  " + questions[currentQuestion].answer + " ❌";
        }

    }
    
    currentQuestion++;

    // user's score out of # of questions shown when finished
    if (currentQuestion >= questions.length) {
        endGame();
        answerNotify.textContent = score + "/" + questions.length + " Correct";
    } else {
        render(currentQuestion);
    }

    quizQuestions.appendChild(answerNotify);
    

};

// end page for user after answering questions
function endGame() {
    quizQuestions.innerHTML = "";
    currentTime.innerHTML = "";

    // new heading appears after user finished quiz
    var newHeader = document.createElement("h1");
    newHeader.setAttribute("id", "newHeader");
    newHeader.textContent = "🎉 You did it! 🎉"
    quizQuestions.appendChild(newHeader);

    // final score paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quizQuestions.appendChild(createP);

    // swtiches timer to final score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        
    }

    // initial prompt for user input
    var userNamePrompt = document.createElement("label");
    userNamePrompt.setAttribute("id", "userNamePrompt");
    userNamePrompt.textContent = "Enter initials: ";

    quizQuestions.appendChild(userNamePrompt);

    var userNameInput = document.createElement("input");
    userNameInput.setAttribute("type", "text");
    userNameInput.setAttribute("id", "initials");
    userNameInput.textContent = "";

    quizQuestions.appendChild(userNameInput);

    var initialSubmitBtn = document.createElement("button");
    initialSubmitBtn.setAttribute("type", "submit");
    initialSubmitBtn.setAttribute("id", "submitBtn");
    initialSubmitBtn.textContent = "Submit";

    quizQuestions.appendChild(initialSubmitBtn);

    // listener for user initals and saving it to local storage with end score
    initialSubmitBtn.addEventListener("click", function () {
        var initials = userNameInput.value;

        if (initials === null) {         

        } else {
            var finalScore = {
                initials: initials,
                score: score + " out of 5 "
            }
            
            var scoresSaved = localStorage.getItem("scoresSaved");
            
            if (scoresSaved === null) {
                scoresSaved = [];
            } else {
                scoresSaved = JSON.parse(scoresSaved);
            }
            scoresSaved.push(finalScore);

            var newestScore = JSON.stringify(scoresSaved);
            localStorage.setItem("scoresSaved", newestScore);

            // after initals are saved the leaderboard page appears with current saved scores of other users
            window.location.replace("./assets/leaderboard.html");
        }
    });

};