const questions = [

    {
        question:
            "Jaký typ monitoru používal CRT technologii?",

        answer:
            "CRT monitor používal elektronovou trubici. Obraz vznikal pomocí elektronového paprsku, který dopadal na luminoforovou obrazovku."
    },

    {
        question:
            "Jaká je hlavní výhoda LCD monitorů oproti CRT?",

        answer:
            "LCD monitory jsou mnohem tenčí, lehčí a obvykle mají nižší spotřebu energie než CRT monitory."
    },

    {
        question:
            "Jak funguje laserová tiskárna?",

        answer:
            "Laserová tiskárna vytváří obraz pomocí laseru na fotocitlivém válci a následně pomocí toneru přenese obraz na papír."
    },

    {
        question:
            "Jaký je rozdíl mezi inkoustovou a laserovou tiskárnou?",

        answer:
            "Inkoustová tiskárna používá tekutý inkoust, zatímco laserová používá toner a laserovou technologii."
    },

    {
        question:
            "Co znamená rozlišení monitoru například 1920 × 1080?",

        answer:
            "Udává počet obrazových bodů neboli pixelů na šířku a výšku obrazu. 1920 × 1080 znamená celkem 2 073 600 pixelů."
    },

    {
        question:
            "Co je OLED displej?",

        answer:
            "OLED je technologie, kde jednotlivé pixely samy vyzařují světlo. Díky tomu může mít OLED velmi hlubokou černou a vysoký kontrast."
    },

    {
        question:
            "K čemu se používá plotter?",

        answer:
            "Plotter se používá především k přesnému kreslení nebo řezání velkých výkresů, například v technickém kreslení, architektuře nebo reklamě."
    },

    {
        question:
            "Jaká je hlavní výhoda elektronického inkoustu (E-Ink)?",

        answer:
            "E-Ink spotřebovává velmi málo energie a jeho obraz je dobře čitelný i na přímém světle. Používá se například ve čtečkách elektronických knih."
    },

    {
        question:
            "Co je 3D tiskárna?",

        answer:
            "3D tiskárna vytváří skutečné trojrozměrné objekty postupným nanášením nebo zpracováním materiálu podle digitálního modelu."
    },

    {
        question:
            "Která technologie postupně nahradila CRT monitory jako běžné počítačové monitory?",

        answer:
            "CRT monitory byly postupně nahrazeny především LCD monitory, které byly tenčí, lehčí a energeticky úspornější."
    }

];


let score = 0;
let remaining = 10;

let currentIndex = -1;
let answered = false;


/* =========================
   ELEMENTY
========================= */

const cards =
    document.querySelectorAll(".card");

const cardsBox =
    document.getElementById("cards");

const questionBox =
    document.getElementById("questionBox");

const finishBox =
    document.getElementById("finishBox");

const scoreElement =
    document.getElementById("score");

const remainingElement =
    document.getElementById("remaining");

const progressText =
    document.getElementById("progressText");

const progressFill =
    document.getElementById("progressFill");

const questionNumber =
    document.getElementById("questionNumber");

const questionElement =
    document.getElementById("question");

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

const finalScoreFill =
    document.getElementById("finalScoreFill");

const resultMessage =
    document.getElementById("resultMessage");

const feedback =
    document.getElementById("feedback");

const feedbackIcon =
    document.getElementById("feedbackIcon");

const feedbackText =
    document.getElementById("feedbackText");


/* =========================
   KARTY
========================= */

