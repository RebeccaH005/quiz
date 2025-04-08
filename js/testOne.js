
document.querySelectorAll(".testOneAnswers-container img").forEach(img => {
    img.addEventListener("click", function () {
        const feedbackToQuestionText = document.getElementById("feedbackToQuestionText");

 
        const indexForQuestionLS = 1;   


        if (this.getAttribute("correct-data-answer") === "true") {
            feedbackToQuestionText.innerHTML = `
            <div class="feedback-container-for-text">
                <div class="correct-answer-quiz">well done! you nailed it!</div>
                <div class="feedback-text">
                Death Valley currently holds the distinction of having the highest measured air temperature since records began. The temperature in the appropriately named Furnace Creek , California, reached a stifling 56.7 °C (134.1°F) on July 10 in 1913. If you plan to visit, we advise leaving your thermal underwear at home. 
                </div>
            </div>
            `;
            feedbackToQuestionText.style.color = "#28a745"; 


            localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'correct');
  

        } else if (this.getAttribute("alt") === "Lut Desert Iran") {
            feedbackToQuestionText.innerHTML = `
            <div class="feedback-container-for-text">
                <div class="incorrect-answer-quiz">Lut Desert isn’t the right answer!</div>
                <div class="feedback-text">
                The Lut Desert in Eastern Iran once yielded a surface temperature of 70.7°C (159.3°F) during a scientific survey. That's hot enough to fry an egg, although finding a chicken in the hot desert may prove to be tricky!
                </div>
            </div>
            `;


            feedbackToQuestionText.style.color = "#dc3545"; 

    
            localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'incorrect');
            

        } else {
          
            feedbackToQuestionText.innerHTML = `
            <div class="feedback-container-for-text">
                <div class="incorrect-answer-quiz">Turpan Depression isn’t the right answer!</div>
                <div class="feedback-text">
                The Turfan Depression in North-Eastern China is aptly named, being one of the areas on the Earth's surface which is well below sea level, lying at a staggering minus 154 meters (505 feet). The ground temperature here is so high that the local population bakes bread products underground in the sand. Anyone for a toasted SANDwich?
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
            window.location.href = "../quiz/geographyTestTwo.html"; // Redirect to the next question page
        });
    }
});






