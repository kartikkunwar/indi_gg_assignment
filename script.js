const allquestions = [
    {
        question: "Who won the 2011 World Cup ?",
        answer: [
            { content: "India", isright: true },
            { content: "England", isright: false },
            { content: "Australia", isright: false },
            { content: "Neitherland", isright: false },
        ]
    },
    {
        question: "Which is Spelled Incorrectly ?",
        answer: [
            { content: "one", isright: false },
            { content: "two", isright: false },
            { content: "thre", isright: true },
            { content: "four", isright: false },
        ]
    },
    {
        question: "Which is the capital city of U.P ?",
        answer: [
            { content: "Meerut", isright: false },
            { content: "Lucknow", isright: true },
            { content: "Noida", isright: false },
            { content: "Gaziabad", isright: false },
        ]
    },
    {
        question: "Guess which is correct",
        answer: [
            { content: "one", isright: false },
            { content: "two", isright: false },
            { content: "three", isright: false },
            { content: "four", isright: true },
        ]
    },
    {
        question: "What is spelled incorrectly",
        answer: [
            { content: "Fire", isright: false },
            { content: "Stone", isright: false },
            { content: "Surface", isright: false },
            { content: "Incorectly", isright: true },
        ]
    }
]



const getquestion = document.getElementById("ques");
const butt = document.getElementById("answers");
const nxt = document.getElementById("next");
const time=document.getElementById("timer")
let ind = 0;
let score = 0;
let total = 5;
let timer;

start()

function start() {
    ind = 0;
    score = 0;
    nxt.innerHTML = "Next";
    nextquestion();
    timer = setInterval(() => {
        time.innerHTML=`${total} s Left`
        time.style.display="block"
        if (total < 1) {
            if (ind < allquestions.length) {
                ind++;
                if (ind < allquestions.length) {
                    nextquestion()
                } else {
                    showscore()
                }
            } else {
                showscore()
            }
        } else {
            total--
        }

    }, 1000)
}

function nextquestion() {
    total = 5
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
    Array.from(butt.children).forEach(el => {
        if (el.dataset.isright === "true") {
            el.classList.add("right")
        }
        el.disabled = true;
    })
    nxt.style.display = "block"
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

