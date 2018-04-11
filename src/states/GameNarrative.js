import Tools from "../components/Tools.js"

export default class GameNarrative extends Phaser.State{

  constructor(){
    //object level properties
    super();

    this.highlightStyle = {
      font:'bold 28px Century',fill:'#cde16d'
    }

  }
  create(){
    let narrativeimg = this.add.image(0,0,'narrative');
    let hightext = this.add.text(50,700,"Press 'A' to continue...",this.highlightStyle);
    let movewhich = 0;

    //stop all previous playing sound first
    this.sound.stopAll();
    this.theme = this.add.audioSprite('intro');
    if(Tools.getData('mutetheme'))Tools.muteOrPlay(this.theme,true);

    this.add.tween(hightext).to({ alpha: 0.2 }, 600, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
    let move = new Array();
    move[0] = this.add.tween(narrativeimg).to({ x: '-506' }, 600, Phaser.Easing.Quadratic.InOut);
    move[1] = this.add.tween(narrativeimg).to({ x: '-1024' }, 600, Phaser.Easing.Quadratic.InOut);
    move[2] = this.add.tween(narrativeimg).to({ x: '-506' }, 600, Phaser.Easing.Quadratic.InOut);
    move[3] = this.add.tween(narrativeimg).to({ x: '-1024' }, 600, Phaser.Easing.Quadratic.InOut);
    move[4] = this.add.tween(narrativeimg).to({ x: '-506' }, 600, Phaser.Easing.Quadratic.InOut);
    move[5] = this.add.tween(narrativeimg).to({ x: '-1024' }, 600, Phaser.Easing.Quadratic.InOut);

    this.keyA = this.input.keyboard.addKey(Phaser.Keyboard.A);
    this.keyA.onDown.add(()=>{
      let movenow = move[movewhich++];
      movenow.start();
      //console.log("position "+narrativeimg.x + "movewhich "+movewhich);
      if(movewhich==6){//have come to the end
        this.state.start('preload',true,false,'ep1');
      }
    },this);

    this.game.onPause.add(function(){this.sound.unsetMute();},this);//<==enable the sound to continue play ';)'
    this.theme.sounds['Finding Movement'].play('Finding Movement',null,0.4,true);

  }

  update(){

  }

  movenarrative(){

  }
}
