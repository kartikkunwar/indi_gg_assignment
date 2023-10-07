const allquestions = [
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        answer: [
            { content: "var", isright: false },
            { content: "let", isright: false },
            { content: "Both", isright: true },
            { content: "None", isright: false },
        ]
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        answer: [
            { content: "const", isright: true },
            { content: "var", isright: false },
            { content: "let", isright: false },
            { content: "constant", isright: false },
        ]
    },
    {
        question: "Which of the following are closures in Javascript?",
        answer: [
            { content: "Variables", isright: false },
            { content: "Functions", isright: false },
            { content: "Objects", isright: false },
            { content: "All of the above", isright: true },
        ]
    },
    {
        question: "How do we write a comment in javascript?",
        answer: [
            { content: "//", isright: true },
            { content: "/**/", isright: false },
            { content: "#", isright: false },
            { content: "$", isright: false },
        ]
    },
    {
        question: "How to stop an interval timer in Javascript?",
        answer: [
            { content: "clearTimer", isright: false },
            { content: "intervalOver", isright: false },
            { content: "clearInterval", isright: true },
            { content: "None of the above", isright: false },
        ]
    }
]



const getquestion = document.getElementById("ques");
const butt = document.getElementById("answers");
const nxt = document.getElementById("next");
const time=document.getElementById("timer")
let ind = 0;
let score = 0;
let total = 10;
let timer;

start()

function getRight(){
    Array.from(butt.children).forEach(el => {
        if (el.dataset.isright === "true") {
            el.classList.add("right")
        }
        el.disabled = true;
    })
    nxt.style.display = "block"
}

function start() {
    ind = 0;
    score = 0;
    nxt.innerHTML = "Next";
    nextquestion();
    timer = setInterval(() => {
        time.innerHTML=`${total} s Left`
        time.style.display="block"
        if (total < 1) {
            getRight()
        } else {
            total--
        }

    }, 1000)
}

function nextquestion() {
    total = 10
    resetall()
    let current = allquestions[ind];
    let num = ind + 1;
    getquestion.innerHTML = num + ". " + current.question

    current.answer.forEach(el => {
        const button = document.createElement("button");
        button.innerHTML = el.content;
        button.classList.add("butt")
        butt.appendChild(button)
        if (el.isright) {
            button.dataset.isright = el.isright
        }
        button.addEventListener("click", select)
    })

}
function resetall() {
    nxt.style.display = "none";
    while (butt.firstChild) {
        butt.removeChild(butt.firstChild)
    }
}

function select(e) {
    const btn = e.target;
    const corr = btn.dataset.isright === "true"
    if (corr) {
        btn.classList.add("right")
        score++
    } else {
        btn.classList.add("wrong")
    }
    getRight()
}

nxt.addEventListener("click", () => {
    if (ind < allquestions.length) {
        ind++;
        if (ind < allquestions.length) {
            nextquestion()
        } else {
            showscore()
        }
    } else {
        start()
    }
})


function showscore() {
    clearInterval(timer)
    resetall();
    time.style.display="none"
    getquestion.innerHTML = `Your score is ${score} out of ${allquestions.length}`
    nxt.innerHTML = "Score again"
    nxt.style.display = "block"
}

