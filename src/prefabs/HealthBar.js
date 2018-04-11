export default class HealthBar extends Phaser.Group{
  constructor(game,xpos,ypos){
    super(game);

    this.warningholder = this.create(xpos,ypos,'objects1','warning');
    this.warningholder.alpha = 0;
    this.bar = this.create(xpos+32,ypos+13,'objects1','health');
    this.holder = this.create(xpos,ypos,'objects1','heart_holder');
    this.fixedToCamera = true;
    this.warninganime = game.add.tween(this.warningholder).to({alpha: 1},600, Phaser.Easing.Quadratic.InOut, false, 0, 0, true);
  }

  setValue(val){
    if(val<=0)return;
    if(this.tween)this.tween.stop();//stop the tween if running and flag it for deletion. That's no more after this.
    this.tween = this.game.add.tween(this.bar.scale);
    this.tween.to({x:val},350);
    this.tween.start();
  }

  startWarning(){
    if(!this.warninganime.isPlaying){
      this.warninganime.start();
    }
  }
}
