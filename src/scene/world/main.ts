import { Scene } from "../../core/scene/main";
import { WorldSceneState } from "./config/scene_state";
import { WorldSceneController } from "./controller/main";

export class WorldScene extends Scene<WorldSceneState> {
  sceneController = new WorldSceneController(this);
}
