export default class TitleText extends Phaser.Text{
  constructor(game,text){
    super(game,512,384,text);
    this.anchor.setTo(0.5,0.5);
    this.fixedToCamera = true;

    let style = {
      font:'bold 36px Century',fill:'#ffffff'
    }

    this.setStyle(style);

    game.add.tween(this).to({alpha: 0},4600, Phaser.Easing.Quadratic.Out, true);
  }

  update(){
    if(this.alpha==0)this.destroy();
  }

}
