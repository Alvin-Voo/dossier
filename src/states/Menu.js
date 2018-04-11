import Popup from "../prefabs/Popup.js";
import Tools from "../components/Tools.js"

export default class Menu {

  create(){
    //let images = this.cache.getKeys(Phaser.Cache.IMAGE);
    this.add.image(0,0,'splashscreen');
    this.animeffect = this.add.image(0,0,'animeffect');
    this.start = this.add.image(0,0,'start');
    this.continue = this.add.image(0,0,'continue');
    this.options = this.add.image(0,0,'options');
    this.add.image(0,0,'wordings');

    //let all sounds still play even when game paused
    //is this a one time setting??
    //this.sound.muteOnPause = false;//<== only effective for DOM
    this.selectionArray = new Array(this.start,this.continue,this.options);

    //enable start by default
    this.select('start');
    this.add.tween(this.animeffect).to({ alpha: 0.2 }, 800, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);

    let sfx = this.game.add.audioSprite('sfx');

    this.nextLvlpopup = false;
    //paused state responds to signals
    this.naviKeys = this.input.keyboard.addKeys( { 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER, 'esc':Phaser.KeyCode.ESC } );
    this.naviKeys.enter.onDown.add(this.processSelection,this);
    this.naviKeys.up.onDown.add((target)=>{
      //pop then unshift
      console.log("up");
      if(!this.game.paused){
        this.selectionArray.unshift(this.selectionArray.pop());
        this.select(this.selectionArray[0].key);
        sfx.play('menuselect');
      }else{//popup box time
        this.popup.cursorMoved(target.keyCode);
      }
    },this);
    this.naviKeys.down.onDown.add((target)=>{
      console.log("down");
      //shift then push
      if(!this.game.paused){
        this.selectionArray.push(this.selectionArray.shift());
        this.select(this.selectionArray[0].key);
        sfx.play('menuselect');
      }else{
        this.popup.cursorMoved(target.keyCode);
      }

    },this);
    this.naviKeys.esc.onDown.add(()=>{
      if(this.game.paused){
        //remove the menu panel from world
        //unpaused game
        this.resumeState();
      }
    },this);

    this.game.onPause.add(function(){this.sound.unsetMute();},this);//<==enable the sound to continue play ';)'
  }

  select(which){
    this.start.alpha = 0.0;//start
    this.continue.alpha = 0.0;//continue
    this.options.alpha = 0.0;//options
    switch(which){
      case 'start':
        this.start.alpha = 1.0;
      break;
      case 'continue':
      this.continue.alpha = 1.0;
      break;
      case 'options':
      this.options.alpha = 1.0;
      break;
    }
  }

  processSelection(){
    console.log("enter");
    switch(this.selectionArray[0].key){
      case 'start':
        //this.state.start('preload',true,false,'ep1');
        //if player previously played, set attackEnabled to false
        if(Tools.getData('attackEnabled'))Tools.storeData('attackEnabled',false);
        if(Tools.getData('throwEnabled'))Tools.storeData('throwEnabled',false);

        this.state.start('preload',true,false,'gamenarrative');
      break;
      case 'continue':
        console.log("continue");

        if(!this.game.paused){
          this.game.paused = true;
          this.popup = new Popup(this.game,0,0,4);
          this.world.addChild(this.popup);

        }else{//game when paused should stuck here when enter is pressed
          this.popupHandler();
        }
      break;
      case 'options':
        console.log("options");
        //pause the game, bring up the popuppanel
        if(!this.game.paused){
          this.game.paused = true;
          //initialize popup objects
          this.popup = new Popup(this.game,0,0,1);
          this.world.addChild(this.popup);
        }else{//game when paused should stuck here when enter is pressed
          this.popupHandler();
        }
      break;
    }
  }

  popupHandler(){
    let popupText = this.world.getTop().optionEntered();
    if(!popupText) return;
    console.log("enter "+popupText);

    //this guy has to do the lifting for the options
    switch(popupText){
      case 'Instructions':
        console.log('instructions');
        this.popupInstruction = new Popup(this.game,0,0,3);
        let instruction  = this.cache.getJSON('config').popup.instructions;
        this.popupInstruction.setTitle(instruction['title']);
        this.popupInstruction.setDescription(instruction['description'],0);

        this.world.removeChild(this.popup);
        this.world.addChild(this.popupInstruction);
        this.enableCursorKeys(false);
      break;
      case 'Got it!':
        this.enableCursorKeys(true);
        this.resumeState();
      break;
      case 'Credits':
        console.log('credits');
        this.popupCredits = new Popup(this.game,0,0,3);
        let credits  = this.cache.getJSON('config').popup.credits;
        this.popupCredits.setTitle(credits['title']);
        this.popupCredits.setDescription(credits['description'],0);

        this.world.removeChild(this.popup);
        this.world.addChild(this.popupCredits);
        this.enableCursorKeys(false);
      break;
      case 'Back':
        console.log('back');
        this.resumeState();
      break;
      case 'Mute Music':
        console.log("muting music ");
        Tools.storeData('mutetheme',true);
      break;
      case 'Mute Sound':
        console.log("muting sound");
        Tools.storeData('mutesound',true);
      break;
      case 'Play Music':
        console.log("playing music");
        Tools.storeData('mutetheme',false);
      break;
      case 'Play Sound':
        console.log("playing sound");
        Tools.storeData('mutesound',false);
      break;
      case 'ep1. The Apprenticeship':
        this.resumeState();
        this.state.start('preload',true,false,'ep1');
      break;
      case 'ep2. The Rat Infestation':
        this.resumeState();
        this.state.start('preload',true,false,'ep2');
      break;
      case 'ep3. The Flying Menace':
        this.resumeState();
        this.state.start('preload',true,false,'ep3');
      break;
      case 'ep4. The Shooting Stars':
        this.resumeState();
        this.state.start('preload',true,false,'ep4');
      break;
      case 'ep5. The Ninja Reality':
        this.resumeState();
        this.state.start('preload',true,false,'ep5');
      break;
      case "ep6. The O'Mighty Claw":
        this.resumeState();
        this.state.start('preload',true,false,'ep6');
      break;
    }
  }

  enableCursorKeys(bool){
    this.naviKeys.up.enabled = bool;
    this.naviKeys.down.enabled = bool;
  }

  resumeState(){
    let somepopup  = this.world.getTop();
    if(somepopup.key==='popup'){
      this.world.removeChild(somepopup);
      somepopup.destroy();
    }
    this.game.paused = false;
  }

  update(){


  }
}
