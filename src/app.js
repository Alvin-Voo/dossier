var game;

import Boot from "./states/Boot.js";
import Menu from "./states/Menu.js";
import GameNarrative from "./states/GameNarrative.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";
import Ep1 from "./states/Ep1.js";
import Ep2 from "./states/Ep2.js";
import Ep3 from "./states/Ep3.js";
import Ep4 from "./states/Ep4.js";
import Ep5 from "./states/Ep5.js";
import Ep6 from "./states/Ep6.js";
import GameOver from "./states/GameOver.js";
import Won from "./states/Won.js"

window.onload = function () {
  game = new Phaser.Game(1024, 768, Phaser.CANVAS, 'game');
  game.state.add('boot', Boot);
  game.state.add('menu', Menu);
  game.state.add('gamenarrative', GameNarrative);
  game.state.add('preload', Preload);
  game.state.add('game', Game);
  game.state.add('ep1', Ep1);
  game.state.add('ep2', Ep2);
  game.state.add('ep3', Ep3);
  game.state.add('ep4', Ep4);
  game.state.add('ep5', Ep5);
  game.state.add('ep6', Ep6);
  game.state.add('gameover',GameOver);
  game.state.add('won',Won);
  game.state.start('boot');
};
