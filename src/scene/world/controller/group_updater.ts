import Phaser from "phaser";

import { WorldSceneState } from "../config/scene_state";
import * as Groups from "../config/groups";

export class GroupUpdater {
  sceneState: WorldSceneState
  keyboardPlugin: Phaser.Input.Keyboard.KeyboardPlugin
  groups: Object

  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(sceneState: WorldSceneState, keyboardPlugin: Phaser.Input.Keyboard.KeyboardPlugin, groups: Object) {
    this.sceneState = sceneState;
    this.keyboardPlugin = keyboardPlugin;
    this.groups = groups;

    this.cursorKeys = keyboardPlugin.createCursorKeys();
  }

  update() {
    if (this.cursorKeys.left.isDown) {
      this.groups[Groups.PLAYER_GROUP].setVelocityX(-160);
      this.groups[Groups.PLAYER_GROUP].play('left', true);
    }
    else if (this.cursorKeys.right.isDown) {
      this.groups[Groups.PLAYER_GROUP].setVelocityX(160);
      this.groups[Groups.PLAYER_GROUP].play('right', true);
    }
    else {
      this.groups[Groups.PLAYER_GROUP].setVelocityX(0);
      this.groups[Groups.PLAYER_GROUP].play('turn');
    }

    if (this.cursorKeys.up.isDown && this.groups[Groups.PLAYER_GROUP].body.touching.down) {
      this.groups[Groups.PLAYER_GROUP].setVelocityY(-330);
    }
  }
}
