/**
 * Класс, описывающий игровое поле
 */
export class Playground {
  constructor(playgroundNode) {
    this.playgroundNode = playgroundNode;
  }

  createPlaygroundStateMatrix = () => {
    const matrix = []
    for (let i = 0; i < 3; i ++) {
      matrix[i] = [];
      for (let j = 0; j < 3; j ++) {
        matrix[i][j] = 0;
      }
    }
    
    return matrix;
  }

  init = () => {
    this.playgroundMatrix = this.createPlaygroundStateMatrix();
  }
}