import Tools from "../components/Tools.js";

export default class Stalacites extends Phaser.Sprite{
  constructor(game,x,y,key,frame){
    super(game,x,y,key,frame);
    this.game.physics.p2.enable(this,false);//debug is true
    this.body.static = true;//this center the anchor to 0.5,0.5
    Tools.convertTileCoorToP2(x,y,this.width,this.height,this.body);

    this.body.clearShapes();
    this.body.loadPolygon('stalacites', frame);
  }

  update(){


  }
}