cards.forEach(function(card) {

    card.addEventListener("click", function() {

        if (
            card.classList.contains("used") ||
            currentIndex !== -1
        ) {
            return;
        }

        currentIndex =
            Number(card.dataset.id);

        answered = false;

        const currentQuestion =
            questions[currentIndex];


        questionNumber.textContent =
            "Otázka " +
            (currentIndex + 1) +
            " z 10";

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


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


/* =========================
   ZOBRAZIT ODPOVĚĎ
========================= */

showAnswerButton.addEventListener(
    "click",
    function() {

        answerBox.classList.remove("hidden");

        showAnswerButton.classList.add("hidden");

        answerBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* =========================
   SPRÁVNĚ
========================= */

correctButton.addEventListener(
    "click",
    function() {

        if (
            answered ||
            currentIndex === -1
        ) {
            return;
        }

        answered = true;

        score++;

        remaining--;

        cards[currentIndex]
            .classList.add("used");

        updateInfo();

        showFeedback(
            true,
            "Správně! +1 bod"
        );

        animateScore();

        finishOrContinue();

    }
);


/* =========================
   ŠPATNĚ
========================= */

wrongButton.addEventListener(
    "click",
    function() {

        if (
            answered ||
            currentIndex === -1
        ) {
            return;
        }

        answered = true;

        remaining--;

        cards[currentIndex]
            .classList.add("used");

        updateInfo();

        showFeedback(
            false,
            "Špatně — bod tentokrát nezískáváš."
        );

        finishOrContinue();

    }
);


/* =========================
   ZPĚT
========================= */

backButton.addEventListener(
    "click",
    function() {

        currentIndex = -1;

        answered = false;

        questionBox.classList.add("hidden");

        cardsBox.classList.remove("hidden");

    }
);


/* =========================
   AKTUALIZACE
========================= */

function updateInfo() {

    scoreElement.textContent =
        score;

    remainingElement.textContent =
        remaining;


    const completed =
        10 - remaining;

    progressText.textContent =
        completed + " / 10";


    const percentage =
        (completed / 10) * 100;

    progressFill.style.width =
        percentage + "%";
}


/* =========================
   ANIMACE BODŮ
========================= */

function animateScore() {

    scoreElement.style.transform =
        "scale(1.35)";

    setTimeout(function() {

        scoreElement.style.transform =
            "scale(1)";

    }, 250);

}


/* =========================
   FEEDBACK
========================= */

function showFeedback(
    isCorrect,
    message
) {

    feedback.classList.remove(
        "hidden",
        "show",
        "correct",
        "wrong"
    );


    feedback.classList.add(
        isCorrect
            ? "correct"
            : "wrong"
    );


    feedbackIcon.textContent =
        isCorrect
            ? "✓"
            : "✕";

    feedbackText.textContent =
        message;


    void feedback.offsetWidth;

    feedback.classList.add("show");


    setTimeout(function() {

        feedback.classList.add("hidden");

    }, 1800);

}


/* =========================
   KONEC / POKRAČOVÁNÍ
========================= */

function finishOrContinue() {

    currentIndex = -1;

    questionBox.classList.add("hidden");


    if (remaining === 0) {

        cardsBox.classList.add("hidden");

        finishBox.classList.remove("hidden");

        finalScore.textContent =
            score;


        const percentage =
            (score / 10) * 100;

        setTimeout(function() {

            finalScoreFill.style.width =
                percentage + "%";

        }, 100);


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


        createConfetti();

    } else {

        cardsBox.classList.remove("hidden");

    }

}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const amount = 35;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement("span");

        piece.style.position =
            "fixed";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top =
            "-20px";

        piece.style.width =
            Math.random() * 7 + 4 + "px";

        piece.style.height =
            Math.random() * 12 + 6 + "px";

        piece.style.background =
            [
                "#38bdf8",
                "#2563eb",
                "#22c55e",
                "#facc15",
                "#ffffff"
            ][
                Math.floor(
                    Math.random() * 5
                )
            ];

        piece.style.zIndex =
            "50";

        piece.style.borderRadius =
            "2px";

        piece.style.pointerEvents =
            "none";

        document.body.appendChild(piece);


        const duration =
            Math.random() * 1800 + 1800;

        piece.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }
        );


        setTimeout(function() {

            piece.remove();

        }, duration);

    }

}


/* =========================
   HRÁT ZNOVU
========================= */

restartButton.addEventListener(
    "click",
    function() {

        score = 0;

        remaining = 10;

        currentIndex = -1;

        answered = false;


        cards.forEach(function(card) {

            card.classList.remove("used");

        });


        finalScoreFill.style.width =
            "0%";


        updateInfo();


        finishBox.classList.add("hidden");

        questionBox.classList.add("hidden");

        cardsBox.classList.remove("hidden");

    }
);


/* =========================
   KLÁVESNICE
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        /* ENTER = zobrazit odpověď */

        if (
            event.key === "Enter" &&
            currentIndex !== -1 &&
            !answerBox.classList.contains("hidden")
        ) {
            return;
        }


        if (
            event.key === "Enter" &&
            currentIndex !== -1 &&
            !showAnswerButton.classList.contains("hidden")
        ) {

            showAnswerButton.click();

        }


        /* S = SPRÁVNĚ */

        if (
            event.key.toLowerCase() === "s" &&
            currentIndex !== -1 &&
            !answerBox.classList.contains("hidden")
        ) {

            correctButton.click();

        }


        /* X = ŠPATNĚ */

        if (
            event.key.toLowerCase() === "x" &&
            currentIndex !== -1 &&
            !answerBox.classList.contains("hidden")
        ) {

            wrongButton.click();

        }

    }
);


/* =========================
   START
========================= */

updateInfo();
