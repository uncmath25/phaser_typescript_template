import Phaser from "phaser";

import {WorldScene} from "./scene/world/main"

export interface SimpleGameConfig {
  WIDTH: number,
  HEIGHT: number,
  GRAVITY: number
}

export class SimpleGame {
  MAIN_SCENE: string = "Main Scene";

  game: Phaser.Game;

  constructor(simpleConfig: SimpleGameConfig) {
    this.game = new Phaser.Game(this._buildGameConfig(simpleConfig));
    this.game.scene.add(this.MAIN_SCENE, new WorldScene(this.game));
  }

  _buildGameConfig(simpleConfig: SimpleGameConfig) {
    return {
      type: Phaser.AUTO,
      width: simpleConfig.WIDTH,
      height: simpleConfig.HEIGHT,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: simpleConfig.GRAVITY },
          debug: false
        }
      }
    };
  }

  run() {
    this.game.scene.start(this.MAIN_SCENE);
  }
}
