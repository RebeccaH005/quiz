
document.querySelectorAll(".testOneAnswers-container img").forEach(img => {
    img.addEventListener("click", function () {
        const feedbackToQuestionText = document.getElementById("feedbackToQuestionText");

               const indexForQuestionLS = 5;  
            
        if (this.getAttribute("correct-data-answer") === "true") {

            feedbackToQuestionText.innerHTML = `
                <div class = "feedback-container-for-text">
                    <div class = "correct-answer-quiz">well done! you nailed it!</div>
                    <div class="feedback-text">
                    Vatican City comes in first place for diminutiveness. At just over 0.4 square kilometers, I reckon you could paint it with half a can of Dulux before breakfast. With fewer than 1000 residents, however, there is plenty of room for everyone (once the tourists have gone home for the evening, that is).
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
                     Liechtenstein is next up in third place. It is truly gargantuan in comparison to Vatican City and Monaco, however, squeezing in at roughly 160 square kilometers. In contrast to its small size, the GDP is far from tiny at 7.362 billion USD!
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
                    Monaco is the Audrey Hepburn of countries, being glamorous and tiny! At just over 2 square kilometers, at least it’s not the smallest country in the world. It’s still got room enough for all those luxury yachts and casinos!
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
