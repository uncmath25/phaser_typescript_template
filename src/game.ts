import { Game as CoreGame, GameConfig } from "./core/game";
import { WorldScene } from "./scene/world/main"

export class Game extends CoreGame {
  private MAIN_SCENE: string = "Main Scene";

  constructor(gameConfig: GameConfig) {
    super(gameConfig);
    this.addScene(this.MAIN_SCENE, new WorldScene(this));
  }

  run() {
    this.startScene(this.MAIN_SCENE);
  }
}
