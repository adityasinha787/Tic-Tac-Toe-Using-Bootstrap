const boxes = document.querySelectorAll(".btn.fs-1");
const resetBtn = document.querySelector("#resetBtn");
const newGameBtn = document.querySelector("#newBtn");
const msgContainer = document.querySelector("#msg-container");
const msg = document.querySelector("#msg");

let currentPlayer = "O";

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function resetGame() {
  currentPlayer = "O";
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
  msgContainer.classList.add("d-none");
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;
    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return;
    }
  }
  if ([...boxes].every(box => box.innerText !== "")) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("d-none");
  }
}

function showWinner(player) {
  msg.innerText = `Winner is ${player}`;
  msgContainer.classList.remove("d-none");
  boxes.forEach(box => box.disabled = true);
}

boxes.forEach(box => {
  box.addEventListener("click", () => {
    box.innerText = currentPlayer;
    box.disabled = true;
    checkWinner();
    currentPlayer = currentPlayer === "O" ? "X" : "O";
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
