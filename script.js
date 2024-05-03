const quizQuestions = [
  {
    question: "Can you identify alphabets, or have difficulty to distinguish them? Identify the second letter.",
    options: ["W", "M"],
    correctAnswer: "W",
    audio: "",
    image: "/assets/m.png",
    score: 0,
  },
  {
    question: "Do you know the sequence of alphabets and can distinctly write all letters in alphabets?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    audio: "",
    image: "",
    score: 0,
  },
  {
    question: "Is you handwriting messy like this?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    audio: "",
    image: "/assets/unclear.png",
    score: 0,
  },
  {
    question: "Is your spelling ability poor? Letters missed, reversed or backwards?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    audio: "",
    image: "/assets/abcd.png",
    score: 0,
  },
  {
    question: "Do you face difficulty getting thoughts down on paper, putting thoughts into words; halt within phrases or leaves sentences incomplete?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    audio: "",
    image: "",
    score: 0,
  },
  {
    question: "Are you able to reverse the number 81 or 18 write backwards?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    audio: "",
    image: "/assets/18.png",
    score: 0,
  },
  {
    question: "What do you hear?",
    options: ["Question mark", "Exclamation"],
    correctAnswer: "Question mark",
    audio: "/assets/question_mark.mp3",
    image: "",
    score: 0,
  },
  {
    question: "Are you having difficulty writing text from left to right on a line and within margins with correctly spacing letters in words and/or between words?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    audio: "",
    image: "",
    score: 0,
  },
  {
    question: "Do you mix up lowercase and uppercase letters or have trouble in ending sentences with punctuation?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    audio: "",
    image: "",
    score: 0,
  },
  {
    question: "What do you hear?",
    options: ["Prescribe", "Describe"],
    correctAnswer: "Describe",
    audio: "/assets/pronunciation_en_describe.mp3",
    image: "",
    score: 0,
  },
];
function displayAudioUI() {
  var audioElement = document.getElementById("question-audio");

  // Check if src attribute is not specified
  if (!audioElement.src) {
    // If src is not specified, set display to "none"
    audioElement.style.display = "none";
  }
}
displayAudioUI();

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

// Function to start the quiz
function startQuiz() {
  // Hide the start button and display the first question
  document.getElementById("start-button").style.display = "none";
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const questionImage = document.getElementById("question-image");
  const questionAudio = document.getElementById("question-audio");

  questionText.innerHTML = "";
  answerButtons.innerHTML = "";
  questionImage.src = "";
  questionAudio.src = "";

  questionText.innerHTML = currentQuestion.question;

  if (currentQuestion.image !== "") {
    questionImage.src = currentQuestion.image;
    questionImage.style.display = "block";
  } else {
    questionImage.style.display = "none";
  }
  // print(`currentQuestion.audio ${currentQuestion.audio}`);

  if (currentQuestion.audio !== "") {
    questionAudio.src = currentQuestion.audio;
    questionAudio.style.display = "block";
  } else {
    questionAudio.style.display = "none";
  }

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);

    button.addEventListener("click", function () {
      checkAnswer(option);
    });
  });
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
    currentQuestion.score = currentQuestion.score + 4;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;

    // // Update the timer text
    // document.getElementById("timer").textContent = timeLeft;

    // // End the quiz if time runs out
    // if (timeLeft <= 0) {
    //   endQuiz();
    // }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timerInterval);

  // Calculate the score percentage
  const scorePercentage = (score / quizQuestions.length) * 100;

  var languageVocabScore = 0;
  var memoryScore = 0;
  var visualDiscriminationScore = 0;
  var audioDiscriminationScore = 0;

  for (var i = 0; i < quizQuestions.length; i++) {
    if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 7) {
      languageVocabScore = languageVocabScore + quizQuestions[i].score;
    }
    if (i == 1 || i == 8) {
      memoryScore = memoryScore + quizQuestions[i].score;
    }
    if (i == 0 || i == 2 || i == 3 || i == 5) {
      visualDiscriminationScore =
        visualDiscriminationScore + quizQuestions[i].score;
    }
    if (i == 6 || i == 9) {
      audioDiscriminationScore =
        audioDiscriminationScore + quizQuestions[i].score;
    }
  }
  languageVocabScore = languageVocabScore / 28;
  memoryScore = memoryScore / 8;
  visualDiscriminationScore = visualDiscriminationScore / 16;
  audioDiscriminationScore = audioDiscriminationScore / 8;

  // Display the final score
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Language Vocabulary Score: ${languageVocabScore.toFixed(2)}</p>
    <p>Memory Score: ${memoryScore.toFixed(2)}</p>
    <p>Visual Discrimination Score: ${visualDiscriminationScore.toFixed(2)}</p>
    <p>Audio Discrimination Score: ${audioDiscriminationScore.toFixed(2)}</p>
  `;
}

// Add event listener to start the quiz when the start button is clicked
document.getElementById("start-button").addEventListener("click", startQuiz);
