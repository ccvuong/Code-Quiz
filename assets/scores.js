var scoreBoard = document.querySelector("#scoreBoard");
var clear = document.querySelector("#clearScoresBtn");
var goBack = document.querySelector("#backBtn");

// clearing the scores on leaderboard
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// keeps the scores on local storage
var scoresSaved = localStorage.getItem("scoresSaved");
scoresSaved = JSON.parse(scoresSaved);

if (scoresSaved !== null) {

    for (var i = 0; i < scoresSaved.length; i++) {

        var scoreList = document.createElement("li");
        scoreList.setAttribute("id", "scoreList");

        scoreList.textContent = scoresSaved[i].initials + " " + scoresSaved[i].score;
        scoreBoard.appendChild(scoreList);

    }
}

// go back btn listener sends user back to start quiz page from leaderboard page
goBack.addEventListener("click", function () {
    window.location.replace("../index.html");
});