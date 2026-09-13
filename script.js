const questions = [
    {
        question: "Jaký typ monitoru používal CRT technologii?",
        answer: "CRT monitor používal elektronovou trubici. Obraz vznikal pomocí elektronového paprsku, který dopadal na luminoforovou obrazovku."
    },

    {
        question: "Jaká je hlavní výhoda LCD monitorů oproti CRT?",
        answer: "LCD monitory jsou mnohem tenčí, lehčí a obvykle mají nižší spotřebu energie než CRT monitory."
    },

    {
        question: "Jak funguje laserová tiskárna?",
        answer: "Laserová tiskárna vytváří obraz pomocí laseru na fotocitlivém válci a následně pomocí toneru přenese obraz na papír."
    },

    {
        question: "Jaký je rozdíl mezi inkoustovou a laserovou tiskárnou?",
        answer: "Inkoustová tiskárna používá tekutý inkoust, zatímco laserová používá toner a laserovou technologii."
    },

    {
        question: "Co znamená rozlišení monitoru například 1920 × 1080?",
        answer: "Udává počet obrazových bodů neboli pixelů na šířku a výšku obrazu. 1920 × 1080 znamená celkem 2 073 600 pixelů."
    },

    {
        question: "Co je OLED displej?",
        answer: "OLED je technologie, kde jednotlivé pixely samy vyzařují světlo. Díky tomu může mít OLED velmi hlubokou černou a vysoký kontrast."
    },

    {
        question: "K čemu se používá plotter?",
        answer: "Plotter se používá především k přesnému kreslení nebo řezání velkých výkresů, například v technickém kreslení, architektuře nebo reklamě."
    },

    {
        question: "Jaká je hlavní výhoda elektronického inkoustu (E-Ink)?",
        answer: "E-Ink spotřebovává velmi málo energie a jeho obraz je dobře čitelný i na přímém světle. Používá se například ve čtečkách elektronických knih."
    },

    {
        question: "Co je 3D tiskárna?",
        answer: "3D tiskárna vytváří skutečné trojrozměrné objekty postupným nanášením nebo zpracováním materiálu podle digitálního modelu."
    },

    {
        question: "Která technologie postupně nahradila CRT monitory jako běžné počítačové monitory?",
        answer: "CRT monitory byly postupně nahrazeny především LCD monitory, které byly tenčí, lehčí a energeticky úspornější."
    }
];


let score = 0;
let remaining = 10;

let currentIndex = -1;
let answered = false;


/* ELEMENTY */

const cards = document.querySelectorAll(".card");

const cardsBox = document.getElementById("cards");
const questionBox = document.getElementById("questionBox");
const finishBox = document.getElementById("finishBox");

const scoreElement = document.getElementById("score");
const remainingElement = document.getElementById("remaining");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const questionNumber = document.getElementById("questionNumber");
const questionElement = document.getElementById("question");

const showAnswerButton =
    document.getElementById("showAnswer");

const answerBox =
    document.getElementById("answerBox");

const answerElement =
    document.getElementById("answer");

const correctButton =
    document.getElementById("correct");

const wrongButton =
    document.getElementById("wrong");

const backButton =
    document.getElementById("back");

const restartButton =
    document.getElementById("restart");

const finalScore =
    document.getElementById("finalScore");

const resultMessage =
    document.getElementById("resultMessage");


/* KARTY */

cards.forEach(function(card) {

    card.addEventListener("click", function() {

        if (card.classList.contains("used")) {
            return;
        }

        currentIndex = Number(card.dataset.id);

        answered = false;

        const currentQuestion =
            questions[currentIndex];


        questionNumber.textContent =
            "Otázka " + (currentIndex + 1) + " z 10";

        questionElement.textContent =
            currentQuestion.question;

        answerElement.textContent =
            currentQuestion.answer;


        cardsBox.classList.add("hidden");

        finishBox.classList.add("hidden");

        questionBox.classList.remove("hidden");


        answerBox.classList.add("hidden");

        showAnswerButton.classList.remove("hidden");

        correctButton.classList.remove("hidden");

        wrongButton.classList.remove("hidden");

        backButton.classList.remove("hidden");

    });

});


/* ZOBRAZIT ODPOVĚĎ */

showAnswerButton.addEventListener("click", function() {

    answerBox.classList.remove("hidden");

    showAnswerButton.classList.add("hidden");

});


/* SPRÁVNÁ ODPOVĚĎ */

correctButton.addEventListener("click", function() {

    if (answered || currentIndex === -1) {
        return;
    }

    answered = true;

    score++;

    remaining--;

    cards[currentIndex].classList.add("used");

    updateInfo();

    finishOrContinue();

});


/* ŠPATNÁ ODPOVĚĎ */

wrongButton.addEventListener("click", function() {

    if (answered || currentIndex === -1) {
        return;
    }

    answered = true;

    remaining--;

    cards[currentIndex].classList.add("used");

    updateInfo();

    finishOrContinue();

});


/* ZPĚT */

backButton.addEventListener("click", function() {

    currentIndex = -1;

    answered = false;

    questionBox.classList.add("hidden");

    cardsBox.classList.remove("hidden");

});


/* AKTUALIZACE INFORMACÍ */

function updateInfo() {

    scoreElement.textContent = score;

    remainingElement.textContent = remaining;


    const completed = 10 - remaining;

    progressText.textContent =
        completed + " / 10";


    const percentage =
        (completed / 10) * 100;

    progressFill.style.width =
        percentage + "%";
}


/* KONEC / POKRAČOVÁNÍ */

function finishOrContinue() {

    currentIndex = -1;

    questionBox.classList.add("hidden");


    if (remaining === 0) {

        cardsBox.classList.add("hidden");

        finishBox.classList.remove("hidden");

        finalScore.textContent = score;


        if (score === 10) {

            resultMessage.textContent =
                "Perfektní! Zodpověděl/a jsi všechny otázky správně.";

        } else if (score >= 7) {

            resultMessage.textContent =
                "Výborný výsledek! O výstupních periferiích toho víš opravdu hodně.";

        } else if (score >= 5) {

            resultMessage.textContent =
                "Dobrá práce! Některé otázky byly těžší, ale základ máš.";

        } else {

            resultMessage.textContent =
                "Některé otázky byly těžké. Teď už víš, co si zopakovat.";

        }

    } else {

        cardsBox.classList.remove("hidden");

    }

}


/* HRÁT ZNOVU */

restartButton.addEventListener("click", function() {

    score = 0;

    remaining = 10;

    currentIndex = -1;

    answered = false;


    cards.forEach(function(card) {

        card.classList.remove("used");

    });


    updateInfo();


    finishBox.classList.add("hidden");

    questionBox.classList.add("hidden");

    cardsBox.classList.remove("hidden");

});