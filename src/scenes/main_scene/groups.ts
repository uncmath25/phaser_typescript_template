import Phaser from "phaser";

import * as Images from "./images";

// export const BACKGROUND_GROUP: string = "background";
// export const PLATFORM_GROUP: string = "platform";
// export const STAR_GROUP: string = "star";
// export const BOMB_GROUP: string = "bomb";
// export const PLAYER_GROUP: string = "player";

export class GroupBuilder {
  animationManager: Phaser.Animations.AnimationManager;
  staticFactory: Phaser.GameObjects.GameObjectFactory;
  physicsFactory: Phaser.Physics.Arcade.Factory;

  constructor(scene: Phaser.Scene) {
    this.animationManager = scene.anims;
    this.staticFactory = scene.add;
    this.physicsFactory = scene.physics.add;
  }

  buildBackground() {
    this.staticFactory.image(400, 300, Images.BACKGROUND_IMAGE);
  }

  buildPlatforms() {
    let platforms: Phaser.Physics.Arcade.StaticGroup = this.physicsFactory.staticGroup();
    platforms.create(400, 568, Images.PLATFORM_IMAGE).setScale(2).refreshBody();
    platforms.create(600, 400, Images.PLATFORM_IMAGE);
    platforms.create(50, 250, Images.PLATFORM_IMAGE);
    platforms.create(750, 220, Images.PLATFORM_IMAGE);
    return platforms;
  }

  buildStars() {
    let stars: Phaser.Physics.Arcade.Group = this.physicsFactory.group({
      key: Images.STAR_IMAGE,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.getChildren().forEach(function(obj: Phaser.GameObjects.GameObject) {
      (obj.body as Phaser.Physics.Arcade.Body).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    })
    return stars;
  }

  buildPlayer() {
    let player: Phaser.Physics.Arcade.Sprite = this.physicsFactory.sprite(100, 450, Images.PLAYER_IMAGE);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.anims.animationManager.create({
        key: 'left',
        frames: player.anims.animationManager.generateFrameNumbers(Images.PLAYER_IMAGE, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    player.anims.animationManager.create({
        key: 'turn',
        frames: [ { key: Images.PLAYER_IMAGE, frame: 4 } ],
        frameRate: 20
    });
    player.anims.animationManager.create({
        key: 'right',
        frames: player.anims.animationManager.generateFrameNumbers(Images.PLAYER_IMAGE, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    return player;
  }

  buildBombs() {
    return this.physicsFactory.group();
  }
}
