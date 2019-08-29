let questionNumber = 0;
let score = 0;
const $CONTAINER = $(`#js-mainContent`)

// array of questions, answer options, and correctAnswers
const quizQuestions = [

    {
        question: "1. Where is Honda's country of origin?",
        answers: [
            "India",
            "Japan",
            "South Korea",
            "Russia"
        ],
        correctAnswer: "Japan"
    },
    {
        question: "2. Where is BMW's country of origin?",
        answers: [
            "Germany",
            "Belgium",
            "Italy",
            "England"
        ],
        correctAnswer: "Germany"
    },
    {
        question: "3. Where is Porsche's country of origin?",
        answers: [
            "Italy",
            "Japan",
            "France",
            "Germany"
        ],
        correctAnswer: "Germany"
    },
    {
        question: "4. What vehicle Brand is made in Italy?",
        answers: [
            "Mercedes-Benz",
            "Ford",
            "Fiat",
            "Peugot"
        ],
        correctAnswer: "Fiat"
    },
    {
        question: "5. Where does the SEAT brand originate from?",
        answers: [
            "Spain",
            "Ireland",
            "Russia",
            "South Korea"
        ],
        correctAnswer: "Spain"
    },

];

// runs the start your engine button, intiates the quiz
function handleStartQuiz() {
    $('#start-button').on('click', ev => {
        ev.preventDefault()
        questionNumber = 0;
        score = 0;
        changeQuestionNumber()
        displayCurrentQuestion()
        displayScore()
        $('#start-title').hide()
    })
}

//changes the question number inheader and moves along to the next question
function handleNextButton() {
    questionNumber++
   
    displayCurrentQuestion();
    changeQuestionNumber();
    
}
// displays questions along with optioons and renders them in the DOM
function displayCurrentQuestion() {
    console.log(`Question number: ${questionNumber}`)
    const currentQ = quizQuestions[questionNumber]
    const input = currentQ.answers.map((answerStr, index) => {
        return `
    <label class="choices-label"> ${answerStr} 
    <input name="one" class="choices" type="radio" required value="${answerStr}"></input>
    </label>    
    
    
    `
    })

    const htmlString = $(`
 <form id="myForm">  
    <h2>${quizQuestions[questionNumber].question}</h2>
    <p>
    <fieldset > 
    <legend>Options</legend>   
    <div class="choices-wrapper">     
            ${input.join('\n')}          
    </div>             
    </fieldset>
    </p>
    <div>
        <input type="submit" value="Next" class="js-next-button" />
    </div>
</form>
`)
    $($CONTAINER).html(htmlString)

}
// displays the score on the banner
function displayScore() {
    $('.score').text(score)
    //update the score in the heading by ++
}
// displays the question number increase on the banner
function changeQuestionNumber() {
    $('.questionNumber').text(questionNumber + 1)
}
// handles the submit button, whether to change it to the right or wrong answer
//on the last question of the array it shifts it to the restart quiz button alng with total score
//shifts from correct/incorrect screen back to the question in the array
function handleAnswerInput() {
    $('body').on('click', '#js-submit-button', event => {
        if (questionNumber === 4){
            event.preventDefault()
            resultsPage()
        } else {
            event.preventDefault()
            handleNextButton()
    }
       
    })
    $('body').on('submit', '#myForm', event => {
        event.preventDefault()
        let choiceMade = $('input[name=one]:checked').val()
        if (choiceMade === quizQuestions[questionNumber].correctAnswer) {
            score++
            ifAnswerCorrect()
            displayScore()
        }
        else {
            ifAnswerIncorrect()
        }
    });
}


// correct answer screen
function ifAnswerCorrect() {
    let correctAnswer = `${quizQuestions[questionNumber].correctAnswer}`;
    $CONTAINER.html(` <section id="feedback-page" >
              <h1>Correct Answer</h1>
                  <h2 >Correct! The right answer is: ${correctAnswer} </h2>
                      <img src="https://cdn.pixabay.com/photo/2017/06/11/11/46/auto-2392167__340.jpg" alt="Car doing burnout">
                      </section>
                      <button id="js-submit-button">Sumbit</button>
          `)
}
//incorrect answers screen 
function ifAnswerIncorrect() {
    let correctAnswer = `${quizQuestions[questionNumber].correctAnswer}`;
    $CONTAINER.html(`<div id="incorrect-page" >
<h1>Incorrect Answer</h1>
    <h2>Sorry, wrong answer! The right answer was ${correctAnswer}!</h2>
          <img src="https://i2-prod.mirror.co.uk/incoming/article7776851.ece/ALTERNATES/s615/Ferrari-458-Spider-wreck.jpg" alt="Wrecked Ferrari">
</div>
    <button id="js-submit-button">Submit</button>`);
}
//results screen 
function resultsPage() {
    $CONTAINER.html(`
    <section id="final-page">
      <h1>Final Score Results</h1>
      <h2>Final Score: ${score} out of 5</h2>
      <button id="js-restart-button">Try Again?</button>
    </section>`)
 }
// reloads wep page to restart quiz
function restartQuiz(){
    $('body').on('click', '#js-restart-button', event => {
        window.location.reload();
    })
}
 
//implements the functions to be loaded on the wbe page
const main = () => {
    handleStartQuiz()
    handleAnswerInput()
    restartQuiz()
}

//when the DOM is ready
$(main)