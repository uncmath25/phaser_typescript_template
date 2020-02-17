import { GameConfig } from "./core/game";
import { Game } from "./game"

const gameConfig: GameConfig = {
  WIDTH: 800,
  HEIGHT: 600,
  GRAVITY: 300
};
const game: Game = new Game(gameConfig);

window.onload = () => { game.run(); }
