import {SimpleGameConfig, SimpleGame} from "./game"

const simpleConfig: SimpleGameConfig = {
  WIDTH: 800,
  HEIGHT: 600,
  GRAVITY: 300
};
const simpleGame: SimpleGame = new SimpleGame(simpleConfig);
simpleGame.run();
