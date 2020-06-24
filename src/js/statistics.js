/**
 * Класс, описывающий статистику игры
 */
export class Statistics {
  constructor (statisticsNode) {
    this.statisticsNode = statisticsNode;
    this.score = {
      comp: 0,
      user: 0
    };
  }

  /**
   * Наращивание очков игрока или компьютера
   * @param {string} winner - победитель
   */
  setScore = (winner) => {
    if (winner === 'Ничья') return;
    this.score[winner]++;
    if (winner === 'user') {
      this.userScore.textContent = this.score.user;
    } else {
      this.compScore.textContent = this.score.comp;
    }
  }

  /**
   * Установка состояния поля, отображающего состояние игры
   */
  setStatus = () => {
    if (this.statisticsInfo.classList.contains('statistics__status--cross')) {
      this.statisticsInfo.classList.remove('statistics__status--cross');
      this.statisticsInfo.classList.add('statistics__status--circle');
    } else {
      this.statisticsInfo.classList.add('statistics__status--cross');
      this.statisticsInfo.classList.remove('statistics__status--circle');
    }
  }

  /**
   * Инициализация сущности, описывающей статистику игры
   */
  init() {
    this.userStat = this.statisticsNode.querySelector('#first');
    this.compStat = this.statisticsNode.querySelector('#second');
    this.userTitle = this.userStat.querySelector('.statistics__player-field');
    this.compTitle = this.compStat.querySelector('.statistics__player-field');
    this.userImage = this.userStat.querySelector('.statistics__img');
    this.compImage = this.compStat.querySelector('.statistics__img');
    this.userScore = this.userStat.querySelector('.statistics__value');
    this.compScore = this.compStat.querySelector('.statistics__value');
    this.statisticsInfo = this.statisticsNode.querySelector('.statistics__status');
  }
}