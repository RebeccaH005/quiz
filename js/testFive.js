
document.querySelectorAll(".testOneAnswers-container img").forEach(img => {
    img.addEventListener("click", function () {
        const feedbackToQuestionText = document.getElementById("feedbackToQuestionText");

               const indexForQuestionLS = 5;  
            
        if (this.getAttribute("correct-data-answer") === "true") {

            feedbackToQuestionText.innerHTML = `
                <div class = "feedback-container-for-text">
                    <div class = "correct-answer-quiz">well done! you nailed it!</div>
                    <div class="feedback-text">
                    -----------
                    </div>
                </div>
            `;
            feedbackToQuestionText.style.color = "#28a745"; 
                    
                      localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'correct'); 
        } 

        else if (this.getAttribute("alt") === "Liechtenstein") {
            feedbackToQuestionText.innerHTML = `
                <div class = "feedback-container-for-text">
                    <div class = "incorrect-answer-quiz">Liechtenstein isn’t the right answer!</div>
                    <div class="feedback-text">
            -----------
                    </div>
                </div>
            `;

            feedbackToQuestionText.style.color = "#dc3545"; 

            localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'incorrect');
     
        } 

        else if (this.getAttribute("alt") === "Monoco") {
            feedbackToQuestionText.innerHTML = `
                <div class = "feedback-container-for-text">
                    <div class = "incorrect-answer-quiz">Monaco isn’t the right answer!</div>
                    <div class="feedback-text">
                     ---------
                    </div>
                </div>
            `;
            feedbackToQuestionText.style.color = "#dc3545"; 
            localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'incorrect');
           
        }

           
        const nextQuestionButton = document.getElementById("NextQuestionButtonQuiz");
if (nextQuestionButton) {
    nextQuestionButton.style.display = "block";
}
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const nextQuestionButton = document.getElementById("NextQuestionButtonQuiz");

    if (nextQuestionButton) {
        nextQuestionButton.addEventListener("click", function () {
            window.location.href = "../quiz/SummaryPage.html"; // Redirect to the next question page
        });
    }
});
