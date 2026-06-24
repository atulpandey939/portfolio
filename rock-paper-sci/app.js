let userScore = 0;
let compScore = 0;
const winningScore = 5; // Best of 5 match point
let isGameOver = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#userScore");
const compScorePara = document.querySelector("#compScore");
const resetBtn = document.querySelector("#reset-btn");
const matchStatus = document.querySelector("#match-status");

const drawGame = () => {
  msg.innerText = "Game was a draw. Play again!";
  msg.style.background = "#334155";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.background = "#16a34a"; // Vibrant Green
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`;
    msg.style.background = "#dc2626"; // Vibrant Red
  }

  checkMatchWinner();
};

const checkMatchWinner = () => {
  if (userScore === winningScore || compScore === winningScore) {
    isGameOver = true;

    // Announce Grand Winner
    if (userScore === winningScore) {
      msg.innerText = "🎉 YOU WON THE MATCH! 🎉";
      msg.style.background = "#15803d";
    } else {
      msg.innerText = "💀 COMPUTER WON THE MATCH! 💀";
      msg.style.background = "#b91c1c";
    }

    // Show reset button and disable choices
    resetBtn.classList.remove("hide");
    choices.forEach((choice) => choice.classList.add("disabled"));
    matchStatus.innerText = "Match Over!";
  }
};

const playGame = (userChoice) => {
  // Prevent playing if match is already over
  if (isGameOver) return;

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "Rock") {
      userWin = compChoice === "Paper" ? false : true;
    } else if (userChoice === "Paper") {
      userWin = compChoice === "Scissors" ? false : true;
    } else {
      userWin = compChoice === "Rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

const genCompChoice = () => {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIdx = Math.floor(Math.random() * 3);
  return options[randomIdx];
};

// Start a fresh match
const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";
  isGameOver = false;

  msg.innerText = "Play your Move";
  msg.style.background = "#1e293b";
  matchStatus.innerText = `First to ${winningScore} points wins!`;

  resetBtn.classList.add("hide");
  choices.forEach((choice) => choice.classList.remove("disabled"));
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", resetGame);
