import Tools from "../components/Tools.js"

export default class Won extends Phaser.State{

  constructor(){
    super();

    this.highlightStyle = {
      font:'bold 28px Century',fill:'#cde16d'
    }
  }

  create(){

    this.wonimg = this.add.image(0,160,'won');
    this.starttimer = this.game.time.now + 2500;
    this.movetimer = 0;

    let hightext = this.add.text(50,700,"Press 'A' to return to main menu...",this.highlightStyle);

    this.add.tween(hightext).to({ alpha: 0.2 }, 600, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);

    let backdrop = this.add.graphics(0,0);
    backdrop.beginFill(0x22226a);
    backdrop.drawRect(0,0,this.game.width,160);
    backdrop.endFill();

    console.log("total score "+Tools.getTotalScore()+ " game " + this.game.width);

    let totalScore = Tools.getTotalScore();
    let highScore = Tools.getData('high_score');
    let title = this.add.text(this.game.width/2,50,"You've collected "+totalScore+" out of 172 cheese! Well Done!",this.highlightStyle);
    title.anchor.setTo(0.5,0.5);
    let title1 = this.add.text(this.game.width/2,100,"Your highest score is "+highScore,this.highlightStyle);
    title1.anchor.setTo(0.5,0.5);

    this.keyA = this.input.keyboard.addKey(Phaser.Keyboard.A);
    this.keyA.onDown.add(()=>{
      this.state.start('menu');
    },this);


    //stop all previous playing sound first
    this.sound.stopAll();
    this.theme = this.add.audioSprite('gameover');
    if(Tools.getData('mutetheme'))Tools.muteOrPlay(this.theme,true);

    this.theme.play('Death of Kings',0.6);
  }

  update(){
    if(this.game.time.now > this.starttimer&&this.wonimg.position.y > -1280) this.wonimg.position.y -= 0.3;

  }

}
