import { Playground } from './playground.js';
import { Statistics } from './statistics.js';
import { History } from './histury.js';

/**
 * Класс, описывающий основную логи игры
 */
export class Game {
  constructor(playgroundNode, statisticsNode, historyNode, restartButton, historyButton) {
    this.playground = new Playground(playgroundNode);
    this.statistics = new Statistics(statisticsNode);
    this.history = new History(historyNode);
    this.restartButton = restartButton;
    this.historyButton = historyButton;
  }

  /**
   * Получение координат случайной ячейки
   */
  getRandomCell = () => {
    let obj = {
      row: Math.floor(Math.random() * (2 + 1)),
      col: Math.floor(Math.random() * (2 + 1))
    }
    if (this.playground.playgroundMatrix[obj.row][obj.col] !== 0) {
      obj = this.getRandomCell();
    } 

    return obj
  };

  /**
   * Обработчик клика по игрвоому полю (ход игрока)
   * @param {Object} evt 
   */
  playgroundCLickHandler = (evt) => {
    // Определение ячейки, на которую было произведено нажатие
    const target = evt.target;
    const row = target.dataset.row;
    const col = target.dataset.col;
    // Определение типа фигуры, за которую играет игрок (крестик или круг)
    const playerType = this.crossPlayer === 'user' ? 'cross' : 'circle';
    if (target.tagName === 'TD' && this.playground.playgroundMatrix[row][col] === 0 && this.winner === '') {
      const shape = target.querySelector(`.${playerType}`);
      shape.classList.add(`${playerType}--active`);
      // Изменение состояния игрвого поля
      this.playground.playgroundMatrix[row][col] = 1;
      this.playground.playgroundNode.removeEventListener('click', this.playgroundCLickHandler);
      // Переключение активного поля
      this.statistics.compStat.classList.add('statistics__player--current');
      this.statistics.userStat.classList.remove('statistics__player--current');
      // Наращивание колчества ходов текущей игры
      this.stepsCount++;
      this.statistics.setStatus();
      this.checkWin();
      this.step = 'comp';
      setTimeout(this.computerStepHandler, 1000)
    }
  }

  /**
   * Обработчик хода компьютера
   */
  computerStepHandler = () => {
    if (this.winner === '') {
      // Проверка победных ячеек компьютера
      this.checkCol(2);
      this.checkRow(2);
      this.checkMainDiag(2);
      this.checkSecDiag(2);
      // Проверка победных ячеек игрока
      this.checkCol(1);
      this.checkRow(1);
      this.checkMainDiag(1);
      this.checkSecDiag(1);

      // Выбор случайной ячейки для компьютера. Выполняется в случае, если 
      // победные ячейки для компьютера и игрока остутствуют
      if (this.step === 'comp') {
        const {row, col} = this.getRandomCell();
        this.setComputerStep(row, col);
      }

      this.statistics.compStat.classList.remove('statistics__player--current');
      this.statistics.userStat.classList.add('statistics__player--current');
      this.statistics.setStatus();
      this.checkWin();
    }
  }

  /**
   * Проверка значений, лежащих на главной диагонали
   * @param {number} checkedValue - проверяемое значение
   */
  checkMainDiag = (checkedValue) => {
    if (this.step === 'comp') {
      const matrix = this.playground.playgroundMatrix;
      if (matrix[0][0] === checkedValue && matrix[1][1] === checkedValue && matrix[2][2] === 0) {this.setComputerStep(2, 2)};
      if (matrix[0][0] === checkedValue && matrix[1][1] === 0 && matrix[2][2] === checkedValue) {this.setComputerStep(1, 1)};
      if (matrix[0][0] === 0 && matrix[1][1] === checkedValue && matrix[2][2] === checkedValue) {this.setComputerStep(0, 0)};
    }
  }

  /**
   * Проверка значений, лежащих на второй диагонали
   * @param {number} checkedValue - проверяемое значение
   */
  checkSecDiag = (checkedValue) => {
    if (this.step === 'comp') {
      const matrix = this.playground.playgroundMatrix;
      if (matrix[2][0] === checkedValue && matrix[1][1] === checkedValue && matrix[0][2] === 0) {this.setComputerStep(0, 2)}
      if (matrix[2][0] === checkedValue && matrix[1][1] === 0 && matrix[0][2] === checkedValue) {this.setComputerStep(1, 1)}
      if (matrix[2][0] === 0 && matrix[1][1] === checkedValue && matrix[0][2] === checkedValue) {this.setComputerStep(2, 0)}
    }
  }

  /**
   * Проверка колонок
   * @param {number} checkedValue - проверяемое значение
   */
  checkCol = (checkedValue) => {
    if (this.step === 'comp') {
      const matrix = this.playground.playgroundMatrix;
      for (let i = 0; i < 3; i++) {
        if (matrix[0][i] === checkedValue && matrix[1][i] === checkedValue && matrix[2][i] === 0) {this.setComputerStep(2, i);return}
        if (matrix[0][i] === checkedValue && matrix[1][i] === 0 && matrix[2][i] === checkedValue) {this.setComputerStep(1, i);return}
        if (matrix[0][i] === 0 && matrix[1][i] === checkedValue && matrix[2][i] === checkedValue) {this.setComputerStep(0, i);return}
      }
    }
  }

