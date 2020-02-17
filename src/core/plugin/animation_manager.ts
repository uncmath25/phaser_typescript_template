export interface AnimationConfig {
  key: string,
  imageKey: string,
  startFrame: number,
  endFrame?: number,
  framerate: number
}

export class AnimationManager {
  private animationManager: Phaser.Animations.AnimationManager;

  constructor(animationManager: Phaser.Animations.AnimationManager) {
    this.animationManager = animationManager;
  }
  create(config: AnimationConfig) {
    let parsedConfig = config.endFrame ?
      {
          key: config.key,
          frames: this.animationManager.generateFrameNumbers(config.imageKey, { start: config.startFrame, end: config.endFrame }),
          frameRate: config.framerate,
          repeat: -1
      } :
      {
          key: config.key,
          frames: [ { key: config.imageKey, frame: config.startFrame } ],
          frameRate: config.framerate
      };
    return this.animationManager.create(parsedConfig);
  }

  play(obj: Phaser.Physics.Arcade.Sprite, key: string) {
    obj.anims.play(key, true);
  }

  // Don't understand why the following doesn't work
  // play(obj: Phaser.GameObjects.GameObject, key: string) {
  //   this.animationManager.play(key, obj);
  // }
}
