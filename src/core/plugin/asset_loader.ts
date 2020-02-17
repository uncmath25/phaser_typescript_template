import Phaser from "phaser";

export class AssetLoader {
  private loaderPlugin: Phaser.Loader.LoaderPlugin;

  constructor(loaderPlugin: Phaser.Loader.LoaderPlugin) {
    this.loaderPlugin = loaderPlugin;
  }

  setBaseUrl(url: string) {
    this.loaderPlugin.setBaseURL(url);
  }

  loadImage(key: string, url: string) {
    this.loaderPlugin.image(key, url);
  }

  loadSpriteSheet(key: string, url: string, frameOptions: Object) {
    let imageFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig = {
      frameWidth: frameOptions['frameWidth'],
      frameHeight: frameOptions['frameHeight']
    }
    this.loaderPlugin.spritesheet(key, url, imageFrameConfig);
  }
}
