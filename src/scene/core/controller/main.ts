import Phaser from "phaser";

import { SceneState } from "../config/scene_state";

export abstract class SceneController<SS extends SceneState> {
  _scene: Phaser.Scene;
  abstract _sceneState: SS;
  _groups: Object;

  constructor(scene: Phaser.Scene) { this._scene = scene; }

  getLoaderPlugin() { return this._scene.load; }
  getKeyboardPlugin() { return this._scene.input.keyboard; }
  getPhysicsPlugin() { return this._scene.physics; }
  getGameObjectFactory() { return this._scene.add; }
  getPhysicsFactory() { return this._scene.physics.add; }

  abstract loadAssets(): void;
  abstract init(): void;
  abstract update(): void;

  getGroupByKey(key: string) { return this._groups[key]; }
}
