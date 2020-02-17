import {ImageType} from "../../../utils/image_loader";

export const BACKGROUND_IMAGE: string = "background";
export const PLATFORM_IMAGE: string = "platform";
export const STAR_IMAGE: string = "star";
export const BOMB_IMAGE: string = "bomb";
export const PLAYER_IMAGE: string = "player";

export const imageSpecs: Object = {
  BACKGROUND_IMAGE: {
    key: "background",
    imageType: ImageType.LANDSCAPE,
    isSpriteMap: false
  },
  PLATFORM_IMAGE: {
    key: "platform",
    imageType: ImageType.LANDSCAPE,
    isSpriteMap: false
  },
  STAR_IMAGE: {
    key: "star",
    imageType: ImageType.OBJECT,
    isSpriteMap: false
  },
  BOMB_IMAGE: {
    key: "bomb",
    imageType: ImageType.OBJECT,
    isSpriteMap: false
  },
  PLAYER_IMAGE: {
    key: "player",
    imageType: ImageType.OBJECT,
    isSpriteMap: true,
    options: {
      "frameWidth": 32,
      "frameHeight": 48
    }
  }
}
