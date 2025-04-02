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
    
    // Initiates quiz questions function
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