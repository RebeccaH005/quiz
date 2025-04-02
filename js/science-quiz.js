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