export default class ShurikenHUD extends Phaser.Group{
  constructor(game,xpos,ypos){
    super(game);

    this.style = {
      font:'bold 20px Century',fill:'#f6f6de'
    }

    this.count = 0;
    this.holder = this.create(xpos,ypos,'objects4','shurikens');
    this.counttext = this.add(new Phaser.Text(game,xpos+70,ypos+12,'x '+this.count,this.style));

    this.holder.alpha = 0;
    this.counttext.alpha = 0;

    this.fixedToCamera = true;

  }

  increaseCount(val){
    if(this.holder.alpha==0)this.holder.alpha = 1;
    if(this.counttext.alpha==0)this.counttext.alpha = 1;
    this.count += val;
    this.counttext.setText('x '+this.count);
  }

  decreaseCount(val){
    this.count -= val;
    this.counttext.setText('x '+this.count);
    if(this.count<1){
      this.holder.alpha = 0;
      this.counttext.alpha = 0;
    }
  }

}
