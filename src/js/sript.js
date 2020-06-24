import { Game } from './game.js';

const playgroundNode = document.querySelector('.game__playground');
const statisticsNode = document.querySelector('.statistics');
const historyNode = document.querySelector('.history-popup');
const restartButton = document.querySelector('.restart');
const historyButton = document.querySelector('.history');

const game = new Game(playgroundNode, statisticsNode, historyNode, restartButton, historyButton);

game.start();