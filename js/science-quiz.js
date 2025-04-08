// Function that fetches the quiz questions from provided API 

async function fetchQuizQuestions(category, difficulty, amount = 10) {
    try {
      // Using Open Trivia Database as an example API
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
      const response = await fetch(url); // fetches data from the API
      const data = await response.json(); // converts the responses into JSON format
      
      // If the API response is ) means it worke and we recieve results
      if (data.response_code === 0) {
        return data.results; // retunrs quiz questions
      } else {
        throw new Error('Failed to load questions'); // returns error when wrong
      }
    } catch (error) {
      console.error('Error fetching questions:', error); // log if there is an error
      return []; // Returns empty array so the app doesn't crash
    }
  }

  // Quiz state management (handels all the logic and display for the quiz)
  class QuizManager {
    constructor(questionsContainer, navigationContainer, progressContainer) {
      this.questionsContainer = questionsContainer;
      this.navigationContainer = navigationContainer;
      this.progressContainer = progressContainer;
      this.questions = []; // Stores quiz questions
      this.currentQuestionIndex = 0; // Keeps track of which question player is on
      this.userAnswers = []; // Stores user's answers
    }
    // Loads the questions into the quiz
    loadQuestions(questions) {
      this.questions = questions;
      this.currentQuestionIndex = 0;
      this.userAnswers = new Array(questions.length).fill(null);
      this.renderQuestion(); // Show the first question
      this.renderNavigation();  // Show navigation buttons
      this.updateProgress(); // Show progress bar
    }
    // Shows the current question on screen
    renderQuestion() {
      this.questionsContainer.innerHTML = ''; // Clears old question
      
      if (this.questions.length === 0) return; // Do nothing if no questions
      
      const question = this.questions[this.currentQuestionIndex]; // Gets current question
      
      // Create a question container to hold quiestions and answers
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question-container';
      
      // Shows question number (like "Question 2 of 10")
      const questionNumber = document.createElement('div');
      questionNumber.className = 'question-number';
      questionNumber.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
      questionDiv.appendChild(questionNumber);
      
      // Shows question text
      const questionText = document.createElement('h3');
      questionText.innerHTML = decodeHTMLEntities(question.question);
      questionDiv.appendChild(questionText);
      
      // Create answer options
      const answersDiv = document.createElement('div');
      answersDiv.className = 'answers-container';
      
     // Mix the correct answer with the wrong ones
      const answers = [...question.incorrect_answers, question.correct_answer];
      if (!question.answersShuffled) {
        shuffleArray(answers); // Randomise the answers
        question.answersShuffled = true; // Mark as shuffled
        question.shuffledAnswers = [...answers]; // Save shuffled order
      } else {
        // Use previously shuffled answers to maintain consistency when navigating
        answers.length = 0;
        answers.push(...question.shuffledAnswers);
      }
      
      // Create radio buttons for each answer option
      answers.forEach((answer, answerIndex) => {
        const answerLabel = document.createElement('label');
        answerLabel.className = 'answer-option';
        
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = `current-question`;
        radioInput.value = answer;
        radioInput.id = `answer-${answerIndex}`;
        
        // Check if this answer was previously selected
        if (this.userAnswers[this.currentQuestionIndex] === answer) {
          radioInput.checked = true;
        }
        
        // Add event listener to save answer
        radioInput.addEventListener('change', () => {
          this.userAnswers[this.currentQuestionIndex] = answer;
          this.updateProgress(); // updates progress bar
        });
        
        const answerText = document.createElement('span');
        answerText.innerHTML = decodeHTMLEntities(answer);
        
        answerLabel.appendChild(radioInput);
        answerLabel.appendChild(answerText);
        answersDiv.appendChild(answerLabel);
      });

      // Adds answers to question box, and add question box to page
      questionDiv.appendChild(answersDiv);
      this.questionsContainer.appendChild(questionDiv);
    }
    
    // Show navigation buttons: "Previous", "Next", and "Submit"
    renderNavigation() {
      this.navigationContainer.innerHTML = ''; // Clears previous buttons
      
      // Previous question button
      const prevButton = document.createElement('button');
      prevButton.textContent = 'Previous';
      prevButton.disabled = this.currentQuestionIndex === 0; // disable if this is a first question
      prevButton.addEventListener('click', () => {
        if (this.currentQuestionIndex > 0) {
          this.currentQuestionIndex--;
          this.renderQuestion();
          this.renderNavigation();
          this.updateProgress();
        }
      });
      
      // Next question button
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.disabled = this.currentQuestionIndex === this.questions.length - 1; // Disable if this is a last question
      nextButton.addEventListener('click', () => {
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.renderQuestion();
          this.renderNavigation();
          this.updateProgress();
        }
      });
      
      // Submit button (only show on last question)
      const submitButton = document.createElement('button');
      submitButton.textContent = 'Submit Quiz';
      submitButton.className = 'submit-button';
      submitButton.style.display = this.currentQuestionIndex === this.questions.length - 1 ? 'block' : 'none';
      submitButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to submit your answers?')) {
          this.scoreQuiz();
        }
      });
      
      this.navigationContainer.appendChild(prevButton);
      this.navigationContainer.appendChild(nextButton);
      this.navigationContainer.appendChild(submitButton);
    }
    
    // Update the progress bar and answered questions
    updateProgress() {
      this.progressContainer.innerHTML = '';
      
      // Create progress indicators (like a dot or number for each question)
      const progressList = document.createElement('ul');
      progressList.className = 'progress-indicators';
      
      this.questions.forEach((_, index) => {
        const indicator = document.createElement('li');
        indicator.textContent = index + 1;
        
        // Apply styling based on current question and answer status
        if (index === this.currentQuestionIndex) {
          indicator.classList.add('current');
        }
        
        if (this.userAnswers[index] !== null) {
          indicator.classList.add('answered');
        }
        
        // Add click event to navigate to question
        indicator.addEventListener('click', () => {
          this.currentQuestionIndex = index;
          this.renderQuestion();
          this.renderNavigation();
          this.updateProgress();
        });
        
        progressList.appendChild(indicator);
      });
      
      // Add summary of answered questions
      const summary = document.createElement('div');
      summary.className = 'progress-summary';
      const answeredCount = this.userAnswers.filter(answer => answer !== null).length;
      summary.textContent = `Answered: ${answeredCount} of ${this.questions.length}`;
      
      this.progressContainer.appendChild(progressList);
      this.progressContainer.appendChild(summary);
    }

      // Scores the quiz and shows results
    scoreQuiz() {
      let score = 0;
      const results = [];

      // Go through each question and check if the user got it right
      this.questions.forEach((question, index) => {
        const userAnswer = this.userAnswers[index];
        const isCorrect = userAnswer === question.correct_answer;
        
        if (isCorrect) {
          score++;
        }
        
        results.push({
          question: question.question,
          userAnswer,
          correctAnswer: question.correct_answer,
          isCorrect
        });
      });
       // Display results page
       this.renderResults(score, results);
    }
    // Results logic
    renderResults(score, results) {
      // Clears existing content from the page
      this.questionsContainer.innerHTML = '';
      this.navigationContainer.innerHTML = '';
      this.progressContainer.innerHTML = '';
      
      // Creates results container
      const resultsContainer = document.createElement('div');
      resultsContainer.className = 'results-container';
      
      // Adds score as header
      const scoreHeader = document.createElement('h2');
      scoreHeader.className = 'score-header';
      scoreHeader.textContent = `Your Score: ${score} out of ${this.questions.length}`;
      resultsContainer.appendChild(scoreHeader);
      
      // Adds percentage score
      const percentage = document.createElement('div');
      percentage.className = 'score-percentage';
      const percentValue = Math.round((score / this.questions.length) * 100);
      percentage.textContent = `${percentValue}%`;
      resultsContainer.appendChild(percentage);
      
      // Adds results list for each question
      const resultsList = document.createElement('div');
      resultsList.className = 'results-list';
      
      // Gos through each question's result
      results.forEach((result, index) => {
        const resultItem = document.createElement('div');  // Each result item will show if it was right or wrong
        resultItem.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;
        
        // Shows question number
        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number';
        questionNumber.textContent = `Question ${index + 1}`;
        resultItem.appendChild(questionNumber);
        
        // Showsthe question text
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.innerHTML = decodeHTMLEntities(result.question);
        resultItem.appendChild(questionText);
        
        // Creates a container for showing user and correct answers
        const answerInfo = document.createElement('div');
        answerInfo.className = 'answer-info';
        
        // Shows user's answer (or say they didn’t answer)
        if (result.userAnswer) {
          const userAnswerText = document.createElement('div');
          userAnswerText.className = 'user-answer';
          userAnswerText.innerHTML = `Your answer: <span class="${result.isCorrect ? 'correct-text' : 'incorrect-text'}">${decodeHTMLEntities(result.userAnswer)}</span>`;
          answerInfo.appendChild(userAnswerText);
        } else {
            // If user didn’t answer this question
          const noAnswer = document.createElement('div');
          noAnswer.className = 'no-answer';
          noAnswer.textContent = 'You did not answer this question';
          answerInfo.appendChild(noAnswer);
        }
        
        // If the user got it wrong, also show the correct answer
        if (!result.isCorrect) {
          const correctAnswerText = document.createElement('div');
          correctAnswerText.className = 'correct-answer-text';
          correctAnswerText.innerHTML = `Correct answer: <span class="correct-text">${decodeHTMLEntities(result.correctAnswer)}</span>`;
          answerInfo.appendChild(correctAnswerText);
        }
        
        resultItem.appendChild(answerInfo); // Add all answer info to the result item
        resultsList.appendChild(resultItem); // Add this question's result to the list
      });
      
      resultsContainer.appendChild(resultsList); // Finally, add the results list to the results container
      
     // Add restart button
     const restartButton = document.createElement('button');// Create a new <button> element
     restartButton.className = 'restart-button'; // Assign a CSS class to the button for styling
     restartButton.textContent = 'Take Another Quiz'; // Set the text displayed on the button
     // Add a click event listener to the button that reloads the page when clicked
     restartButton.addEventListener('click', () => {
       // Reload the page or reset the quiz state
       location.reload();
     });
     
     resultsContainer.appendChild(restartButton); // Add the restart button to the results container so it's visible on the page
     
     // Add the results to the page
     this.questionsContainer.appendChild(resultsContainer);
   }
 } 