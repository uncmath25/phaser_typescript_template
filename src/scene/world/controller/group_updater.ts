import { KeyCode } from "../../../core/config/keycodes";
import { KeyboardConnector } from "../../../core/plugin/keyboard";
import { WorldSceneState } from "../config/scene_state";
import * as Groups from "../config/groups";

export class GroupUpdater {
  // private sceneState: WorldSceneState
  private keyboardConnector: KeyboardConnector
  private groups: Object

  constructor(_: WorldSceneState, keyboardConnector: KeyboardConnector, groups: Object) {
    // this.sceneState = sceneState;
    this.keyboardConnector = keyboardConnector;
    this.groups = groups;
  }

  update() {
    if (this.keyboardConnector.isKeyDown(KeyCode.LEFT)) {
      this.groups[Groups.PLAYER_GROUP].setVelocityX(-160);
    }
    else if (this.keyboardConnector.isKeyDown(KeyCode.RIGHT)) {
      this.groups[Groups.PLAYER_GROUP].setVelocityX(160);
    }
    else {
      this.groups[Groups.PLAYER_GROUP].setVelocityX(0);
    }

    if (this.keyboardConnector.isKeyDown(KeyCode.UP) && this.groups[Groups.PLAYER_GROUP].body.touching.down) {
      this.groups[Groups.PLAYER_GROUP].setVelocityY(-330);
    }
  }
}
