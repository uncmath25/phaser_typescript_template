import Phaser from "phaser";

const BASE_URL = "";

const IMAGE_ROOT_DIR = "assets/images";

export enum ImageType {
  LANDSCAPE = 'landscape',
  OBJECT = 'object'
}

export enum ImageSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export interface ImageSpec {
  key: string,
  imageType: ImageType,
  isSpriteMap: boolean,
  size?: ImageSize,
  options?: Object
}

export function importImage(imageSpec: ImageSpec, loaderPlugin: Phaser.Loader.LoaderPlugin) {
  loaderPlugin.setBaseURL(BASE_URL);
  if (imageSpec.isSpriteMap) {
    let frameOptions = { frameWidth: imageSpec.options['frameWidth'], frameHeight: imageSpec.options['frameHeight'] };
    loaderPlugin.spritesheet(imageSpec.key, `${IMAGE_ROOT_DIR}/sprite_sheet/${imageSpec.imageType}/${imageSpec.key}.png`, frameOptions);
  } else {
    loaderPlugin.image(imageSpec.key, `${IMAGE_ROOT_DIR}/normal/${imageSpec.imageType}/${imageSpec.key}.png`);
  }

}
