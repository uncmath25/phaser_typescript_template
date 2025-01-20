import Phaser from "phaser";

export interface GameConfig {
  WIDTH: number,
  HEIGHT: number,
  GRAVITY: number
}

function buildPhaserGameConfig(simpleConfig: GameConfig) {
  return {
    type: Phaser.AUTO,
    width: simpleConfig.WIDTH,
    height: simpleConfig.HEIGHT,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: simpleConfig.GRAVITY },
        debug: false
      }
    }
  };
}

export abstract class Game extends Phaser.Game {
  constructor(gameConfig: GameConfig) {
    super(buildPhaserGameConfig(gameConfig));
  }

  protected addScene(sceneKey: string, scene: Phaser.Scene) {
    this.scene.add(sceneKey, scene);
  }
  protected startScene(sceneKey: string) {
    this.scene.start(sceneKey);
  }

  abstract run(): void;
}
