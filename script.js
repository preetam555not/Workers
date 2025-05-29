let board;
let currentPlayer = 'X';
let gameOver = false;

function createBoard() {
  board = Array(9).fill('');
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  gameOver = false;
  document.getElementById('status').innerText = '';
  board.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.addEventListener('click', () => makeMove(i));
    boardDiv.appendChild(cell);
  });
}

function makeMove(i) {
  if (board[i] || gameOver) return;
  board[i] = currentPlayer;
  document.getElementById('board').children[i].innerText = currentPlayer;
  if (checkWin()) {
    document.getElementById('status').innerText = currentPlayer + ' wins!';
    gameOver = true;
    return;
  }
  if (!board.includes('')) {
    document.getElementById('status').innerText = "It's a draw!";
    gameOver = true;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (currentPlayer === 'O') {
    setTimeout(makeBotMove, 500);
  }
}

function makeBotMove() {
  if (gameOver) return;
  let empty = board.map((val, i) => val === '' ? i : null).filter(i => i !== null);
  let move = empty[Math.floor(Math.random() * empty.length)];
  makeMove(move);
}

function checkWin() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return wins.some(comb => 
    comb.every
