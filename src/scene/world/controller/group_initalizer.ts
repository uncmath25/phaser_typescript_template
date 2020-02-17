import Phaser from "phaser";

import { WorldSceneState } from "../config/scene_state";
import * as Groups from "../config/groups";
import * as Images from "../config/images";

export class GroupInitializer {
  sceneState: WorldSceneState
  physicsPlugin: Phaser.Physics.Arcade.ArcadePhysics;
  gameObjectFactory: Phaser.GameObjects.GameObjectFactory;
  physicsFactory: Phaser.Physics.Arcade.Factory;

  constructor(sceneState: WorldSceneState, physicsPlugin: Phaser.Physics.Arcade.ArcadePhysics,
              gameObjectFactory: Phaser.GameObjects.GameObjectFactory, physicsFactory: Phaser.Physics.Arcade.Factory) {
    this.sceneState = sceneState;
    this.physicsPlugin = physicsPlugin;
    this.gameObjectFactory = gameObjectFactory;
    this.physicsFactory = physicsFactory;
  }

  init() {
    let groups = this.initGroups();
    this.configureCollisions(groups);
    return groups;
  }

  initGroups() {
    let groups = {};
    groups[Groups.BACKGROUND_GROUP] = this.initBackground();
    groups[Groups.PLATFORM_GROUP] = this.initPlatforms();
    groups[Groups.STAR_GROUP] = this.initStars();
    groups[Groups.PLAYER_GROUP] = this.initPlayer();
    groups[Groups.BOMB_GROUP] = this.initBombs();
    groups[Groups.SCOREBOARD_GROUP] = this.initScoreboard();
    return groups;
  }

  initBackground() {
    this.gameObjectFactory.image(400, 300, Images.BACKGROUND_IMAGE);
  }

  initPlatforms() {
    let platforms: Phaser.Physics.Arcade.StaticGroup = this.physicsFactory.staticGroup();
    platforms.create(400, 568, Images.PLATFORM_IMAGE).setScale(2).refreshBody();
    platforms.create(600, 400, Images.PLATFORM_IMAGE);
    platforms.create(50, 250, Images.PLATFORM_IMAGE);
    platforms.create(750, 220, Images.PLATFORM_IMAGE);
    return platforms;
  }

  initStars() {
    let stars: Phaser.Physics.Arcade.Group = this.physicsFactory.group({
      key: Images.STAR_IMAGE,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.getChildren().forEach( obj => { (obj.body as Phaser.Physics.Arcade.Body).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); } );
    return stars;
  }

  initPlayer() {
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

  initBombs() {
    return this.physicsFactory.group();
  }

  initScoreboard() {
    return this.gameObjectFactory.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  }

  configureCollisions(groups: Object) {
    this.physicsFactory.collider(groups[Groups.STAR_GROUP], groups[Groups.PLATFORM_GROUP]);
    this.physicsFactory.collider(groups[Groups.PLAYER_GROUP], groups[Groups.PLATFORM_GROUP]);
    this.physicsFactory.collider(groups[Groups.BOMB_GROUP], groups[Groups.PLATFORM_GROUP]);
    this.physicsFactory.overlap(groups[Groups.PLAYER_GROUP], groups[Groups.STAR_GROUP], this.buildCollectStarFcn(groups), null, this);
    this.physicsFactory.collider(groups[Groups.PLAYER_GROUP], groups[Groups.BOMB_GROUP], this.buildHitBomb(groups), null, this);
  }

  buildCollectStarFcn(groups: Object) {
    return (player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Sprite) => {
      star.disableBody(true, true);

      this.sceneState.score += 10;
      groups[Groups.SCOREBOARD_GROUP].setText('Score: ' + this.sceneState.score);

      if (groups[Groups.STAR_GROUP].countActive(true) === 0) {
          groups[Groups.STAR_GROUP].getChildren().forEach( (obj: Phaser.Physics.Arcade.Sprite) => { obj.enableBody(true, obj.x, 0, true, true); })

          let x: number = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

          let bomb: Phaser.Physics.Arcade.Sprite = groups[Groups.BOMB_GROUP].create(x, 16, 'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
          bomb.setGravityY(0);
      }
    }
  }
  buildHitBomb(groups: Object) {
    return (player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Sprite) => {
      this.physicsPlugin.pause();
      groups[Groups.PLAYER_GROUP].setTint(0xff0000);
      groups[Groups.PLAYER_GROUP].anims.play('turn');
      this.sceneState.isGameOver = true;
    }
  }
}
