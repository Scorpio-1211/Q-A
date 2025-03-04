const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Bệnh lây qua đường sinh dục có thể gây ra những vấn đề gì cho sức khỏe sinh sản?",
        choices: ["A. Vô sinh, đau bụng", "B. Không ảnh hưởng đến sức khỏe sinh sản", "C. Gây khó khăn trong việc mang thai", "D. Cả A và C"],
        answer: "D. Cả A và C"
    },
    {
        question: "Q. Bao cao su có thể giúp giảm nguy cơ mắc các bệnh lây qua đường sinh dục không?",
        choices: ["A. Có, nếu sử dụng đúng cách", "B. Không, bao cao su không giúp giảm nguy cơ", "C. Bao cao su chỉ bảo vệ khỏi thai ngoài ý muốn", "D. Chỉ bảo vệ khỏi một số bệnh lây qua đường sinh dục"],
        answer: "A. Có, nếu sử dụng đúng cách"
    },
    {
        question: "Q. Những dấu hiệu nào có thể cho thấy bạn mắc bệnh lây qua đường sinh dục?",
        choices: ["A. Đau khi đi tiểu, mẩn đỏ", "B. Không có dấu hiệu gì", "C. Chỉ có cảm giác mệt mỏi", "D. Ngứa cổ họng"],
        answer: "A. Đau khi đi tiểu, mẩn đỏ"
    },
    {
        question: "Q. Tại sao việc kiểm tra sức khỏe sinh sản định kỳ lại quan trọng?",
        choices: ["A. Giúp phát hiện sớm các bệnh lây qua đường sinh dục", "B. Để kiểm tra sức khỏe tim mạch", "C. Không cần thiết nếu không có triệu chứng", "D. Để kiểm tra cân nặng"],
        answer: "A. Giúp phát hiện sớm các bệnh lây qua đường sinh dục"
    },
    {
        question: "Q. Quan hệ tình dục an toàn có nghĩa là gì?",
        choices: ["A. Quan hệ tình dục chỉ với một đối tác và dùng bao cao su", "B. Quan hệ tình dục mà không cần bao cao su", "C. Quan hệ tình dục mà không cần bao cao su", "D. Quan hệ tình dục bất kỳ lúc nào không lo bệnh"],
        answer: "A. Quan hệ tình dục chỉ với một đối tác và dùng bao cao su"
    },
    {
        question: "Q. Mắc bệnh lây qua đường sinh dục có thể gây ra hậu quả nào?",
        choices: ["A. Cảm giác vui vẻ, hạnh phúc","B. Chỉ bị đau nhẹ, không nghiêm trọng","C. Có thể dẫn đến vô sinh, đau đớn","D. Không có hậu quả gì"],
        answer: "C. Có thể dẫn đến vô sinh, đau đớn"
    },
    {
        question: "Q. Làm thế nào để biết mình có mắc bệnh lây qua đường sinh dục không?",
        choices: ["A. Đi xét nghiệm tại cơ sở y tế","B. Chỉ cần đo thân nhiệt","C. Dựa vào cảm giác đau bụng","D. Không cần làm gì, bệnh sẽ tự khỏi"],
        answer: "A. Đi xét nghiệm tại cơ sở y tế"
    },
    {
        question: "Q. Nếu phát hiện có dấu hiệu bất thường sau quan hệ tình dục, bạn nên làm gì?",
        choices: ["A.Chờ vài ngày xem sao","B. Tự chữa bằng thuốc không kê đơn","C. Đi khám bác sĩ hoặc kiểm tra sức khỏe sinh sản","D. Cố gắng quên đi"],
        answer: "C. Đi khám bác sĩ hoặc kiểm tra sức khỏe sinh sản"
    },
    {
        question: "Q. Bảo vệ sức khỏe sinh sản là gì?",
        choices: ["A. Là việc tránh các bệnh lây qua đường tình dục và chăm sóc sức khỏe sinh sản","B. Là việc chỉ dùng thuốc tránh thai","C. Là việc chỉ quan hệ tình dục khi yêu","D. Là việc không quan hệ tình dục"],
        answer: "D. Là việc không quan hệ tình dục"
    },
    {
        question: "Q. Mắc bệnh lây qua đường sinh dục có thể chữa được không?",
        choices: ["A. Có, nhiều STIs có thể chữa khỏi nếu phát hiện sớm","B. Không, STIs không thể chữa được","C. Chỉ có một số bệnh có thể chữa khỏi","D. STIs chỉ có thể điều trị bằng thuốc bổ"],
        answer: "A. Có, nhiều STIs có thể chữa khỏi nếu phát hiện sớm"
    },
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 300;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Đáp án! ${quiz[currentQuestionIndex].answer} là câu trả lời đúng`);
    }
    timeLeft = 300;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 300;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 300;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});
