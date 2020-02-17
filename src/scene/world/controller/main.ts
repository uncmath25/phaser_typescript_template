import { SceneController } from "../../core/controller/main";
import { GroupInitializer } from "./group_initalizer";
import { GroupUpdater } from "./group_updater";
import { imageSpecs } from "../config/images";
import { WorldSceneState } from "../config/scene_state";
import { importImage } from "../../../utils/image_loader";

export class WorldSceneController extends SceneController<WorldSceneState> {
  _sceneState = {
    isGameOver: false,
    score: 0
  }

  groupUpdater: GroupUpdater;

  loadAssets() { Object.keys(imageSpecs).forEach( imageKey => { importImage(imageSpecs[imageKey], this.getLoaderPlugin()); } ); }

  init() {
    // Needs to be initialized here if factory references are passed - can be null earlier
    this._groups = new GroupInitializer(this._sceneState, this.getPhysicsPlugin(), this.getGameObjectFactory(), this.getPhysicsFactory()).init();
    this.groupUpdater = new GroupUpdater(this._sceneState, this.getKeyboardPlugin(), this._groups);
  }

  update() {
    this.groupUpdater.update();
  }
}
