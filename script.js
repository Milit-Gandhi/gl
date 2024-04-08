// Toggle sidebar menu
// const menuToggle = document.getElementById("menu-toggle");
// const menuList = document.querySelector(".menu-list");

// menuToggle.addEventListener("click", () => {
//     console.log("clicked")
//     menuList.classList.toggle("show");
// });




var timerElement;
const isAuto = false;
let timeLeft;
const questions = new Map([
    ["ek", "1"],
    ["be", "2"],
    ["tran", "3"],
    ["chār", "4"],
    ["paanch", "5"],
    ["chha", "6"],
    ["sāt", "7"],
    ["aath", "8"],
    ["nau", "9"],
    ["dus", "10"],
    ["agyār", "11"],
    ["bār", "12"],
    ["ter", "13"],
    ["chaud", "14"],
    ["pandar", "15"],
    ["sod", "16"],
    ["satrar", "17"],
    ["adhār", "18"],
    ["odanis", "19"],
    ["vis", "20"],
    ["ekvīs", "21"],
    ["baavīs", "22"],
    ["tevis", "23"],
    ["chovīs", "24"],
    ["pachhīs", "25"],
    ["chhavis", "26"],
    ["sattyāvīs", "27"],
    ["atthāvīs", "28"],
    ["odantris", "29"],
    ["trīs", "30"],
    ["ikatris", "31"],
    ["bartris", "32"],
    ["tetālis", "33"],
    ["chotris", "34"],
    ["patris", "35"],
    ["chatris", "36"], ["sadatris", "37"],
    ["adatris", "38"],
    ["odanchalis", "39"],
    ["chālis", "40"],
    ["ikatālīs", "41"],
    ["betalis", "42"],
    ["taintālīs", "43"],
    ["chumbatalis", "44"],
    ["pistalis", "45"],
    ["chetalis", "46"],
    ["sudtalis", "47"],
    ["adtalis", "48"],
    ["oganpachas", "49"],
    ["pachās", "50"],
    ["ikavan", "51"],
    ["bāvan", "52"],
    ["tepan", "53"],
    ["chopan", "54"],
    ["pachavan", "55"],
    ["chappan", "56"],
    ["satavan", "57"],
    ["āthavan", "58"],
    ["ogansahet", "59"],
    ["sāhet", "60"],
    ["iksath", "61"],
    ["bāsath", "62"],
    ["tresath", "63"],
    ["chosath", "64"],
    ["pasath", "65"],
    ["chasath", "66"],
    ["sadhsath", "67"],
    ["ādhsath", "68"],
    ["ogansither", "69"],
    ["sitter", "70"],
    ["ekotter", "71"],
    ["Bōtēr", "72"],
    ["tyoter", "73"],
    ["chumboter", "74"],
    ["pinchoter", "75"],
    ["chyoter", "76"],
    ["sityoter", "77"],
    ["ithyoter", "78"],
    ["ogan-esi", "79"],
    ["esi", "80"],
    ["ekyasi", "81"],
    ["byasi", "82"],
    ["teryasi", "83"],
    ["choryasi", "84"],
    ["panchyasi", "85"],
    ["Chyāśī", "86"],
    ["satyasi", "87"],
    ["athyasi", "88"],
    ["Nēvyāsī", "89"],
    ["nev", "90"],
    ["ekanu", "91"],
    ["banu", "92"],
    ["tranu", "93"],
    ["choranu", "94"],
    ["panchanu", "95"],
    ["Chan-nu", "96"],
    ["Satanu", "97"],
    ["Athanu", "98"],
    ["navanu", "99"],
]);

// Retrieve the HTML elements
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const speakButton = document.getElementById("listen-btn");

// Initialize variables
let currentQuestionIndex;
let currentQuestions;


