const questions = [
    {
        questions: "If a = 1 and b = 2 , what is a + b ? ",
        answer:[
            { Text: "12", correct: false},
            { Text: "3", correct: true},
            { Text: "4", correct: false},
            { Text: "10", correct: false},

        ]
    },
    {
        questions: "In the equation 2 x + 3 = 4, solve for x ",
        answer:[
            { Text: "4", correct: false},
            { Text: "10", correct: false},
            { Text: "0.5", correct: true},
            { Text: "8", correct: false},

        ]
    },
    {
        questions: "The city known as the 'IT capital of India' is  ",
        answer:[
            { Text: "Bangalore", correct: true},
            { Text: "Mumbai", correct: false},
            { Text: "Delhi", correct: false},
            { Text: "Hydrabad", correct: false},

        ]
    }
];

const questElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
//questions functions
function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questElement.innerHTML = questionNo + "." + currentQuestion.questions;
//answers functions
    currentQuestion.answer.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        //click button
        button.addEventListener("click", selectAnswer);
    });
}   
// remove all peview option like answer 1 2 3 4.......this function remove all 
    function resetState(){
        nextButton.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild)
        }
    }
    //red or green correct chosse mcq
    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        //answer green function
        Array.from(answerButtons.children).forEach(button=>{
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        //button center
        nextButton.style.display = "block";
    }

    function showScore(){
        resetState();
        questElement.innerHTML = `You scored ${score} out of ${questions.length}`;
        // nextButton.innerHTML = "Play Again";
        // nextButton.style.display = "block";
    }
    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion()
        }else{
            showScore();
        }
    }

    nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz()
        }
    })
startQuiz()