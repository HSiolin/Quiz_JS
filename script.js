const questions = [
  {
    question: "Qual o animal mais rápido do mundo?",
    answers: [
      { text: "Guepardo", correct: "true" },
      { text: "Onça", correct: "false" },
      { text: "Águia", correct: "false" },
      { text: "Gavião", correct: "false" },
    ],
  },
  {
    question: "Qual maior país do mundo?",
    answers: [
      { text: "Brasil", correct: "false" },
      { text: "Rússia", correct: "true" },
      { text: "Estados Unidos", correct: "false" },
      { text: "Canadá", correct: "false" },
    ],
  },
  {
    question: "De quem é a famosa frase “Penso, logo existo”?",
    answers: [
      { text: "Platão", correct: "false" },
      { text: "Sócrates", correct: "false" },
      { text: "Descartes", correct: "true" },
      { text: "Francis Bacon", correct: "false" },
    ],
  },
  {
    question: "Qual o menor país do mundo?",
    answers: [
      { text: "Vaticano", correct: "true" },
      { text: "Mônaco", correct: "false" },
      { text: "Malta", correct: "false" },
      { text: "Nauru", correct: "false" },
    ],
  },
  {
    question: "Quantas casas decimais tem o número pi?",
    answers: [
      { text: "Centenas", correct: "false" },
      { text: "Duas", correct: "false" },
      { text: "Vinte", correct: "false" },
      { text: "Infinitas", correct: "true" },
    ],
  },
];

const questionElement = document.getElementById("question");

const answerButtons = document.getElementById("answer-buttons");

const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Você acertou ${score} fora as ${questions.length} questões!`;
  nextButton.innerHTML = "Jogue Novamente";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
