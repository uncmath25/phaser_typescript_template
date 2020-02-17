import { SceneState } from "../../../core/scene/config/scene_state";

export interface WorldSceneState extends SceneState {
  isGameOver: boolean
  score: number
}
