import { SceneController } from "../../../core/scene/controller/main";
import { importImage } from "../../../utils/image_loader";
import { imageSpecs } from "../config/images";
import { WorldSceneState } from "../config/scene_state";
import { GroupAnimator } from "./group_animator";
import { GroupInitializer } from "./group_initalizer";
import { GroupUpdater } from "./group_updater";

export class WorldSceneController extends SceneController<WorldSceneState> {
  sceneState = {
    isGameOver: false,
    score: 0
  }

  private groupUpdater: GroupUpdater;
  private groupAnimator: GroupAnimator;

  loadAssets() { Object.keys(imageSpecs).forEach( (imageKey: string) => { importImage(imageSpecs[imageKey], this.getAssetLoader()); } ); }

  init() {
    // Needs to be initialized here if factory references are passed - can be null earlier
    this.groups = new GroupInitializer(this.sceneState, this.getPhysicsManager(), this.getGameObjectFactory()).init();
    this.groupUpdater = new GroupUpdater(this.sceneState, this.getKeyboardConnector(), this.groups);
    this.groupAnimator = new GroupAnimator(this.sceneState, this.getAnimationManager(), this.getKeyboardConnector(), this.groups);
    this.groupAnimator.init();
  }

  update() {
    this.groupUpdater.update();
    this.groupAnimator.update();
  }
}
