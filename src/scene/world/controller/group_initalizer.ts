import { GameObjectFactory, Sprite } from "../../../core/factory/game_object";
import { PhysicsManager } from "../../../core/plugin/physics_manager";
import { WorldSceneState } from "../config/scene_state";
import * as Groups from "../config/groups";
import * as Images from "../config/images";

export class GroupInitializer {
  private sceneState: WorldSceneState
  private physicsManager: PhysicsManager;
  private gameObjectFactory: GameObjectFactory;

  constructor(sceneState: WorldSceneState, physicsManager: PhysicsManager, gameObjectFactory: GameObjectFactory) {
    this.sceneState = sceneState;
    this.physicsManager = physicsManager;
    this.gameObjectFactory = gameObjectFactory;
  }

  init() {
    let groups = this.initGroups();
    this.configureCollisions(groups);
    return groups;
  }

  private initGroups() {
    let groups = {};
    groups[Groups.BACKGROUND_GROUP] = this.initBackground();
    groups[Groups.PLATFORM_GROUP] = this.initPlatforms();
    groups[Groups.STAR_GROUP] = this.initStars();
    groups[Groups.PLAYER_GROUP] = this.initPlayer();
    groups[Groups.BOMB_GROUP] = this.initBombs();
    groups[Groups.SCOREBOARD_GROUP] = this.initScoreboard();
    return groups;
  }

  private initBackground() {
    this.gameObjectFactory.buildStaticImage(400, 300, Images.BACKGROUND_IMAGE);
  }

  private initPlatforms() {
    return this.gameObjectFactory.buildStaticGroup([
      {x:400, y:568, imageKey:Images.PLATFORM_IMAGE, scaleRatio:2},
      {x:600, y:400, imageKey:Images.PLATFORM_IMAGE},
      {x:50, y:250, imageKey:Images.PLATFORM_IMAGE},
      {x:750, y:220, imageKey:Images.PLATFORM_IMAGE}
    ]);
  }

  private initStars() {
    return this.gameObjectFactory.buildDynamicCluster({
      imageKey: Images.STAR_IMAGE,
      count: 11,
      startX: 12,
      startY: 0,
      stepX: 70,
      stepY: 0,
      bounce: 0.4
    });
  }

  private initPlayer() {
    return this.gameObjectFactory.buildDynamicSprite({
      x: 100,
      y: 450,
      imageKey: Images.PLAYER_IMAGE,
      bounce: 0.2,
      constrainToWorld: true
    });
  }

  private initBombs() {
    return this.gameObjectFactory.buildDynamicGroup([]);
  }

  private initScoreboard() {
    return this.gameObjectFactory.buildStaticText(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  }

  private configureCollisions(groups: Object) {
    this.physicsManager.handleCollision(groups, Groups.STAR_GROUP, Groups.PLATFORM_GROUP);
    this.physicsManager.handleCollision(groups, Groups.PLAYER_GROUP, Groups.PLATFORM_GROUP);
    this.physicsManager.handleCollision(groups, Groups.BOMB_GROUP, Groups.PLATFORM_GROUP);
    this.physicsManager.handleCollision(groups, Groups.PLAYER_GROUP, Groups.STAR_GROUP, this.buildCollectStarFcn(groups), this);
    this.physicsManager.handleCollision(groups, Groups.PLAYER_GROUP, Groups.BOMB_GROUP, this.buildHitBomb(groups), this);
  }

  private buildCollectStarFcn(groups: Object) {
    return (player: Sprite, star: Sprite) => {
      star.disableBody(true, true);
      this.sceneState.score += 10;
      groups[Groups.SCOREBOARD_GROUP].setText('Score: ' + this.sceneState.score);
      if (groups[Groups.STAR_GROUP].countActive(true) === 0) {
          groups[Groups.STAR_GROUP].getChildren().forEach( (obj: Sprite) => { obj.enableBody(true, obj.x, 0, true, true); })
          let x: number = (player.x < 400) ? 600 : 200;
          let bomb: Sprite = groups[Groups.BOMB_GROUP].create(x, 16, 'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(100, 20);
          bomb.setGravityY(0);
      }
    }
  }
  private buildHitBomb(groups: Object) {
    return (_: Sprite, __: Sprite) => {
      this.physicsManager.pause();
      groups[Groups.PLAYER_GROUP].setTint(0xff0000);
      groups[Groups.PLAYER_GROUP].anims.play('turn');
      this.sceneState.isGameOver = true;
    }
  }
}
