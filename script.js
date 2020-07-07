const startBtn = document.getElementById('startBtn');
const question = document.getElementById('question');
const answerOne = document.getElementById('answerOne');
const answerTwo = document.getElementById('answerTwo');
const answerThree = document.getElementById('answerThree');
const answerFour = document.getElementById('answerFour');
const LAST_LEVEL = 5;

class Game {
    constructor() {
        this.nextLevel = this.nextLevel.bind(this);
        this.answerCheck = this.answerCheck.bind(this);
        this.start();
        this.nextLevel();
    }

    start() {
        this.toggleBtn();
        this.questionNumber = 0;
        this.subLevel = 0;
        this.level = 1;
        this.texts = {
            question,
            answerOne,
            answerTwo,
            answerThree,
            answerFour
        };
    }

    toggleBtn() {
        if (startBtn.classList.contains('hide')) {
            startBtn.classList.remove('hide');
        } else {
            startBtn.classList.add('hide');
        }
    }

    generateQuestion(i = 0) {
        const questions = [
            'What is the capital of Germany?',
            'What temperature centigrade does water boil at?',
            'What company is also the name of one of the longest rivers in the world?',
            'What is the tallest mountain in the world?',
            'How many centimetres in a metre?'
        ];
        const an1 = ['Cologne', '100°C', 'Nile', 'Himalaya', '60'];
        const an2 = ['Frankfurt', '120°C', 'Amazon', 'K2', '100'];
        const an3 = ['Munich', '112°Fg', 'Mekong', 'Mount Everest', '120'];
        const an4 = ['Berlin', '100K', 'Congo', 'Makalu', '124'];
        this.texts.question.innerHTML = questions[i];
        this.texts.answerOne.innerHTML = an1[i];
        this.texts.answerTwo.innerHTML = an2[i];
        this.texts.answerThree.innerHTML = an3[i];
        this.texts.answerFour.innerHTML = an4[i];
    }

    nextLevel() {
        this.clickEventCreation();
        this.generateQuestion(this.questionNumber);
    }

    clickEventCreation() {
        this.texts.answerOne.addEventListener('click', this.answerCheck);
        this.texts.answerTwo.addEventListener('click', this.answerCheck);
        this.texts.answerThree.addEventListener('click', this.answerCheck);
        this.texts.answerFour.addEventListener('click', this.answerCheck);
    }

    answerCheck(ev) {
        const correct = [4, 1, 2, 3, 2];
        const answerNumber = ev.target.dataset.num;
        console.log(this.subLevel);
        if (answerNumber == correct[this.subLevel]) {
            this.subLevel++;
            if (this.subLevel === this.level) {
                /* correct answer */
                this.level++;
                if (this.level === LAST_LEVEL + 1) {
                    /* Winner */
                    this.gameWin();
                } else {
                    this.questionNumber++;
                    this.nextLevel();
                }
            }
        } else {
            this.gameLost();
        }
    }

    restart() {
        this.texts.question.innerHTML = 'Select one of the following options';
        this.texts.answerOne.innerHTML = '';
        this.texts.answerTwo.innerHTML = '';
        this.texts.answerThree.innerHTML = '';
        this.texts.answerFour.innerHTML = '';
        this.start();
    }

    gameWin() {
        swal('Winer!', 'You did a greate job!', 'success').then(() => {
            this.restart();
        });
    }

    gameLost() {
        swal('Incorret!', 'Good luck next time!', 'error').then(() => {
            this.restart();
        });
    }
}

function startGame() {
    window.juego = new Game();
}
