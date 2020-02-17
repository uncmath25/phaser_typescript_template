import Phaser from "phaser";

import { GameObjectFactory } from "../../factory/game_object";
import { AnimationManager } from "../../plugin/animation_manager";
import { AssetLoader } from "../../plugin/asset_loader";
import { KeyboardConnector } from "../../plugin/keyboard";
import { PhysicsManager } from "../../plugin/physics_manager";
import { SceneState } from "../config/scene_state";

export abstract class SceneController<SS extends SceneState> {
  private scene: Phaser.Scene;
  protected abstract sceneState: SS;
  protected  groups: Object;

  constructor(scene: Phaser.Scene) { this.scene = scene; }

  getAssetLoader() { return new AssetLoader(this.scene.load); }
  getKeyboardConnector() { return new KeyboardConnector(this.scene.input.keyboard); }
  getAnimationManager() { return new AnimationManager(this.scene.anims); }
  getPhysicsManager() { return new PhysicsManager(this.scene.physics); }
  getGameObjectFactory() { return new GameObjectFactory(this.scene.add, this.scene.physics.add); }

  abstract loadAssets(): void;
  abstract init(): void;
  abstract update(): void;

  getGroupByKey(key: string) { return this.groups[key]; }
}
