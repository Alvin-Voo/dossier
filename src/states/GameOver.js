import Tools from "../components/Tools.js"

export default class GameOver extends Phaser.State{

  create(){

    this.add.image(0,0,'gameover');
    this.restart = this.add.image(0,0,'restartepisode');
    this.return = this.add.image(0,0,'return');
    this.add.image(0,0,'go_wordings');

    this.selectionArray = new Array(this.restart,this.return);

    this.select('restartepisode');

    let sfx = this.game.add.audioSprite('sfx');

    this.naviKeys = this.input.keyboard.addKeys( { 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER});
    this.naviKeys.enter.onDown.add(this.processSelection,this);
    this.naviKeys.up.onDown.add((target)=>{
      console.log("up");
      this.selectionArray.unshift(this.selectionArray.pop());
      this.select(this.selectionArray[0].key);
      sfx.play('menuselect');
    },this);
    this.naviKeys.down.onDown.add((target)=>{
      console.log("down");
      this.selectionArray.push(this.selectionArray.shift());
      this.select(this.selectionArray[0].key);
      sfx.play('menuselect');
    },this);

    //stop all previous playing sound first
    this.sound.stopAll();
    this.theme = this.add.audioSprite('gameover');
    if(Tools.getData('mutetheme'))Tools.muteOrPlay(this.theme,true);

    this.theme.play('Death of Kings',0.6);
  }

  update(){
  }

  select(which){
    this.restart.alpha = 0.0;//restart
    this.return.alpha = 0.0;//return

    switch(which){
      case 'restartepisode':
        this.restart.alpha = 1.0;
      break;
      case 'return':
        this.return.alpha = 1.0;
      break;
    }
  }

  processSelection(){
    console.log("enter");
    switch(this.selectionArray[0].key){
      case 'restartepisode':
        this.state.start('game',true,false,Tools.getEp());
      break;
      case 'return':
        this.state.start('menu');
      break;
    }
  }

}
