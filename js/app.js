document.addEventListener('DOMContentLoaded', () => {
  /*-------------------------------- Constants --------------------------------*/

  const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6], // Diagonal from top-right
  ];

  /*---------------------------- Variables (state) ----------------------------*/

  let board;
  let turn;
  let winner;
  let tie;

  /*------------------------ Cached Element References ------------------------*/

  const squareEls = document.querySelectorAll('.sqr');
  const messageEl = document.querySelector('#message');
  const resetBtnEl = document.querySelector('#reset');

  /*----------------------------- Event Listeners -----------------------------*/

  squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
  });

  if (resetBtnEl) {
    resetBtnEl.addEventListener('click', init);
  }

  /*-------------------------------- Functions --------------------------------*/

  function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
  }

  function render() {
    updateBoard();
    updateMessage();
  }

  function updateBoard() {
    board.forEach((cell, index) => {
      squareEls[index].textContent = cell;
    });
  }

  function updateMessage() {
    if (winner) {
      messageEl.textContent = `🎉 Player ${turn} Wins!`;
    } else if (tie) {
      messageEl.textContent = `😬 It's a Tie!`;
    } else {
      messageEl.textContent = `Player ${turn}'s Turn`;
    }
  }

  function handleClick(evt) {
    const square = evt.target;
    const squareIndex = parseInt(square.id);

    if (!square.classList.contains('sqr') || isNaN(squareIndex)) return;
    if (board[squareIndex] !== '' || winner) return;

    console.log(`Player ${turn} clicked square ${squareIndex}`);

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    render();
    switchPlayerTurn();
  }

  function placePiece(index) {
    board[index] = turn;
  }

  function checkForWinner() {
    winner = false;
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        board[a] !== '' &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        winner = true;
        console.log(`Player ${turn} wins with combo: [${a}, ${b}, ${c}]`);
        break;
      }
    }
  }

  function checkForTie() {
    if (winner) {
      tie = false;
      return;
    }
    tie = board.every(cell => cell !== '');
    if (tie) console.log("It's a tie!");
  }

  function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
  }

  init();
});
