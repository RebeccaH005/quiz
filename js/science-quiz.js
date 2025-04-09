// Function that fetches the quiz questions from provided API 
async function fetchQuizQuestions(difficulty, amount = 10) {
  try {
    // Using Open Trivia Database as an example API
    const url = `https://opentdb.com/api.php?amount=${amount}&category=17&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url); 
    const data = await response.json(); 
    
    // If the API response is 0 means it works and we recieve results
    if (data.response_code === 0) {
      return data.results; 
    } else {
      throw new Error('Failed to load questions'); 
    }
  } catch (error) {
    console.error('Error fetching questions:', error); 
    return []; 
  }
}

// Quiz state management (handels all the logic and display for the quiz)
class QuizManager {
  constructor(questionsContainer, navigationContainer, progressContainer) {
    this.questionsContainer = questionsContainer;
    this.navigationContainer = navigationContainer;
    this.progressContainer = progressContainer;
    this.questions = []; 
    this.currentQuestionIndex = 0; 
    this.userAnswers = []; 
  }
  // Loads the questions into the quiz
  loadQuestions(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(questions.length).fill(null);
    this.renderQuestion(); 
    this.renderNavigation();  
    this.updateProgress(); 
  }
  // Shows the current question on screen
  renderQuestion() {
    this.questionsContainer.innerHTML = ''; 
    
    if (this.questions.length === 0) return; 
    
    const question = this.questions[this.currentQuestionIndex]; 
    
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
    
    // Creates answer options
    const answersDiv = document.createElement('div');
    answersDiv.className = 'answers-container';
    
   // Mixes the correct answer with the wrong ones
    const answers = [...question.incorrect_answers, question.correct_answer];
    if (!question.answersShuffled) {
      shuffleArray(answers); 
      question.answersShuffled = true; 
      question.shuffledAnswers = [...answers]; 
    } else {
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
      
      // Checks if this answer was previously selected
      if (this.userAnswers[this.currentQuestionIndex] === answer) {
        radioInput.checked = true;
      }
      
      // Adds event listener to save answer
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
    this.navigationContainer.innerHTML = ''; 
    
    // Previous question button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = this.currentQuestionIndex === 0; 
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
    nextButton.disabled = this.currentQuestionIndex === this.questions.length - 1; 
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
    const progressList = document.createElement('ul');
    progressList.className = 'progress-indicators';
    
    this.questions.forEach((_, index) => {
      const indicator = document.createElement('li');
      indicator.textContent = index + 1;
      
      if (index === this.currentQuestionIndex) {
        indicator.classList.add('current');
      }
      
      if (this.userAnswers[index] !== null) {
        indicator.classList.add('answered');
      }
      
      indicator.addEventListener('click', () => {
        this.currentQuestionIndex = index;
        this.renderQuestion();
        this.renderNavigation();
        this.updateProgress();
      });
      
      progressList.appendChild(indicator);
    });
    
    // Adds summary of answered questions
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
      const resultItem = document.createElement('div'); 
      resultItem.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;
      
      // Shows question number
      const questionNumber = document.createElement('div');
      questionNumber.className = 'question-number';
      questionNumber.textContent = `Question ${index + 1}`;
      resultItem.appendChild(questionNumber);
      
      // Shows the question text
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
        const noAnswer = document.createElement('div');
        noAnswer.className = 'no-answer';
        noAnswer.textContent = 'You did not answer this question';
        answerInfo.appendChild(noAnswer);
      }

      if (!result.isCorrect) {
        const correctAnswerText = document.createElement('div');
        correctAnswerText.className = 'correct-answer-text';
        correctAnswerText.innerHTML = `Correct answer: <span class="correct-text">${decodeHTMLEntities(result.correctAnswer)}</span>`;
        answerInfo.appendChild(correctAnswerText);
      }
      
      resultItem.appendChild(answerInfo); 
      resultsList.appendChild(resultItem); 
    });
    
    resultsContainer.appendChild(resultsList); 
    
   // Adds restart button
   const restartButton = document.createElement('button');
   restartButton.className = 'restart-button'; 
   restartButton.textContent = 'Take Another Quiz'; 
   // Add a click event listener to the button that reloads the page when clicked
   restartButton.addEventListener('click', () => {
     // Reload the page or reset the quiz state
     location.reload();
   });
   
   resultsContainer.appendChild(restartButton); 
   
   // Add the results to the page
   this.questionsContainer.appendChild(resultsContainer);
 }
} 
// Helper functions to decode HTML
function decodeHTMLEntities(text) {
  const textArea = document.createElement('textarea'); 
  textArea.innerHTML = text;  
  return textArea.value; 
}
// Helper function to shuffle elements in an array 
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Initialize the quiz (handles the start button click)
document.addEventListener('DOMContentLoaded', () => {
  const questionsContainer = document.getElementById('questions-container'); 
  const navigationContainer = document.getElementById('navigation-container'); 
  const progressContainer = document.getElementById('progress-container'); 
  const startButton = document.getElementById('start-quiz'); 

  // Creates a QuizManager instance to manage quiz operations
  const quizManager = new QuizManager(
    questionsContainer,
    navigationContainer, 
    progressContainer
  );
  
  // Adds an event listener for when the start button is clicked
  startButton.addEventListener('click', async () => {
    const difficulty = document.getElementById('difficulty-select').value;
    
    // Show loading state 
    questionsContainer.innerHTML = '<p class="loading">Loading questions...</p>';
    navigationContainer.innerHTML = ''; 
    progressContainer.innerHTML = ''; 
    
    // Hide quiz controls
    document.querySelector('.quiz-controls').style.display = 'none';
    
    // Fetch and display questions based on the selected category and difficulty
    const questions = await fetchQuizQuestions(difficulty);
    
    // Checks if questions were successfully loaded
    if (questions.length > 0) {
      quizManager.loadQuestions(questions);
    } else {
      questionsContainer.innerHTML = '<p class="error">Failed to load questions. Please try again.</p>';
      
      // Show retry button
      const retryButton = document.createElement('button');
      retryButton.textContent = 'Try Again';
      retryButton.addEventListener('click', () => {
        document.querySelector('.quiz-controls').style.display = 'flex';
        questionsContainer.innerHTML = '';
      });
      
      navigationContainer.appendChild(retryButton);
    }
  });
});
