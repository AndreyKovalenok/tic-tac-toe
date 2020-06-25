import { Game } from './game.js';


// Получение игрового поля из разметки
const playgroundNode = document.querySelector('.game__playground');
// Получение узла статистики из разметки
const statisticsNode = document.querySelector('.statistics');
// Получение узла истории из разметки
const historyNode = document.querySelector('.history-popup');
const restartButton = document.querySelector('.restart');
const historyButton = document.querySelector('.history');

// Инициализация сущности игры
const game = new Game(playgroundNode, statisticsNode, historyNode, restartButton, historyButton);

// Запуск игры
game.start();