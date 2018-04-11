export default class WavesObjects extends Phaser.Sprite{
  constructor(game,x,y,key,frame){
    super(game,x,y,key,frame);
    //100 * ((x + y) % 10)
    this.anchor.setTo(0,1);//you need an anchor to tween!
    //console.log("i am at "+x + " "+Math.sin(x * (Math.PI/180)));
    this.game.add.tween(this).to({ y: y-Math.sin(x * (Math.PI/180))*8},800, Phaser.Easing.Back.In, true, 0, Infinity, true);

  }


}
