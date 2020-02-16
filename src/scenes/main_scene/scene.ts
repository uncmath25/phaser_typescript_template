import Phaser from "phaser";

import { GroupBuilder } from "./groups";
import { imageSpecs } from "./images";
import { importImage } from "../../utils/image_loader";

export class MainScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  platforms: Phaser.Physics.Arcade.StaticGroup;
  stars: Phaser.Physics.Arcade.Group;
  player: Phaser.Physics.Arcade.Sprite;
  bombs: Phaser.Physics.Arcade.Group;

  constructor(game: Phaser.Game) {
    super(game);
  }

  preload() {
    for (let imageKey of Object.keys(imageSpecs)) {
      importImage(imageSpecs[imageKey], this);
    }
  }

  create() {
    let groupBuilder: GroupBuilder = new GroupBuilder(this);
    groupBuilder.buildBackground();
    this.platforms = groupBuilder.buildPlatforms();
    this.stars = groupBuilder.buildStars();
    this.player = groupBuilder.buildPlayer();
    this.bombs = groupBuilder.buildBombs();

    this._configureCollisions(this);
    this._configureKeyboard(this);

    // scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  }

  _configureCollisions(scene: Phaser.Scene) {
    let physicsFactory: Phaser.Physics.Arcade.Factory = scene.physics.add;
    physicsFactory.collider(this.stars, this.platforms);
    physicsFactory.collider(this.player, this.platforms);
    physicsFactory.collider(this.bombs, this.platforms);
    physicsFactory.overlap(this.player, this.stars, this._collectStar, null, this);
    physicsFactory.collider(this.player, this.bombs, this._hitBomb, null, this);
  }

  _configureKeyboard(scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  _collectStar() {}

  _hitBomb() {}

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.play('right', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
