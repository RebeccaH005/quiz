
document.querySelectorAll(".testOneAnswers-container img").forEach(img => {
    img.addEventListener("click", function () {
        const feedbackToQuestionText = document.getElementById("feedbackToQuestionText");

 
        const indexForQuestionLS = 3;  


        if (this.getAttribute("correct-data-answer") === "true") {
            feedbackToQuestionText.innerHTML = `
            <div class="feedback-container-for-text">
                <div class="correct-answer-quiz">well done! you nailed it!</div>
                <div class="feedback-text">
                  Brazil wins this one by a long margin. The Amazon River contains more water by volume than the next seven most significant rivers combined, and while it travels through a grand total of nine countries on its journey from source to sea, Brazil plays host to around two-thirds of its total length. We advise you to steer well clear of Brazil if you suffer from hydrophobia! 
                </div>
            </div>
            `;
            feedbackToQuestionText.style.color = "#28a745"; 


            localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'correct');  
  

        } else if (this.getAttribute("alt") === "Canada") {
            feedbackToQuestionText.innerHTML = `
            <div class="feedback-container-for-text">
                <div class="incorrect-answer-quiz">Canada isn’t the right answer!</div>
                <div class="feedback-text">
               Canada has over 2 million lakes, which, when combined, cover a larger area than Germany! Much of this water is, however, frozen, which explains their prowess in ice hockey! 
                </div>
            </div>
            `;


            feedbackToQuestionText.style.color = "#dc3545"; 

    
            localStorage.setItem(`question-counter-local-storage${indexForQuestionLS}_result`, 'incorrect');
            

        } else {
          
            feedbackToQuestionText.innerHTML = `
            <div class="feedback-container-for-text">
                <div class="incorrect-answer-quiz"> Scotland isn’t the right answer!</div>
                <div class="feedback-text">
               Those residing in Scotland may be reading the above with suspicion. While a great deal of water seems to fall from the sky here almost daily, especially in the West, prompting the canny Scots to develop their famous whisky industry to process much of this abundant resource into something much more useful, in reality, Edinburgh receives less annual rainfall than Rome in Italy. 
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
            window.location.href = "TestFour.html"; 
            window.location.href = "../quiz/geographyTestFour.html"; // Redirect to the next question page
        });
    }
});