function selectOption(selectedOptionText, correctOptionText) {
    const options = document.querySelectorAll('.option');

    // Remove click listener from all options to prevent further interaction
    options.forEach(option => {
        option.removeEventListener('click', optionClickListener);
    });

    // Loop through each option to handle highlighting
    options.forEach(option => {
        if (option.textContent === selectedOptionText && option.textContent === correctOptionText) {
            option.classList.add('correct');
        }
        else if (option.textContent === selectedOptionText && option.textContent != correctOptionText) {
            option.classList.add('incorrect');
        }
        else {
            if (option.textContent === correctOptionText) {
                option.classList.add('correct');
            }
            option.classList.add('disabled');
        }

    });


    if (this.isAuto) {
       
       
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            setTimeout(loadQuestion, 100);
        } // Automatically load the next question after a delay
        

    }
}



function optionClickListener() {
    const selectedOption = this;
    console.log("Option clicked:", selectedOption.textContent); // Log the clicked option's text content
    const answer = selectedOption.getAttribute('data-answer');
    selectOption(selectedOption.textContent, answer);
}


// Function to load a new question
function loadQuestion() {
    const [question, answer] = currentQuestions[currentQuestionIndex];

    // Display the question
    questionContainer.textContent = question;
    optionsContainer.innerHTML = "";

    // Fetch other possible options
    const options = [];
    questions.forEach((value, key) => {
        if (key !== question) {
            options.push(value);
        }
    });

    // Shuffle options array
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    // Randomly select 3 options from options array
    const randomOptions = options.slice(0, 3);
    randomOptions.push(answer);
    randomOptions.sort(() => Math.random() - 0.5); // Shuffle options again

    // Create HTML elements for options and append to options container
    randomOptions.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.setAttribute('data-answer', answer);
        optionElement.addEventListener("click", optionClickListener);
        optionsContainer.appendChild(optionElement);
    });
}

// Event listener for the Next button click
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        // Display a message or perform other actions when all questions have been answered
        console.log("All questions answered!");
    }
});

// Function to initialize the quiz
// Function to initialize the quiz
function initializeQuiz(isAuto) {
    this.isAuto = isAuto;
    if(isAuto){
       
        startTimer();
    }
    // Convert the Map to an array for easier manipulation
    currentQuestions = Array.from(questions);
    // Shuffle the questions array
    currentQuestions.sort(() => Math.random() - 0.5);
    // Start with the first question
    currentQuestionIndex = 0;
    loadQuestion();
}


// Function to speak the question with a specific voice
function speakQuestion() {
    const questionText = questionContainer.textContent;
    const utterance = new SpeechSynthesisUtterance(questionText);

    // Get all available voices
    const availableVoices = speechSynthesis.getVoices();

    // Find the voice with the desired characteristics (e.g., a female voice)
    const femaleVoice = availableVoices.find(voice => voice.name === 'Google UK English Female');

    // Set the voice property of the utterance to the desired voice
    utterance.voice = femaleVoice;

    // Speak the utterance
    speechSynthesis.speak(utterance);
}

// Event listener for the speak button click
speakButton.addEventListener("click", speakQuestion);


// Call initializeQuiz to start the quiz when the page loads
// initializeQuiz();



// Function to save statistics to a text file
function saveStatisticsToFile() {
    // Prepare data to be saved
    const data = `Total Answers: ${totalAnswers}\r\nCorrect Answers: ${correctAnswers}\r\nIncorrect Answers: ${incorrectAnswers}`;

    // Create a blob containing the data
    const blob = new Blob([data], { type: 'text/plain' });

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'exam_statistics.txt';

    // Append the anchor element to the body and click it programmatically to trigger download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
}

// Call saveStatisticsToFile function when the exam is finished
function examFinished() {
    saveStatisticsToFile();
    // Optionally, reset the statistics for the next exam
    totalAnswers = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
}

// Call examFinished function when the user completes the exam
// For example, when all questions have been answered


function startTimer(){
        
    this.timerElement = document.getElementById("timer");
     this.timeLeft = 60; // Initial time in seconds
    // const timerElement = document.getElementById("timer");
    // updateTimer();
    console.log("h")
   
    const timerInterval = setInterval(updateTimer, 1000);
}




function updateTimer() {
   
    if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timerElement.textContent = timeLeft;
        console.log(timeLeft);
    } else {
        examFinished();
        // Timer expired, complete the assessment
        console.log("Time's up! Assessment completed.");
        // Add your code to handle assessment completion here
    }
}
