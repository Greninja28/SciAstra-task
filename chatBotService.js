const responseObj = {
  hello: "Hey! How can I help you?",
  hey: "Hey! What's up?",
  today: new Date().toDateString(),
  time: new Date().toLocaleTimeString(),
  "I am getting problem in this course": "Sure, let me know the course. We will get back to you in a few hours.",
  "thank you": "Hope you got your doubt solved. Feel free to ask anytime.",
  defaultResponse: "I am not trained to answer this question. Thank you!"
};

const fetchResponse = (userInput) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const response = responseObj[userInput] || responseObj.defaultResponse;
        resolve(response);
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
};

const chatBotService = {
  getBotResponse(userInput) {
    return fetchResponse(userInput);
  }
};

export default chatBotService;
