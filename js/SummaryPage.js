
document.addEventListener("DOMContentLoaded", function () {
    const totalQuestionsForThisQuiz = 5;
    let correct = 0;
    let incorrect = 0;         


    for (let i = 1; i <= totalQuestionsForThisQuiz; i++) {
        const singleQuizQuestionResult = localStorage.getItem(`question-counter-local-storage${i}_result`);
        if (singleQuizQuestionResult === 'correct') {
            correct++;
        } else if (singleQuizQuestionResult === 'incorrect') {
            incorrect++;
        }
    }


    const playerQuizTotalSummaryScore = document.getElementById("player-summary-score");
    if (playerQuizTotalSummaryScore) {
        playerQuizTotalSummaryScore.innerHTML = `
            <p>you answered ${correct} questions correctly, well done!</p>
            <p>you answered ${incorrect} questions incorrectly, have luck next time :)</p>
        `;
    }


    const restartQuizButton = document.getElementById("restartQuizButton");
    if (restartQuizButton) {
        restartQuizButton.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = "../quiz/geographyTestOne.html";// redirect to the quiz page
        });
    }


    const homeButton = document.getElementById("HomeButtonQuiz");
    if (homeButton) {
        // homeButton.addEventListener("click", function () {
        //     window.location.href = "index.html";
        // });
        // document.getElementById("mainLandingPage").addEventListener("click", function () {
        //     window.location.href = "index.html"; 
        // });
        
    }
});

document.getElementById("mainLandingPage").addEventListener("click", function () {
    window.location.href = "index.html"; 
});
