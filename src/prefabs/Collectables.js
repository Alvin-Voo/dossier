import Tools from "../components/Tools.js";

export default class Collectables extends Phaser.Sprite{
  constructor(game,x,y,key,frame){
    super(game,x,y,key,frame);
    this.game.physics.p2.enable(this,false);//debug is true
    Tools.convertTileCoorToP2(x,y,this.width,this.height,this.body);
    if(frame=='sword1'||frame=='shurikens'){
      this.game.add.tween(this.scale).to({x:-1},1500,Phaser.Easing.Circular.InOut, true, 0, Infinity, true);
    }
    else this.game.add.tween(this).to({ alpha: 0.6 }, 800, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
  }

}
