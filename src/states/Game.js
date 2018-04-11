//require other components
import Tools from "../components/Tools.js"

export default class Game extends Phaser.State {

  init(whichEp){
    this.episode = whichEp;
  }

  constructor() {
    //object level properties
    super();
  }

  create() {
    this.state.start(this.episode);
    if(/^ep\d{1}/.test(this.episode))Tools.storeEp(this.episode);
  }

  update() {
  }

}
