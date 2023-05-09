
const questions = [
    {
      question: "What is the tag we use to link JavaScript file?",
      choices: ["hrft", "http", "script", "img"],
      answer: "script"
    },
    {
      question: "Is the order matter when we link JavaScript file?",
      choices: ["Yes", "No", "It depends", "All the above"],
      answer: "Yes"
    },
    {
      question: "How many ways we can define a function?",
      choices: ["one", "Two", "Three", "All the above"],
      answer: "Two"
    }
  ];
  
  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.getElementById('result-container');
  const startButton = document.getElementById('start-btn');
  const timerContainer = document.getElementById('timer-container');
  const scoreForm = document.getElementById('score-form');
  const highScoreList = document.getElementById('high-score-list');
  const HighScore = document.getElementById("HighScore");

  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 100;
  let timerId;
  
  function startQuiz() {
    startButton.disabled = true;
    timerId = setInterval(updateTimer, 1000);
    showQuestion();
  }
  
  function showQuestion() {
    quizContainer.innerHTML = `
      <h2>${questions[currentQuestion].question}</h2>
      <ol>
        ${questions[currentQuestion].choices.map(choice => `<li><button onclick="answerQuestion('${choice}')">${choice}</button></li>`).join('')}
      </ol>
    `;
  }
  
  function answerQuestion(choice) {
    const answerMessageElement = document.getElementById('answer-message');
    if (choice === questions[currentQuestion].answer) {
      score++;
    answerMessageElement.textContent = 'Correct';
    answerMessageElement.innerHTML = "Correct!";
    answerMessageElement.style.color = "#999";
    } else{
        timeLeft -= 10; // subtract 10 seconds for incorrect answer 
        answerMessageElement.textContent = 'Wrong';
        answerMessageElement.innerHTML = "Wrong!";
        answerMessageElement.style.color = "#999";   
    }
    answerMessageElement.style.display = "block";
    setTimeout(function() {
      answerMessageElement.style.display = "none";
    }, 2000); // hide the answer message after 2 seconds

    currentQuestion++;
    if (currentQuestion === questions.length || timeLeft <= 0) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
  
  function endQuiz() {
    clearInterval(timerId);
    quizContainer.innerHTML = '';
    resultContainer.innerHTML = `
      <h2>Quiz finished!</h2>
      <p>Your final score is ${score} out of ${questions.length}.</p>
    `;
    scoreForm.style.display = 'block';
    highScoreList.innerHTML += `<li>${score} - ${document.getElementById('initials').value}</li>`;
    scoreForm.addEventListener('submit', saveScore);
  };

// Call showHighScores() function to display high scores when the page loads
showHighScores();

  function updateTimer() {
    timeLeft--;
    if (timeLeft <= -1 || currentQuestion === questions.length ) {
      endQuiz();
    } else {
        timerContainer.textContent = `Time left: ${timeLeft}`;
      }
    }
    
    function saveScore(event) {
        event.preventDefault(); // prevent form from submitting and reloading the page
        const initialsInput = document.getElementById('initials');
        const initials = initialsInput.value;
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push({ initials, score });
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(1); // keep only top 1 high scores
        localStorage.setItem('highScores', JSON.stringify(highScores));
        showHighScores();
        initialsInput.value = '';
      
        // highScoreList.style.display = "block";
        highscoreQuestion.style.display = "block";

      resultContainer.setAttribute("class", "hide");
      scoreForm.setAttribute("style", "");
      scoreForm.setAttribute("class", "hide");
    }

        const submitButton = document.getElementById('submit-button');
        const confirmationMessage = document.getElementById('confirmation-message');
        const highscoreQuestion = document.getElementById('highscore-question');
        const yesButton = document.getElementById('yes-button');
        const noButton = document.getElementById('no-button');
        
        submitButton.addEventListener('click', () => {
          const initials = initialsInput.value;
          if (initials) {
            confirmationMessage.style.display = 'block';
            setTimeout(() => {
              confirmationMessage.style.display = 'none';
              highscoreQuestion.style.display = 'block';
            }, 2000);
          }
        });
        // Show the highscore when click Yes
        yesButton.addEventListener('click', () => {
        highScoreList.style.display = "block";    
        highscoreQuestion.setAttribute("style", "");
        highscoreQuestion.setAttribute("class", "hide");
      
        });
        
        // Hide the confirmation message when click No
        noButton.addEventListener('click', () => {
        highscoreQuestion.setAttribute("style", "");
        highscoreQuestion.setAttribute("class", "hide");
        
        });
      
      function showHighScores() {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const highScoreList = document.getElementById('high-score-list');
        highScoreList.innerHTML = highScores.map(score => `<li><span>High Score: </span>${score.score} - ${score.initials}</li>`).join('');
       
    }

    startButton.addEventListener('click', startQuiz);

    // Display initial timer value
    timerContainer.textContent = `Time left: ${timeLeft}`;
    

// Add this variable to keep track of whether the high score list is visible or hidden
let isHighScoreListVisible = false;


HighScore.addEventListener("click", function(){

 // Toggle the visibility of the high score list
 isHighScoreListVisible = !isHighScoreListVisible;
 highScoreList.style.display = isHighScoreListVisible ? "block" : "none";

} );
