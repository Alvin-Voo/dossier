import Tools from "../components/Tools.js";

export default class BlockingObjects extends Phaser.Sprite{
  constructor(game,x,y,key,frame){
    super(game,x,y,key,frame);
    console.log("blocking frame name created: "+frame);
    //console.log("before x y width height "+x+" "+y+" "+this.offsetX+" "+this.offsetY+" "+this.right+" "+this.bottom);
    this.game.physics.p2.enable(this,false);//debug is true
    this.body.static = true;//this center the anchor to 0.5,0.5

    switch(frame){
      case 'wateroutlet':
        this.body.clearShapes();
        this.body.setCircle(this.width/2,0,-this.width/4);
        Tools.convertTileCoorToP2(x,y,this.width,this.height,this.body);

      break;
      default:
        this.body.clearShapes();
        this.body.setRectangle(this.width,Math.round(this.height*0.9),0);
        Tools.convertTileCoorToP2(x,y,this.width,this.height,this.body);
      break;
    }

  }
}
