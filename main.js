class TicTacToe {
  constructor() {
    this.gameBoard = document.querySelectorAll('.game__board__row td');
    this.turnX = true;
    this.turn = 1;
    this.winner = null;
  }

  _defaults() {
    this.turn = 1;
    this.turnX = true;
  }

  _render(winner) {
    this.gameBoard.forEach(cell => {
      cell.textContent = '';
    });
    const announceEl = document.querySelector('.game__announce');
    const announcePlayer = announceEl.querySelector('span');
    announcePlayer.textContent = winner;
    announceEl.classList.add('active');
    announceEl.addEventListener('animationend', function removeClass() {
      announceEl.classList.remove('active');
      announceEl.removeEventListener('animationend', removeClass);
    });
  }

  displayWinner() {
    const winnerEl = document.querySelector(`.game__scores__${this.winner}`);
    +winnerEl.textContent++;
    this._render(this.winner);
    this._defaults();
  }

  calculateWinner() {
    const winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winnerLines.forEach(cells => {
      const [first, second, third] = cells;
      if (
        this.gameBoard[first].textContent &&
        this.gameBoard[first].textContent ===
          this.gameBoard[second].textContent &&
        this.gameBoard[first].textContent === this.gameBoard[third].textContent
      ) {
        this.winner = this.gameBoard[first].textContent;
        return this.displayWinner();
      }
    });
    if (this.turn >= 9) {
      this._defaults();
      this._render('DRAW');
    }
  }

  gameTurn(e) {
    if (this.gameBoard[e.target.dataset.index].textContent === '') {
      e.target.textContent = this.turnX ? 'X' : 'o';
      this.turnX = !this.turnX;
      this.turn++;
      if (this.turn >= 5) this.calculateWinner();
    }
  }

  start(e) {
    const gameBoardEl = document.querySelector('.game__board');

    e.currentTarget.removeEventListener('click', startGame);
    e.currentTarget.classList.add('game-active');

    gameBoardEl.addEventListener('click', this.gameTurn.bind(this));
  }
}
const tictactoe = new TicTacToe();

const startGameEl = document.querySelector('body');
function startGame(e) {
  tictactoe.start(e);
}
startGameEl.addEventListener('click', startGame);
