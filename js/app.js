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

    // Ignore clicks on non-square elements or invalid indices
    if (!square.classList.contains('sqr') || isNaN(squareIndex)) return;

    // Ignore clicks if square is already taken or game is over
    if (board[squareIndex] !== '' || winner) return;

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  }

  function placePiece(index) {
    board[index] = turn;
  }

  function checkForWinner() {
    winner = false; // reset winner before checking
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        board[a] !== '' &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        winner = true;
        break; // stop checking once winner found
      }
    }
  }

  function checkForTie() {
    if (winner) {
      tie = false;
      return;
    }
    tie = board.every(cell => cell !== '');
  }

  function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
  }

  // Start the game on page load
  init();
});
