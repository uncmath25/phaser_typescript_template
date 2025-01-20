import Phaser from "phaser";

export class PhysicsManager {
  private physicsPlugin: Phaser.Physics.Arcade.ArcadePhysics;

  constructor(physicsPlugin: Phaser.Physics.Arcade.ArcadePhysics) {
    this.physicsPlugin = physicsPlugin;
  }

  handleCollision(groups: Object, group1Key: string, group2Key: string, callback?: any, callbackContext?: any) {
    this.physicsPlugin.add.collider(groups[group1Key], groups[group2Key], callback, null, callbackContext);
  }

  pause() {
    this.physicsPlugin.pause();
  }

  // TODO: Very similar, could implement if desired
  // handleOverlap() {}
}
