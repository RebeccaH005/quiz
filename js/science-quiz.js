// Function fetches quiz questions from an external API based on category and difficulty
// It returns an array of questions if successful, if not will return an empty array
async function fetchQuizQuestions(category, difficulty, amount = 10) {
    try {
        const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.response_code === 0) {
            return data.results; // Return questions array
        } else {
            throw new Error('Failed to load questions'); // Handle API error
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
        return []; // Return empty array when faild
    }
}

// Class is responsible for managing the quiz state, including navigation and user responses
class QuizManager {
    constructor(questionsContainer, navigationContainer, progressContainer) {
        this.questionsContainer = questionsContainer; // Box for displaying questions
        this.navigationContainer = navigationContainer; // Box for navigation buttons
        this.progressContainer = progressContainer; // Box for showing quiz progress
        this.questions = []; // Array to store quiz questions
        this.currentQuestionIndex = 0; // Keeps track of the current question index
        this.userAnswers = []; // Stores user-selected answers
    }
    
    // Load and initiates quiz questions function
    // This function is called when quiz questions are fetched
    loadQuestions(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(questions.length).fill(null); // Initiates user answers array
        this.renderQuestion(); // Provides the first question
        this.renderNavigation(); // Shows navigation buttons
        this.updateProgress(); // Update progress bar
    }
} 

    // Displays the current question with answer choices
renderQuestion() 
{
    this.questionsContainer.innerHTML = ''; // Clear previous question
    if (this.questions.length === 0) return; // If no questions, do nothing
    
    const question = this.questions[this.currentQuestionIndex]; // Get current question
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-container'; // Assign class for styling
    
    // Display question number
    const questionNumber = document.createElement('div');
    questionNumber.className = 'question-number';
    questionNumber.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
    questionDiv.appendChild(questionNumber);
    
    // Display question text
    const questionText = document.createElement('h3');
    questionText.innerHTML = decodeHTMLEntities(question.question);
    questionDiv.appendChild(questionText);
    
    // Container for answer options
    const answersDiv = document.createElement('div');
    answersDiv.className = 'answers-container';
    
    // Join correct and incorrect answers and shuffle them
    const answers = [...question.incorrect_answers, question.correct_answer];
    if (!question.answersShuffled) {
        shuffleArray(answers); // Mix answer order
        question.answersShuffled = true;
        question.shuffledAnswers = [...answers];
    } else {
        answers.length = 0;
        answers.push(...question.shuffledAnswers);
    }
    
    // Create radio buttons for each answer option
    answers.forEach((answer, index) => {
        const answerLabel = document.createElement('label');
        answerLabel.className = 'answer-option'; // Assign styling class
        
        const radioInput = document.createElement('input');
        radioInput.type = 'radio'; // Set input type to radio button
        radioInput.name = `current-question`; // Group answers by question
        radioInput.value = answer; // Store answer value
        radioInput.id = `answer-${index}`;
        
        // Mark previously selected answer as checked
        if (this.userAnswers[this.currentQuestionIndex] === answer) {
            radioInput.checked = true;
        }
        
        // Event listener to update selected answer
        radioInput.addEventListener('change', () => {
            this.userAnswers[this.currentQuestionIndex] = answer;
            this.updateProgress(); // Refresh progress indicator
        });
        
        const answerText = document.createElement('span');
        answerText.innerHTML = decodeHTMLEntities(answer);
        
        answerLabel.appendChild(radioInput);
        answerLabel.appendChild(answerText);
        answersDiv.appendChild(answerLabel);
    });
    
    questionDiv.appendChild(answersDiv);
    this.questionsContainer.appendChild(questionDiv);
}

//Navigation buttons that controls movement between questions (Previous, Next, Submit)
    renderNavigation() 
    {
        this.navigationContainer.innerHTML = ''; // Clear previous buttons
        
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = this.currentQuestionIndex === 0; // Disable if at first question
        prevButton.addEventListener('click', () => {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
                this.renderQuestion();
                this.renderNavigation();
                this.updateProgress();
            }
        });
        
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = this.currentQuestionIndex === this.questions.length - 1; // Disable if last question
        nextButton.addEventListener('click', () => {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                this.renderQuestion();
                this.renderNavigation();
                this.updateProgress();
            }
        });
        
        this.navigationContainer.appendChild(prevButton);
        this.navigationContainer.appendChild(nextButton);
    }

// Function to decode HTML in questions and nswers
function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

// Function to shuffle array elements (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// Initialize quiz on page load 
document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions-container');
    const navigationContainer = document.getElementById('navigation-container');
    const progressContainer = document.getElementById('progress-container');
    const startButton = document.getElementById('start-quiz');
    
    const quizManager = new QuizManager(questionsContainer, navigationContainer, progressContainer);
    
    startButton.addEventListener('click', async () => {
        const category = document.getElementById('category-select').value;
        const difficulty = document.getElementById('difficulty-select').value;
        
        questionsContainer.innerHTML = '<p class="loading">Loading questions...</p>';
        navigationContainer.innerHTML = '';
        progressContainer.innerHTML = '';
        document.querySelector('.quiz-controls').style.display = 'none';
        
        const questions = await fetchQuizQuestions(category, difficulty);
        
        if (questions.length > 0) {
            quizManager.loadQuestions(questions);
        } else {
            questionsContainer.innerHTML = '<p class="error">Failed to load questions. Please try again.</p>';
        }
    });
});
