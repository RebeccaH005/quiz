
document.querySelectorAll(".testOneAnswers-container img").forEach(img => {
    img.addEventListener("click", function () {
        const feedbackToQuestionText = document.getElementById("feedbackToQuestionText");

       const indexForQuestionLS = 4;  
   
        if (this.getAttribute("correct-data-answer") === "true") {

            feedbackToQuestionText.innerHTML = `
                <div class = "feedback-container-for-text">
                    <div class = "correct-answer-quiz">well done! you nailed it!</div>
                    <div class="feedback-text">
                  Tokyo's metropolitan area has an estimated population of between 37 and 40 million people. No wonder their transport system is so overcrowded during rush hour! Imagine how much ramen is consumed daily!
                    </div>
                </div>
            `;
            feedbackToQuestionText.style.color = "#28a745"; 

                
                     localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'correct');

        } 
        else if (this.getAttribute("alt") === "Sao Paulo") {
            feedbackToQuestionText.innerHTML = `
                <div class = "feedback-container-for-text">
                    <div class = "incorrect-answer-quiz">Sao Paulo isn’t the right answer!</div>
                    <div class="feedback-text">
                    São Paulo in Brazil sambas in to second place in the population stakes. Here, the weather is as hot as your morning coffee, and much of your day is spent stuck in traffic. The residents still seem to find time for romance and making babies
                    </div>
                </div>
            `;

            feedbackToQuestionText.style.color = "#dc3545"; 

            localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'incorrect');

        } else if (this.getAttribute("alt") === "New Delhi") {
            feedbackToQuestionText.innerHTML = `
                <div class = "feedback-container-for-text">
                    <div class = "incorrect-answer-quiz">New Delhi isn’t the right answer!</div>
                    <div class="feedback-text">
                      New Delhi drops in at third place for population proliferation with 34.5 million inhabitants. They're a noisy bunch, so when they refer to it as the city that never sleeps, no one is surprised.
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
            window.location.href = "TestFive.html"; 
            window.location.href = "../quiz/geographyTestFive.html"; // Redirect to the next question page
        });
    }
});
