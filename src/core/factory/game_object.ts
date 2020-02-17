import Phaser from "phaser";

export interface StaticGameObjectConfig {
  x: number,
  y: number,
  imageKey: string,
  scaleRatio?: number
}

export interface DynamicGameObjectConfig extends StaticGameObjectConfig {
  bounce: number,
  constrainToWorld: boolean
}

export interface DynamicClusterConfig {
  imageKey: string,
  count: number,
  startX: number,
  startY: number,
  stepX: number,
  stepY: number,
  bounce: number
}

export class GameObjectFactory {
  private gameObjectFactory: Phaser.GameObjects.GameObjectFactory;
  private physicsFactory: Phaser.Physics.Arcade.Factory;

  constructor(gameObjectFactory: Phaser.GameObjects.GameObjectFactory, physicsFactory: Phaser.Physics.Arcade.Factory) {
    this.gameObjectFactory = gameObjectFactory;
    this.physicsFactory = physicsFactory;
  }

  buildStaticImage(x: number, y: number, imageKey: string) {
    return this.gameObjectFactory.image(x, y, imageKey);
  }

  buildStaticText(x: number, y: number, text: string, styleConfig: Object) {
    return this.gameObjectFactory.text(x, y, text, styleConfig);
  }

  buildStaticGroup(configs: StaticGameObjectConfig[]) {
    let group: Phaser.Physics.Arcade.StaticGroup = this.physicsFactory.staticGroup();
    configs.forEach(function(config){
      let gameObj = group.create(config.x, config.y, config.imageKey)
      if (config.scaleRatio) { gameObj.setScale(2).refreshBody(); };
      return gameObj;
    });
    return group;
  }

  buildDynamicGroup(configs: DynamicGameObjectConfig[]) {
    let group: Phaser.Physics.Arcade.Group = this.physicsFactory.group();
    configs.forEach(function(config){
      let gameObj = group.create(config.x, config.y, config.imageKey)
      gameObj.setBounce(config.bounce);
      gameObj.setCollideWorldBounds(config.constrainToWorld);
      return gameObj;
    });
    return group;
  }

  buildDynamicSprite(config: DynamicGameObjectConfig) {
    let gameObj = this.physicsFactory.sprite(config.x, config.y, config.imageKey);
    gameObj.setBounce(config.bounce);
    gameObj.setCollideWorldBounds(config.constrainToWorld);
    return gameObj;
  }

  buildDynamicCluster(config: DynamicClusterConfig) {
    let cluster = this.physicsFactory.group({
      key: config.imageKey,
      repeat: config.count,
      setXY: {
        x: config.startX,
        y: config.startY,
        stepX: config.stepX,
        stepY: config.stepY
      }
    });
    cluster.getChildren().forEach( obj => { (obj.body as Phaser.Physics.Arcade.Body).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); } );
    return cluster;
  }
}

export class Sprite extends Phaser.Physics.Arcade.Sprite {}
