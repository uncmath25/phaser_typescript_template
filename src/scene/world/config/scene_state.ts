import { SceneState } from "../../core/config/scene_state";

export interface WorldSceneState extends SceneState {
  isGameOver: boolean
  score: number
}
