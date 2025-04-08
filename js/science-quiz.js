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

 