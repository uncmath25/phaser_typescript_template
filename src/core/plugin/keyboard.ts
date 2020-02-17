import Phaser from "phaser";

import { KeyCode } from "../config/keycodes";

export class KeyboardConnector {
  private keyboardPlugin: Phaser.Input.Keyboard.KeyboardPlugin;
  private keys: Object;

  constructor(keyboardPlugin: Phaser.Input.Keyboard.KeyboardPlugin) {
    this.keyboardPlugin = keyboardPlugin;
    this.keys = {};
    Object.keys(KeyCode).forEach( keyCode => { this.keys[keyCode] = this.keyboardPlugin.addKey(keyCode); } )
  }

  isKeyDown(keyCode: KeyCode) {
    return this.keys[keyCode].isDown;
  }
}
