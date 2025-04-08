
document.querySelectorAll(".testOneAnswers-container img").forEach(img => {

    img.addEventListener("click", function () {
        const feedbackToQuestionText = document.getElementById("feedbackToQuestionText");

             
               const indexForQuestionLS = 2;  
           
    
        if (this.getAttribute("correct-data-answer") === "true") {


            feedbackToQuestionText.innerHTML = `
            <div class = "feedback-container-for-text">
               <div class = "correct-answer-quiz">well done! you nailed it!</div>
          <div class="feedback-text">
         The Eastern Antarctic Plateau is where thermometers fear to tread. Temperatures in this region are known to plunge to sub minus 90C! Should you be unfortunate enough to find yourself here, we recommend that you layer up, and that a hot water bottle at bedtime is an essential.
    </div></div>
            `;
            feedbackToQuestionText.style.color = "#28a745"; 


          localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'correct');


        } else if (this.getAttribute("alt") === "North Ice Greenland") {
            feedbackToQuestionText.innerHTML = `
              <div class = "feedback-container-for-text">
                <div class =" incorrect-answer-quiz">North Ice Greenland isn’t the right answer! </div>
                <div class="feedback-text">
                 -------
                </div></div>
            `;
            feedbackToQuestionText.style.color = "#dc3545"; 


            localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'incorrect');
       
        } else {
            feedbackToQuestionText.innerHTML = `
              <div class = "feedback-container-for-text">
                <div class = " incorrect-answer-quiz">Oymyakon, Russia isn’t the right answer! </div>
            
                <div class="feedback-text">
                Oymyakon in the Sakha Republic, Russia may frustrate one's literary ambitions. Pens regularly become non-functional as the ink freezes solid in them! This small Siberian town is the coldest inhabited place on our little planet. Temperatures here reached a bracing minus 67.7°C back in 1933! It's so cold here that the locals leave their cars running day and night, fearing that once switched off they may be impossible to restart. However, compared to the Eastern Antarctic Plateau, Omyakon may seem cosy and hospitable!
                </div></div>
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
            window.location.href = "../quiz/geographyTestThree.html"; // Redirect to the next question page
        });
    }
});
