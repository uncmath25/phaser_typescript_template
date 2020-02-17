import Phaser from "phaser";

import { SceneState } from "./config/scene_state";
import { SceneController } from "./controller/main";

export abstract class Scene<SS extends SceneState> extends Phaser.Scene {
  protected abstract sceneController: SceneController<SS>;

  preload() { this.sceneController.loadAssets(); }

  create() { this.sceneController.init(); }

  update() { this.sceneController.update(); }
}
