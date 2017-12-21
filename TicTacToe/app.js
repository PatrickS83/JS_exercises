const board = [[], [], []];
const boardGrid = document.querySelector('.gamegrid');
const winSpan = document.querySelector('#wintag');

let player1;
let win;

// handles the UI
const ui = {
  // ID to cancel startParty interval
  partyID: 0,
  // random blinking colors in board spaces after winning
  startParty() {
    this.partyID = setInterval(() => {
      const boardSpace = document.querySelectorAll('.gamespace');
      boardSpace.forEach((space) => {
        const boardElem = space;
        const x = Math.floor(Math.random() * 256);
        const y = Math.floor(Math.random() * 256);
        const z = Math.floor(Math.random() * 256);
        const bgColor = `rgb(${x}, ${y}, ${z})`;
        boardElem.style.backgroundColor = bgColor;
      });
    }, 200);
  },

  // displays win/tie text on game end
  displayGameEnd(winTie) {
    if (winTie === 'win') {
      winSpan.classList.add('winactive');
      if (player1) {
        winSpan.innerHTML = 'Player X won!';
      } else {
        winSpan.innerHTML = 'Player O won!';
      }
      this.startParty();
    } else if (winTie === 'tie') {
      winSpan.classList.add('winactive');
      winSpan.innerHTML = 'It"s a Tie!';
    }
  },
  // displays the board in browser
  drawBoard() {
    boardGrid.innerHTML = '';
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        // create div with ID and Class for gameboard
        const space = document.createElement('div');
        space.classList.add('gamespace');
        space.id = `${i}-${j}`;
        space.textContent = board[i][j];
        boardGrid.appendChild(space);
      }
    }
  },

  // displayes who is the current player
  displayPlayer() {
    const playerTag = document.querySelector('.activePlayer');
    if (player1) {
      playerTag.textContent = 'Turn: Player X';
    } else {
      playerTag.textContent = 'Turn: Player O';
    }
  }
};

// ----- Functions ----------

// initializes the game in starting state
function boardInit() {
  player1 = true;
  win = false;
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board.length; j += 1) {
      board[i][j] = null;
    }
  }
  winSpan.classList.remove('winactive');
  clearInterval(ui.partyID);
  ui.drawBoard();
  ui.displayPlayer();
}

// returns true if game is tied
function checkTie() {
  let count = 0;
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board.length; j += 1) {
      if (board[i][j] === null) {
        count += 1;
      }
    }
  }
  // game is tied if no null-spaces are left and nobody has won yet
  return count === 0;
}


// checks if either player has won and ends the game if true
function checkWin() {
  // check rows for wins
  board.forEach((row) => {
    const rowWin = row[0] + row[1] + row[2];
    if (rowWin === 'XXX' || rowWin === 'OOO') win = true;
  });
  // check columsn for win
  for (let i = 0; i < board.length; i += 1) {
    const columnWin = board[0][i] + board[1][i] + board[2][i];
    if (columnWin === 'XXX' || columnWin === 'OOO') win = true;
  }
  // check diagonal for win
  const diaDown = board[0][0] + board[1][1] + board[2][2];
  const diaUp = board[0][2] + board[1][1] + board[2][0];
  if (diaDown === 'XXX' || diaDown === 'OOO') win = true;
  else if (diaUp === 'XXX' || diaUp === 'OOO') win = true;
  // check tie
  if (checkTie()) ui.displayGameEnd('tie');
  // display win
  if (win) ui.displayGameEnd('win');
}


// add event listeners to board
function setupEventlistener() {
  boardGrid.addEventListener('click', (event) => {
    const spaceClicked = event.target;
    // get ID of clicked grid Item
    if (spaceClicked.classList.contains('gamespace')) {
      const [row, , column] = [...spaceClicked.id];
      // check if there is already an x or an O in the space
      if (!board[row][column] && player1) {
        board[row][column] = 'X';
      } else if (!board[row][column] && !player1) {
        board[row][column] = 'O';
      } else {
        // return if field is already filled
        return;
      }
    }
    // if nobody won this turn initialize next turn
    if (!win) {
      ui.drawBoard();
      checkWin();
      // switch and display players turn
      player1 = !player1;
      ui.displayPlayer();
    }
  });
}

// ---- Executon -------------

boardInit();
ui.drawBoard();
setupEventlistener();