  /**
   * Проверка строк
   * @param {number} checkedValue - проверяемое значение
   */
  checkRow = (checkedValue) => {
    if (this.step === 'comp') {
      const matrix = this.playground.playgroundMatrix;
      for (let i = 0; i < 3; i++) {
        if (matrix[i][0] === checkedValue && matrix[i][1] === checkedValue && matrix[i][2] === 0) {this.setComputerStep(i, 2);return}
        if (matrix[i][0] === checkedValue && matrix[i][1] === 0 && matrix[i][2] === checkedValue) {this.setComputerStep(i, 1);return}
        if (matrix[i][0] === 0 && matrix[i][1] === checkedValue && matrix[i][2] === checkedValue) {this.setComputerStep(i, 0);return}
      }
    }
  }

  /**
   * Регистрация хода компьютера
   * @param {number} row - строка
   * @param {number} col - столбец
   */
  setComputerStep = (row, col) => {
    const computerType = this.crossPlayer === 'comp' ? 'cross' : 'circle';
    const target = this.playground.playgroundNode.querySelector(`td[data-row="${row}"][data-col="${col}"]`)
    const shape = target.querySelector(`.${computerType}`);
    shape.classList.add(`${computerType}--active`);
    this.playground.playgroundMatrix[row][col] = 2;
    this.stepsCount++;
    this.playground.playgroundNode.addEventListener('click', this.playgroundCLickHandler);
    this.step = 'user';
  }

  /**
   * Проверка на победу
   */
  checkWin = () => {
    const matrix = this.playground.playgroundMatrix;
    for (let i = 0; i < 3; i++) {
      if (matrix[0][i] === 1 && matrix[1][i] === 1 && matrix[2][i] === 1) {this.setWin('user');break};
      if (matrix[i][0] === 1 && matrix[i][1] === 1 && matrix[i][2] === 1) {this.setWin('user');break};
      if (matrix[0][i] === 2 && matrix[1][i] === 2 && matrix[2][i] === 2) {this.setWin('comp');break};
      if (matrix[i][0] === 2 && matrix[i][1] === 2 && matrix[i][2] === 2) {this.setWin('comp');break};
    }

    if (matrix[0][0] === 1 && matrix[1][1] === 1 && matrix[2][2] === 1) {this.setWin('user')}
    if (matrix[2][0] === 1 && matrix[1][1] === 1 && matrix[0][2] === 1) {this.setWin('user')}
    if (matrix[0][0] === 2 && matrix[1][1] === 2 && matrix[2][2] === 2) {this.setWin('comp')}
    if (matrix[2][0] === 2 && matrix[1][1] === 2 && matrix[0][2] === 2) {this.setWin('comp')}

    if (this.stepsCount === 9 && this.winner === '') {
      this.setWin('Ничья');
    }
  }

  /**
   * Регистрация победы игрока или компьютера
   * @param {string} winner - победитель
   */
  setWin = (winner) => {
    this.winner = winner;
    this.statistics.setScore(winner);
    if (this.statistics.statisticsInfo.classList.contains('statistics__status--cross')) {
      this.statistics.statisticsInfo.classList.remove('statistics__status--cross');
    } else {
      this.statistics.statisticsInfo.classList.remove('statistics__status--circle');
    }
    this.statistics.statisticsInfo.textContent = winner === 'Ничья' ? 'Игра завершилась ничьей' : 'Игра завершена!';
    this.playground.playgroundNode.removeEventListener('click', this.playgroundCLickHandler);
    this.history.setHistoryItem(this.playground.playgroundNode, this.statistics.score);
  }

  /**
   * Метод, запускающий игру
   */
  start = () => {
    this.statistics.init();
    this.history.init();
    this.crossPlayer = Math.floor(Math.random() + 0.5) ? 'user' : 'comp';
    this.initGame();
    this.restartButton.addEventListener('click', this.restartGame);
    this.historyButton.addEventListener('click', () => {
      this.history.histuryNode.classList.add('history-popup--active');
    })
  }

  /**
   * Метод, обновляющий игру
   */
  restartGame = () => {
    if (this.crossPlayer === 'comp') {
      this.statistics.compImage.classList.remove('statistics__img--cross');
      this.statistics.userImage.classList.remove('statistics__img--circle');
      this.statistics.compStat.classList.remove('statistics__player--current');
    } else {
      this.statistics.compImage.classList.remove('statistics__img--circle');
      this.statistics.userImage.classList.remove('statistics__img--cross');
      this.statistics.userStat.classList.remove('statistics__player--current');
    }
    const cellsImg = this.playground.playgroundNode.querySelectorAll('svg');
    [].forEach.call(cellsImg, (item) => {
      if (item.classList.contains('cross--active')) {
        item.classList.remove('cross--active');
      }
      if (item.classList.contains('circle--active')) {
        item.classList.remove('circle--active');
      }
    })
    this.statistics.statisticsInfo.textContent = 'Ходит';
    this.crossPlayer = this.crossPlayer === 'user' ? 'comp' : 'user';
    this.initGame();
  }

  /**
   * Инициализация основных параметров игры, определение первого ходящего
   */
  initGame = () => {
    this.playground.init();
    this.stepsCount = 0;
    this.winner = '';
    this.step = this.crossPlayer;
    if (this.crossPlayer === 'comp') {
      this.statistics.compImage.classList.add('statistics__img--cross');
      this.statistics.userImage.classList.add('statistics__img--circle');
      this.statistics.compStat.classList.add('statistics__player--current');
      setTimeout(this.computerStepHandler, 1000)
    } else {
      this.statistics.compImage.classList.add('statistics__img--circle');
      this.statistics.userImage.classList.add('statistics__img--cross');
      this.statistics.userStat.classList.add('statistics__player--current');
      this.playground.playgroundNode.addEventListener('click', this.playgroundCLickHandler);
    }
    this.statistics.statisticsInfo.classList.add('statistics__status--cross');
  }
}