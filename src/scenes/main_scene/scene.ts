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

  isGameOver = false;
  score: number = 0;
  scoreText: Phaser.GameObjects.Text;

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

    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    this._configureCollisions();
    this._configureKeyboard();
  }

  _configureCollisions() {
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this._collectStar, null, this);
    this.physics.add.collider(this.player, this.bombs, this._hitBomb, null, this);
  }

  _configureKeyboard() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  _collectStar(player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Sprite) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
        this.stars.getChildren().forEach(function(obj: Phaser.Physics.Arcade.Sprite) {
          obj.enableBody(true, obj.x, 0, true, true);
        })

        let x: number = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        let bomb: Phaser.Physics.Arcade.Sprite = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.setGravityY(0);
    }
  }

  _hitBomb() {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.isGameOver = true;
  }

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
