import { KeyCode } from "../../../core/config/keycodes";
import { AnimationManager } from "../../../core/plugin/animation_manager";
import { KeyboardConnector } from "../../../core/plugin/keyboard";
import { WorldSceneState } from "../config/scene_state";
import { animations } from "../config/animations";
import * as Groups from "../config/groups";
import * as Images from "../config/images";

export class GroupAnimator {
  // private sceneState: WorldSceneState
  private animationManager: AnimationManager
  private keyboardConnector: KeyboardConnector
  private groups: Object

  constructor(_: WorldSceneState, animationManager: AnimationManager, keyboardConnector: KeyboardConnector, groups: Object) {
    // this.sceneState = sceneState;
    this.animationManager = animationManager;
    this.keyboardConnector = keyboardConnector;
    this.groups = groups;
  }

  init() {
    this.initPlayer();
  }

  private initPlayer() {
    this.animationManager.create({
      key: animations[Groups.PLAYER_GROUP].LEFT,
      imageKey: Images.PLAYER_IMAGE,
      startFrame: 0,
      endFrame: 3,
      framerate: 10
    })
    this.animationManager.create({
      key: animations[Groups.PLAYER_GROUP].TURN,
      imageKey: Images.PLAYER_IMAGE,
      startFrame: 4,
      framerate: 20
    })
    this.animationManager.create({
      key: animations[Groups.PLAYER_GROUP].RIGHT,
      imageKey: Images.PLAYER_IMAGE,
      startFrame: 5,
      endFrame: 8,
      framerate: 10
    })
  }

  update() {
    if (this.keyboardConnector.isKeyDown(KeyCode.LEFT)) {
      this.animationManager.play(this.groups[Groups.PLAYER_GROUP], animations[Groups.PLAYER_GROUP].LEFT);
    }
    else if (this.keyboardConnector.isKeyDown(KeyCode.RIGHT)) {
      this.animationManager.play(this.groups[Groups.PLAYER_GROUP], animations[Groups.PLAYER_GROUP].RIGHT);
    }
    else {
      this.animationManager.play(this.groups[Groups.PLAYER_GROUP], animations[Groups.PLAYER_GROUP].TURN);
    }
  }
}
