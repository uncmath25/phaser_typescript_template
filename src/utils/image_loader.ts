import { AssetLoader } from "../core/plugin/asset_loader";

const BASE_URL = "";
const IMAGE_ROOT_DIR = "assets/images";

export enum ImageType {
  LANDSCAPE = 'landscape',
  OBJECT = 'object'
}

export interface ImageSpec {
  key: string,
  imageType: ImageType,
  isSpriteMap: boolean,
  options?: Object
}

export function importImage(imageSpec: ImageSpec, assetLoader: AssetLoader) {
  assetLoader.setBaseUrl(BASE_URL);
  if (imageSpec.isSpriteMap) {
    let frameOptions = { frameWidth: imageSpec.options['frameWidth'], frameHeight: imageSpec.options['frameHeight'] };
    assetLoader.loadSpriteSheet(imageSpec.key, `${IMAGE_ROOT_DIR}/sprite_sheet/${imageSpec.imageType}/${imageSpec.key}.png`, frameOptions);
  } else {
    assetLoader.loadImage(imageSpec.key, `${IMAGE_ROOT_DIR}/normal/${imageSpec.imageType}/${imageSpec.key}.png`);
  }

}
