import Player from "../prefabs/Player.js";
import EntranceDoor from "../prefabs/EntranceDoor.js";
import BlockingObjects from "../prefabs/BlockingObjects.js"
import Collectables from "../prefabs/Collectables.js"
import WavesObjects from "../prefabs/WavesObjects.js"
import Platforms from "../prefabs/Platforms.js"
import HealthBar from "../prefabs/HealthBar.js"
import EnergyBar from "../prefabs/EnergyBar.js"
import RatGrunt from "../prefabs/RatGrunt.js"
import RatSoldier from "../prefabs/RatSoldier.js"
import EnemyStops from "../prefabs/EnemyStops.js"
import Popup from "../prefabs/Popup.js"
import Tools from "../components/Tools.js"
import CheeseScore from "../prefabs/CheeseScore.js"
import TitleText from "../prefabs/TitleText.js"

export default class Ep1 extends Phaser.State{

  constructor() {
    //object level properties
    super();
  }

  create(){
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.gravity.y = 800;
    //this sets the default contact material to all P2 body in this world
    this.physics.p2.world.defaultContactMaterial.friction = 0.42;//perfect not to be AIRBORNE
    this.physics.p2.world.setGlobalStiffness(1e5);

    //map start
    this.map = this.add.tilemap('ep1');
    //add tileset image
    this.map.addTilesetImage('tile');
    //parallax background
    this.bg = this.map.createLayer('background');
    this.bg.scrollFactorX = .7;
    this.bg.scrollFactorY = .7;

    //walkable tiles
    this.layer = this.map.createLayer('tiles');

    //collision
    this.layer.resizeWorld();
    this.map.setCollisionBetween(1,106,true,this.layer);

    let tilesBodies = this.physics.p2.convertTilemap(this.map, this.layer);

    //add arch layer
    this.map.createLayer('decorative');

    //add moving waves objects
    //this guy has same gid 184 for all the tiles... depending on how this function is written, it might just grabbed all the
    //objects for this gid
    this.map.createFromObjects('movingwaves',184,'objects1','watertile',true,false,this.world,WavesObjects);
    //add the damage zone associated with the water area
    this.damageZone = new Phaser.Rectangle(1200,2100,400,100);

    //add custom platforms
    this.platformsGroup = this.add.group();
    this.map.createFromObjects('platforms',183,'objects1','slippery2',true,false,this.platformsGroup,Platforms);
    //custom properties to this
    this.slippery = this.platformsGroup.getTop();
    let slipperyMaterial = this.physics.p2.createMaterial('slipperyMaterial',this.slippery.body);

    //add blocking objects
    this.blockingGroup = this.add.group();
    Tools.findObjectInLayer(this.map, 'blockingobjects').forEach((element)=>{
       this.map.createFromObjects('blockingobjects',element.gid,'objects1',element.name,true,false,this.blockingGroup,BlockingObjects);
    });

    //add collectables
    this.collectablesGroup = this.add.group();
    Tools.findObjectInLayer(this.map, 'collectables').forEach((element)=>{
      this.map.createFromObjects('collectables',element.gid,'objects1',element.name,true,false,this.collectablesGroup,Collectables);
    });

    //add entrance door
    this.map.createFromObjects('door',176,'objects1','entrancedoor',true,false,this.world,EntranceDoor);
    this.entrancedoor = this.world.getTop();
    //add player
    this.player = new Player(this.game,260,this.world._height-200);
    //this.player = new Player(this.game,712,776);
    //this.player = new Player(this.game,550,200);

    //
    this.sound.stopAll();
    this.sfx = this.add.audioSprite('sfx');
    this.theme = this.add.audioSprite('theme');

    if(Tools.getData('mutesound'))Tools.muteOrPlay(this.sfx,true);
    if(Tools.getData('mutetheme'))Tools.muteOrPlay(this.theme,true);

    this.player.sfx = this.sfx;

    let playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);
    //contact material with slippery
    let contactMaterial = this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterial,{friction:0.35,surfaceVelocity:-1000});

    //this.world.addChild(this.player);//need to add this display object to the world group
    this.add.existing(this.player);

    //add enemy rat grunt
    this.ratGruntGroup = this.add.group();
    this.map.createFromObjects('enemies',187,'ratgrunt','frame0',true,false,this.ratGruntGroup,RatGrunt);
    this.ratGruntGroup.forEach((ratGrunt)=>{
      ratGrunt.player=this.player;
      ratGrunt.sfx = this.sfx;
    },this);

    //add stops for enemy
    this.stopsGroup = this.add.group();
    Tools.findObjectInLayer(this.map, 'enemystops').forEach((element)=>{
        this.map.createFromObjects('enemystops',element.gid,'objects1',element.name,true,false,this.stopsGroup,EnemyStops);
    });

    //the most front layer which to be displayed in front of player
    this.map.createLayer('decorative2');

    //UI setup
    this.healthBar = new HealthBar(this.game,20,20);
    this.energyBar = new EnergyBar(this.game,31,80);
    this.player.energyBar = this.energyBar;
    this.player.healthBar = this.healthBar;
    this.player.ratGroup = this.ratGruntGroup;

    this.cheeseScore = new CheeseScore(this.game,460,20,2);

    this.camera.follow(this.player);
    //seems like no need
    //this.physics.p2.setBoundsToWorld(true, true, true, true, false);
    //PHYSICS collisions--->
    this.physics.p2.setImpactEvents(true);

    let tilesCG = this.physics.p2.createCollisionGroup();
    let platformsCG = this.physics.p2.createCollisionGroup();
    let playerCG = this.physics.p2.createCollisionGroup();
    let blockingObjectsCG = this.physics.p2.createCollisionGroup();
    let collectablesCG = this.physics.p2.createCollisionGroup();
    let ratGruntCG = this.physics.p2.createCollisionGroup();
    let stopsCG = this.physics.p2.createCollisionGroup();
    let hitboxCG = this.physics.p2.createCollisionGroup();
    let entrancedoorCG = this.physics.p2.createCollisionGroup();
    //update world bounds collision group  to collide with all the custom collision groups
    this.physics.p2.updateBoundsCollisionGroup();
    //set the collisions
    tilesBodies.forEach((tile)=>{
      tile.setCollisionGroup(tilesCG);
      tile.collides([playerCG,collectablesCG,blockingObjectsCG,ratGruntCG]);
    });
    this.platformsGroup.forEach((child)=>{
      child.body.setCollisionGroup(platformsCG);
      child.body.collides([playerCG,collectablesCG,ratGruntCG]);
    },this);
    this.player.body.setCollisionGroup(playerCG);
    this.player.body.collides([tilesCG,blockingObjectsCG,platformsCG,collectablesCG,ratGruntCG,entrancedoorCG,],this.platformHitListener,this);
    this.player.hitbox1.body.setCollisionGroup(hitboxCG);
    this.player.hitbox1.body.collides(ratGruntCG,this.playerHitListener,this);
    this.blockingGroup.forEach((child)=>{
      child.body.setCollisionGroup(blockingObjectsCG);
      child.body.collides([playerCG,collectablesCG,ratGruntCG,tilesCG]);
    },this);
    this.collectablesGroup.forEach((child)=>{
      child.body.setCollisionGroup(collectablesCG);
      child.body.collides([tilesCG,platformsCG,blockingObjectsCG]);
      child.body.collides(playerCG,this.collectablesListener,this);
    },this);
    this.ratGruntGroup.forEach((child)=>{
      child.body.setCollisionGroup(ratGruntCG);
      child.body.collides([tilesCG,platformsCG,blockingObjectsCG,stopsCG,hitboxCG]);
      child.body.collides(playerCG,this.enemyHitListener,this)
    },this);
    this.stopsGroup.forEach((child)=>{
      child.body.setCollisionGroup(stopsCG);
      child.body.collides(ratGruntCG);
    },this);
    this.entrancedoor.body.setCollisionGroup(entrancedoorCG);
    this.entrancedoor.body.collides(playerCG,this.nextEpisode,this);

    //GAME INPUT--->
    //lock arrows key input from the browser
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACE,Phaser.Keyboard.UP,Phaser.Keyboard.LEFT,Phaser.Keyboard.RIGHT]);

    //initialize pop up panels,main pop up, instruction, tip1...N
    //add esc key to bring up pop up panel
    this.naviKeys = this.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER, 'esc':Phaser.KeyCode.ESC } );
    this.naviKeys.esc.onDown.add(()=>{
      if(!this.game.paused){
        this.game.paused=true;
        this.popup = new Popup(this.game,this.camera.x,this.camera.y,2);
        this.world.addChild(this.popup);
      }
      else{
        this.resumeGame();
      }

    },this);
    this.naviKeys.up.onDown.add((target)=>{//should this be added inside the Popup clas?
      //console.log("up");
      if(this.game.paused)this.popup.cursorMoved(target.keyCode);
    },this);
    this.naviKeys.down.onDown.add((target)=>{
      //console.log("down");
      if(this.game.paused)this.popup.cursorMoved(target.keyCode);
    },this);
    this.naviKeys.enter.onDown.add(()=>{
      if(this.game.paused)this.processSelection();
    },this);


    this.game.onPause.add(function(){this.sound.unsetMute();},this);//<==enable the sound to continue play ';)'
    this.theme.sounds['Obliteration'].play('Obliteration',null,0.3,true);

    //To get the FPS
    this.time.advancedTiming = true;
    //experiment

    this.titletext = new TitleText(this.game,'Ep 1. The Apprenticeship');
    this.add.existing(this.titletext);

    this.tipsmarker = [false,false,false,false,false,false];
  }

  update(){
    //water area hurts player
    if(this.damageZone.intersectsRaw(this.player.left,this.player.right,this.player.top,this.player.bottom)){
      //if(!this.sfx.sounds['Footstep_Water_00','Footstep_Water_01','Footstep_Water_03'].isPlaying)this.sfx.play(this.game.rnd.pick(['Footstep_Water_00','Footstep_Water_01','Footstep_Water_03']));
      this.tipspopper(1);
      Tools.playSound(this.sfx,['Footstep_Water_01','Footstep_Water_02','Footstep_Water_03']);
      this.player.damagePlayer(4);
    }

    //fire pop ups here?
    //all manual
    if(this.player.y>2140){
      this.tipspopper(0);
    }

    if(this.player.x>790&&this.player.y<927){
      this.tipspopper(5);
    }
  }

  tipspopper(index){
    if(this.tipsmarker[index])return;
    this.game.paused=true;
    let tippopup = new Popup(this.game,this.camera.x,this.camera.y,3);
    let tip = this.cache.getJSON('config').popup.ep1.tips[index];
    tippopup.setTitle(tip['title']);
    if(tip['description'])tippopup.setDescription(tip['description'],0);

    this.tipsmarker[index] = true;

    this.world.addChild(tippopup);
    this.enableCursorKeys(false);
  }

  render() {
    //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
  }

  shutdown(){

  }

  nextEpisode(thisBody,thatBody){
    if(thatBody.sprite&&thatBody.sprite.key==='player'){
      this.cheeseScore.addToTotalScore(1);
      this.state.start('preload',true,false,'ep2');
    }
  }

  ////---> In Game Menu
  resumeGame(){
    let somepopup = this.world.getTop();
    if(somepopup.key==='popup'){
      this.world.removeChild(somepopup);
      somepopup.destroy();
    }
    this.game.paused=false;
  }

  //processing for pop up menu items
  processSelection(){
    let popupText = this.world.getTop().optionEntered();
    if(!popupText) return;

    console.log("enter "+popupText);
    //this guy has to do the lifting for the options
    switch(popupText){
      case 'Resume Game':
        this.resumeGame();
      break;
      case 'Restart Episode':
        this.resumeGame();//need to unpause the game before change state
        this.state.start('ep1');
      break;
      case 'Instructions':
        this.popupInstruction = new Popup(this.game,this.camera.x,this.camera.y,3);
        let instruction = this.cache.getJSON('config').popup.instructions;
        this.popupInstruction.setTitle(instruction['title']);
        this.popupInstruction.setDescription(instruction['description'],0);

        this.world.removeChild(this.popup);
        this.world.addChild(this.popupInstruction);
        this.enableCursorKeys(false);
      break;
      case 'Got it!':
        this.enableCursorKeys(true);
        this.resumeGame();
      break;
      case 'Quit to Main Menu':
        this.resumeGame();
        this.state.start('menu');
      break;
      case 'Mute Music':
        console.log("muting music ");
        Tools.storeData('mutetheme',true);
        Tools.muteOrPlay(this.theme,true);
      break;
      case 'Mute Sound':
        console.log("muting sound");
        Tools.storeData('mutesound',true);
        Tools.muteOrPlay(this.sfx,true);
      break;
      case 'Play Music':
        console.log("playing music");
        Tools.storeData('mutetheme',false);
        Tools.muteOrPlay(this.theme,false);
      break;
      case 'Play Sound':
        console.log("playing sound");
        Tools.storeData('mutesound',false);
        Tools.muteOrPlay(this.sfx,false);
      break;
    }
  }

  enableCursorKeys(bool){
      this.naviKeys.up.enabled = bool;
      this.naviKeys.down.enabled = bool;
  }

  platformHitListener(thisBody,thatBody,thisShape,thatShape){
    if(thatBody.sprite&&(thatBody.sprite.frameName=='slippery1'||thatBody.sprite.frameName=='slippery2')){
      this.tipspopper(3);
      Tools.playSound(this.sfx,['slime7','slime8','slime9']);
      this.player.onslippyplatform=true;
    }else{
      if(this.player.onslippyplatform)this.player.onslippyplatform=false;
    }
  }

  //player interaction functions
  enemyHitListener(thisBody,thatBody,thisShape,thatShape){
    if(thatBody.sprite&&thatBody.sprite.key==='player'){
      console.log('enemy hit');
      if(thisShape===thisBody.data.shapes[0])this.player.damagePlayer(5);
    }
  }

  playerHitListener(thisBody,thatBody,thisShape,thatShape){
      //hitbox only target is enemy so pretty much no need to check
      if(thatBody.sprite){
        thatBody.sprite.damageRat(8,400);
      }

  }

  collectablesListener(thisBody,thatBody,thisShape,thatShape){
    if(thatBody.sprite&&thatBody.sprite.key==="player"){
      console.log("player contacted by"+thisBody.sprite.frameName);
      switch(thisBody.sprite.frameName){
        case 'cheese1':
          console.log("cheese1 am grabbed!");
          this.tipspopper(2);
          //increase player energy..
          this.player.replenishEnergy(10);
          this.cheeseScore.increaseScore(2);
          this.sfx.play('Rise04');
        break;
        case 'cheese2':
        case 'cheese3':
          console.log("cheese2 / 3 am grabbed!");
          //increase player energy..
          this.player.replenishEnergy(5);
          this.cheeseScore.increaseScore(1);
          this.sfx.play('Rise04');
        break;
        case 'wineglass':
          console.log("wineglass am grabbed!");
          this.tipspopper(4);
          this.player.replenishLife(10);
          this.sfx.play('Rise04');
        break;
        case 'winebottle':
          console.log("winebottle am grabbed!");
          this.tipspopper(6);
          this.player.replenishLife(20);
          this.sfx.play('Rise04');
        break;

      }
      //flashy
      this.player.flash('green');
      //destroy the said sprite
      thisBody.sprite.destroy();
    }
  }

}
