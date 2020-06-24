/**
 * Класс, описывающий историю игры
 */
export class History {
  constructor(histuryNode) {
    this.histuryNode = histuryNode;
  }

  /**
   * Добавление нового фрагмента истории
   * @param {Node} histuryItem - состояние игрового поля, заносивое в историю
   * @param {Object} param1 - очки игрока и компьютера
   */
  setHistoryItem = (histuryItem, {comp, user}) => {
    const cloneHisturyItem = histuryItem.cloneNode(true);
    const historyItemCells = cloneHisturyItem.querySelectorAll('td');
    [].forEach.call(historyItemCells, (item) => {
      item.classList.add('game__col--history');
    })
    const historyItemContainer = document.createElement('div');
    historyItemContainer.classList.add('history-popup__item');
    const compStat = document.createElement('p');
    compStat.classList.add('history-popup__stat', 'history-popup__stat--comp');
    const userStat = document.createElement('p');
    userStat.classList.add('history-popup__stat', 'history-popup__stat--user');
    compStat.textContent = `Компьютер - ${comp}`;
    userStat.textContent = `Игрок - ${user}`;
    historyItemContainer.appendChild(compStat);
    historyItemContainer.appendChild(cloneHisturyItem);
    historyItemContainer.appendChild(userStat);
    this.histuryNode.appendChild(historyItemContainer);
  }

  init() {
    this.closeButton = this.histuryNode.querySelector('.history-popup__close');
    this.closeButton.addEventListener('click', () => {
      this.histuryNode.classList.remove('history-popup--active')
    });
  }
}