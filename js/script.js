// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
    {
        "question": "Em qual ano o brasil foi descoberto?",
        "answers": [
            {
                "answer": "1900",
                "correct": false
            },
            {
                "answer": "1500",
                "correct": true
            },
            {
                "answer": "1982",
                "correct": false
            },
            {
                "answer": "2023",
                "correct": false
            },
            {
                "answer": "1800",
                "correct": false
            },
        ]
    },
    {
        "question": "Em qual data se iníciou a segunda guerra mundial",
        "answers": [
            {
                "answer": "02/05/1984",
                "correct": false
            },
            {
                "answer": "02/05/1955",
                "correct": false
            },
            {
                "answer": "01/09/1939",
                "correct": true
            },
            {
                "answer": "02/09/1945",
                "correct": false
            },
            {
                "answer": "26/08/1946",
                "correct": false
            },
        ]
    },
    {
        "question": "Em qual data finalizou a segunda guerra mundial",
        "answers": [
            {
                "answer": "02/05/1984",
                "correct": false
            },
            {
                "answer": "02/05/1955",
                "correct": false
            },
            {
                "answer": "01/09/1939",
                "correct": false
            },
            {
                "answer": "02/09/1945",
                "correct": true
            },
            {
                "answer": "26/08/1946",
                "correct": false
            },
        ]
    },
]

// Substituição do layout pela primeira questão
function init() {
    createQuestion(0)
}

// Create a question 
function createQuestion(i) {

    // Limpa questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function (btn) {
        btn.remove();
    });

    // Altera texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere alternativas
    questions[i].answers.forEach(function (answer, i) {

        // Altera texto do template
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // remove classe de hide e template do template
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Insere template na tela
        answersBox.appendChild(answerTemplate);

    });

 
    const buttons = answersBox.querySelectorAll("button");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            checkAnswer(this, buttons);
        });
    });

    // Incrementa o número atual de questões
    actualQuestion++;

}

// Verificando se resposta está correta
function checkAnswer(btn, buttons) {

    // Exibir respostas erradas e a certa
    buttons.forEach(function (button) {

        if (button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer");
            // checa se o usuário acertou
            if (btn === button) {
                // incrementa os pontos
                points++;
            }
        } else {
            button.classList.add("wrong-answer");
        }

    });

    nextQuestion();

}


function nextQuestion() {

    // Timer para ver se acertou ou errou
    setTimeout(function () {

        // checa se ainda há mais perguntas
        if (actualQuestion >= questions.length) {
            // apresenta msg de sucesso
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion)

    }, 1000);

}

// Tela final
function showSuccessMessage() {

    hideOrShowQuizz();

    // calc score
    const score = ((points / questions.length) * 100).toFixed(2);
    const scoreDisplay = document.querySelector("#display-score span");

    scoreDisplay.textContent = score.toString();

    // alterar número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    // alterar total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;

}

// functio que reinicia Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function () {
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
});

// Mostra o quizz
function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

init();